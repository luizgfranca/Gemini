import { action, observable, toJS } from 'mobx';
import { persist } from 'mobx-persist';
import dayjs from 'dayjs';
import _get from 'lodash/get';
import _find from 'lodash/find';
import _size from 'lodash/size';
import userService from '../services/User';
import GeographicInformation from '../services/GeographicInformation';
import { SEGMENTS } from 'src/constants/client';
import { customerAdapter } from 'src/services/adapters/user';
import { CustomerSegment } from 'src/services/constants/user';
import { ContactType } from 'src/services/constants/user';
import { ACTIVE } from 'modules/Checkout/components/CheckoutConfigPlans/constants';
import Auth from 'src/services/Auth';

const PAYMENT_METHODS = {
  'Cartão de Credito': 'Cartão de Crédito',
  Boleto: 'Boleto',
};

class User {
  @observable
  hydrated = false;

  @observable
  @persist('object')
  client = {
    clientId: '',
    status: '',
    canChangeClass: null,
  };

  @observable
  @persist
  guestName = '';

  @observable
  @persist
  username = '';

  @observable
  @persist('object')
  userCRM = {};

  @observable
  @persist
  isGuestUser = false;

  @observable
  @persist
  guestHasAccount = false;

  @observable
  userCRMLoaded = false;

  @observable
  @persist('object')
  userODIN = {};

  @observable
  consult = '';

  @observable
  errorBirthDate = null;

  @observable
  errorMothersName = null;

  @observable
  errorName = null;

  @observable
  stepGuestCheckout = '';

  @observable
  guestName = '';

  @observable
  errorBirthDate = null;

  @observable
  errorMothersName = null;

  @observable
  errorName = null;

  @observable
  password = '';

  @observable
  @persist
  verifiedPassword = false;

  @observable
  stepGuestCheckout = '';

  @observable
  @persist
  hasCRMAccount = false;

  @observable
  @persist
  hasMultiUserAccount = false;

  @observable
  @persist
  backLoginUrl = '';

  @observable
  isLoading = false;

  get userCRM() {
    return this.userCRM;
  }

  get userODIN() {
    return this.userODIN;
  }

  get client() {
    return this.client;
  }

  @action
  hydrateComplete = () => {
    this.hydrated = true;
  };

  @action
  login = (username, client) => {
    this.username = username;
    this.client = client;
    this.client.canChangeClass = null;
    this.client.OdinPaymentMethod = null;
    this.guestHasAccount = true;
  };

  @action
  logout = () => {
    this.username = '';
    this.client.clientId = '';
    this.client.status = '';
    this.client.canChangeClass = null;
    this.client.OdinPaymentMethod = null;
    this.userCRM = null;
    this.userODIN = {};
    this.guestHasAccount = false;
    this.hasMultiUserAccount = false;
    this.hasCRMAccount = false;
    this.verifiedPassword = false;
  };

  @action
  logoutOdin = () => {
    this.username = '';
    this.client.clientId = '';
    this.client.status = '';
    this.client.canChangeClass = null;
    this.client.OdinPaymentMethod = null;
    this.userODIN = {};
    this.guestHasAccount = false;
  };

  @action
  fetchUserAlgarCRM = () => {
    return userService.getUserCRM(this.username).then(res => {
      this.hasCRMAccount = true;
      this.userCRM = res.data;
      this.userCRMLoaded = true;
      return res.data;
    });
  };

  @action
  fetchUserODIN = () => {
    return userService.getUserODIN(this.username).then(res => {
      this.userODIN = res.data;
      return res.data;
    });
  };

  @action
  findConsultant = id => {
    return userService.salesConsultants(id).then(res => {
      this.consult = res;
      return res;
    });
  };

  @action
  fetchODINInfos = async () => {
    let odinProducts = [];
    let hasActiveODINProduct = false;
    let documentState = [];
    let documentOnlyClosed = false;
    odinProducts = await this.getODINProducts('Ativo');
    hasActiveODINProduct = odinProducts.length !== 0;
    if (this.userODIN.statusConta === 'ATIVO' && !hasActiveODINProduct) {
      documentState = await this.fetchUserDocumentState();
      documentOnlyClosed = documentState
        ? documentState.every(document => document.status === 'closed')
        : true;
    }
    if (documentOnlyClosed) {
      this.client.canChangeClass = true;
      return;
    }
    if (odinProducts.length > 0 && this.userODIN.classeCliente === 'POS-PAGO') {
      const payments = await this.getODINPaymentMethods();
      const paymentMethod = _find(payments, payment => payment.useForAutoPayments === 1);
      this.client.OdinPaymentMethod = PAYMENT_METHODS[paymentMethod['paySystem']];
    }
    this.client.canChangeClass = false;
  };

  @action
  fetchUserDocumentState = () => {
    return userService.getDocumentsState(this.username).then(res => {
      return res.data;
    });
  };

  @action
  getODINProducts = status => {
    return userService.getProductsStatesODIN(this.username, status).then(res => {
      return res.data;
    });
  };

  getODINPaymentMethods = () => {
    return userService.getODINPaymentMethod(this.username).then(res => {
      return res.data;
    });
  };

