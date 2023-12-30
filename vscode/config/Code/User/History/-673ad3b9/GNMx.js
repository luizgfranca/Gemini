import _get from 'lodash/get';
import _toUpper from 'lodash/toUpper';
import _isEmpty from 'lodash/isEmpty';

import { stripSpecialChars } from 'src/utils/mask';
import { navigateToHome } from 'src/utils/navigation';
import { INTEGRACAO_PARCEIRO } from 'src/constants/urlParams';
import { checkUrlParameters } from './urlParams';
import { navigateSegmented } from 'src/utils/navigation';
import Auth from 'src/services/Auth';

export const makeAuthentication = async ({ user, bootstrap, cart, setError, hasUrlData }) => {
  // debugger;
  const locationState = typeof window !== 'undefined' ? window.history.state : {};
  const { params, hasOriginOnParams, hasOnlySegmentOnParams } = await checkUrlParameters();
  const backUrl = hasUrlData ? bootstrap.homeURL : _get(locationState, 'backUrlLogin');
  user.setBackLoginUrl(backUrl);

  if (!hasOriginOnParams && !hasOnlySegmentOnParams) {
    setError({
      hasError: true,
      icon: 'FlagError',
      title: 'Encontramos um erro',
      description: 'Não conseguimos enviar seus dados. Tente novamente.',
      buttonText: 'Fechar essa mensagem',
    });
    return;
  }

  const productsCart = _get(cart, 'products', []);

  if (_isEmpty(productsCart)) {
    navigateToHome({ bootstrap });
    return;
  }

  checkUser({
    user,
    origin: _get(params, 'origin', ''),
    cpfCnpj: _get(params, 'cpfCnpj'),
    bootstrap,
  });
};

const checkUser = ({ user, origin, cpfCnpj, bootstrap }) => {
  const isIntegrationPartner =
    stripSpecialChars(_toUpper(origin)) === stripSpecialChars(_toUpper(INTEGRACAO_PARCEIRO));

  if (!user.userIsLogged) {
    return goToAuthorization(user.backLoginUrl);
  }

  if (isIntegrationPartner) {
    user.logout();
    user.logoutOdin();
    return navigateSegmented({
      url: '/autenticacao/login',
      state: { isIntegrationPartner: isIntegrationPartner, cpfCnpj, cameFromAuth: true },
      bootstrap,
    });
  }

  return isIntegrationPartner
    ? navigateSegmented({ url: '/integracao-parceiro', bootstrap })
    : navigateSegmented({ url: '/novo-checkout', bootstrap });
};

export const goToAuthorization = callbackLocation => {
  Auth.redirectToAuthorization(callbackLocation);
};