  @action
  updateClasseODIN = async newClass => {
    const newODINUser = {
      ...this.userODIN,
      classeCliente: newClass,
    };

    await GeographicInformation.streets(_get(newODINUser, 'cep')).then(
      res => (newODINUser.tipoLogradouro = _get(res, 'data.0.type.name'))
    );
    newODINUser.nome = newODINUser.nome || newODINUser.nomeConta;
    if (!newODINUser.retencaoImposto) {
      delete newODINUser.retencaoImposto;
    }
    if (!newODINUser.dataNascimento) {
      delete newODINUser.dataNascimento;
    }

    return userService.updateClientClass(this.username, { ...newODINUser }).then(() => {
      this.userODIN = newODINUser;
      this.client.canChangeClass = true;
      return this.userODIN;
    });
  };

  @action
  setUserCRMGuestNotification = ({ values }) => {
    this.userCRM = {
      ...this.userCRM,
      customerAccount: {
        notification: values,
        customerAccountContact: [
          {
            ...values?.phoneContact?.[0],
            eMailAddress: values?.eMailAddress,
          },
        ],
      },
    };
  };

  @action
  createUserCRM = customer => {
    return userService.createUserCRM(customer).then(() => {
      this.fetchUserAlgarCRM();
    });
  };

  createPassword = () => {
    const chars = 'abcdefghijklmnopqrstuvwxyz!@#$%^&*()-+<>ABCDEFGHIJKLMNOP1234567890';
    let password = '';
    for (let x = 0; x < 12; x++) {
      const i = Math.floor(Math.random() * chars.length);
      password += chars.charAt(i);
    }
    return password;
  };

  @action
  createUserODIN = (address, productCheckout) => {
    const product = _get(productCheckout, 'products[0]', {});
    const userCRM = toJS(this.userCRM);
    const contacts = _get(userCRM, 'contacts', []);
    const mainContact = _find(contacts, item => item.contactType === ContactType.PRINCIPAL);
    const mainContactCrmPhone = _get(mainContact, 'sendingPhoneNumber', '');

    if (!mainContactCrmPhone) {
      console.error('Cliente não possui número de telefone');
      return new Error('Cliente não possui número de telefone');
    }

    const birthdateCRM = userCRM.birthDate;
    const birthdate = dayjs(birthdateCRM).format('DD-MM-YYYY HH:mm:ss');
    const phoneNumber = mainContactCrmPhone.toString().startsWith('55')
      ? `${mainContactCrmPhone}`
      : `55${mainContactCrmPhone}`;
    const password = this.createPassword();
    const user = {
      nome: userCRM.name,
      nomeConta: userCRM.name,
      dataNascimento: birthdate,
      email: userCRM.email,
      telefone: phoneNumber,
      documentoCliente: userCRM.documentNumber,
      tipoLogradouro: address.addressType,
      endereco: address.address,
      numero: address.number,
      complemento: address.complement,
      bairro: address.neighbourhood,
      localidade: address.city.name,
      estado: address.state.name,
      cep: address.cep,
      classeCliente: product.paymentType,
      nomeAdmin: userCRM.name,
      emailAdmin: userCRM.email,
      telefoneAdmin: phoneNumber,
      retencaoImposto: 'NAO',
      login: this.username,
      senha: password,
    };

    return userService.createUserODIN(user).then(() => {
      return this.fetchUserODIN();
    });
  };

  @action
  clearGuestCheckoutErrors = () => {
    this.errorMothersName = null;
    this.errorBirthDate = null;
    this.errorName = null;
  };

  @action
  setUserCRM = ({ data }) => {
    this.userCRM = data;
    this.userCRMLoaded = false;
  };

  @action
  setUserCRMGuest = ({ values }) => {
    if (!this.isLogged) {
      const cpfCnpj = _get(values, 'cpfCnpj', '');
      const documentNumber = _get(values, 'documentNumber', '');
      const userDocumentNumber = cpfCnpj || documentNumber;
      const segmentId =
        _size(userDocumentNumber) === 14
          ? SEGMENTS[CustomerSegment.EMPRESARIAL]
          : SEGMENTS[CustomerSegment.RESIDENCIAL];
      const guestUser = {
        documentNumber: userDocumentNumber,
        name: _get(values, 'name', ''),
        email: _get(values, 'email', ''),
        organization: {
          name: _get(values, 'name', ''),
        },
        customerAccount: {
          notification: {
            eMailAddress: _get(values, 'email', ''),
          },
          profile: {
            segmentId,
          },
          customerAccountContact: [
            {
              eMailAddress: _get(values, 'email', ''),
              phoneContact: [
                {
                  type: 1,
                  number: Number(_get(values, 'phone', '')),
                },
              ],
            },
          ],
        },
      };
      this.username = userDocumentNumber;
      this.userCRM = guestUser;
      this.setUserODINGuest({ values: values });
    }
  };

  @action
  setUserODINGuest = ({ values }) => {
    const cpfCnpj = _get(values, 'cpfCnpj', '');
    const documentoCLiente = _get(values, 'documentNumber', '');
    const guestUser = {
      documentoCLiente: cpfCnpj || documentoCLiente,
      telefone: _get(values, 'phone', ''),
      email: _get(values, 'email', ''),
      nomeConta: _get(values, 'name', ''),
      nome: _get(values, 'name', ''),
    };
    this.userODIN = guestUser;
  };

  @action
  setUserDataFromUrl = data => {
    this.userCRM = { ...this.userCRM, documentNumber: _get(data, 'cpfCnpj', '') };
    this.username = _get(data, 'cpfCnpj', false) ? data.cpfCnpj : this.username;
    this.stepGuestCheckout = _get(data, 'step', false) ? data.step : this.stepGuestCheckout;
    this.guestName = _get(data, 'name', false) ? data.name : this.guestName;
  };

  @action
  setIsGuestUser = newValue => (this.isGuestUser = newValue);

  @action
  setGuestHasAccount = newValue => (this.guestHasAccount = newValue);

  @action
  setPassword = newValue => {
    this.password = newValue;
    this.verifiedPassword = true;
  };

  @action
  getMultiUser = async ({ documentNumber }) => {
    const response = await userService.getMultiUser(documentNumber);
    this.hasMultiUserAccount = _get(response, 'data.hasWebAccount', false);

    return this.hasMultiUserAccount;
  };

  @action
  isMultiUser = async (documentNumber = this.username) =>
    await userService.getMultiUser(documentNumber);

  @action
  getUserCRM = async ({ documentNumber }) => {
    const response = await userService.getUserCRM(documentNumber);
    this.hasCRMAccount = _get(response, 'status', 400) === 200;

    return this.hasCRMAccount;
  };

  @action
  isUserCRM = async (documentNumber = this.username) =>
    await userService.getUserCRM(documentNumber);

  @action
  setGuestErrors = ({ errorName, errorMothersName, errorBirthDate }) => {
    this.errorName = errorName;
    this.errorMothersName = errorMothersName;
    this.errorBirthDate = errorBirthDate;
  };

  @action
  loadUserLogin = (authenticationResponse, customerResponse) => {
    this.username = authenticationResponse.data.user;
    this.client = authenticationResponse.data;
    this.client.canChangeClass = null;
    this.client.OdinPaymentMethod = null;
    this.guestHasAccount = true;
    this.userCRM = customerAdapter(customerResponse.data);
    this.setPassword('');
  };

  @action
  tryToAuthenticateUser = async ({ code, state, error }) => {
    console.log('tryToAuthenticateUser', { code, state, error });
    if (this.isLoading) {
      return;
    }

    this.isLoading = true;

    try {
      if (!code && !this.guestHasAccount && !error && window.self === window.top) {
        try {
          code = await Auth.trySilentReauthorization();
        } catch (e) {
          this.isLoading = false;
          return;
        }
      }

      if (code && !this.guestHasAccount) {
        const authenticationResponse = await Auth.authenticateWithOauth2(
          code,
          state,
          window.location.href
        );
        const customerResponse = await userService.getCustomer();

        this.loadUserLogin(authenticationResponse, customerResponse);
        this.isLoading = false;
        return customerResponse;
      }
    } finally {
      this.isLoading = false;
    }
  };

  @action
  verifyDocCRMAndMultiUser = async ({ documentNumber }) => {
    try {
      const multiUser = await this.getMultiUser({ documentNumber });
      this.hasMultiUserAccount = multiUser;
    } catch (e) {
      console.error(e);
      const { status } = e.response;
      this.hasMultiUserAccount = status !== 200 && false;
    }

    try {
      const userCRM = await this.getUserCRM({ documentNumber });
      this.hasCRMAccount = userCRM;
    } catch (e) {
      console.error(e);
      const { status } = e.response;
      this.hasCRMAccount = status !== 200 && false;
    }

    return {
      userCRM: this.hasCRMAccount,
      userMulti: this.hasMultiUserAccount,
    };
  };

  @action
  setUserCRMCustomer = async () => {
    try {
      const { data } = await userService.getCustomer();
      this.userCRM = customerAdapter(data);

      return this.userCRM;
    } catch (e) {
      console.error(e);
    }
  };

  @action
  setUserOdinCustomer = async () => {
    try {
      const { data } = await userService.getCustomerOdin();
      this.userODIN = data;

      return this.userODIN;
    } catch (e) {
      console.error(e);
    }
  };

  @action
  setBackLoginUrl = url => {
    this.backLoginUrl = url;
  };

  get backLoginUrl() {
    return this.backLoginUrl;
  }

  get isLogged() {
    const { customerStatus } = this.userCRM || {};
    return customerStatus === ACTIVE;
  }

  get hasEmail() {
    return (
      !!_get(this.userCRM, 'customerAccount.notification.eMailAddress') ||
      !!_get(this.userCRM, 'email')
    );
  }

  get userIsLogged() {
    return this.username && this.verifiedPassword;
  }

  get userName() {
    return this.userCRM ? this.userCRM.name : undefined;
  }

  get isLoading() {
    return this.isLoading;
  }
}

export default User;
