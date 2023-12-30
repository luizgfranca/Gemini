import { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';

import LoaderCheckout from 'modules/GuestCheckout/components/Loader';
import AuthContainer from './components/AuthContainer';
import UrlPlans from './components/UrlPlans';
import ModalError from '../components/ModalError';

import { checkUrlParameters, checkEnterprisePlans } from './utils/urlParams';
import { GuestCheckoutSteps } from 'modules/GuestCheckout/utils/utils';
import { ParceiroCheckoutSteps } from 'modules/GuestCheckout/utils/utils';
import { makeAuthentication } from './utils/makeAuthentication';
import { navigateToHome } from 'src/utils/navigation';

const Authentication = ({
  user,
  order,
  cart,
  bootstrap,
  sidebar,
  product,
  checkout,
  integracaoParceiro,
}) => {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState({ hasError: false });
  const [isPartnerIntegration, setPartnerIntegration] = useState(false);
  const [queryType, setQueryType] = useState('');
  const [urlData, setUrlData] = useState(null);

  const prepareToCheckout = () => {
    checkout.setCheckoutStep(GuestCheckoutSteps.stepPlans);
    integracaoParceiro.setIntegracaoStep(ParceiroCheckoutSteps.stepIdentificationParceiro);

    order.resetOrder(user);
  };

  const storesProps = {
    order,
    cart,
    bootstrap,
    sidebar,
    product,
  };

  const getDestination = useCallback(async () => {
    const { params, hasOriginOnParams, hasPartnerIntegration } = await checkUrlParameters();
    if (hasOriginOnParams) {
      const { queryType } = checkEnterprisePlans({ params });

      setPartnerIntegration(hasPartnerIntegration);
      setQueryType(queryType);
      setUrlData(params);
    } else {
      makeAuthentication({ user, bootstrap, cart, setError });
    }
  }, []);

  useEffect(() => {
    prepareToCheckout();
  }, []);

  // useEffect(() => {
    getDestination();
  // }, [getDestination]);

  console.log('authentication');

  return (
    <AuthContainer>
      {isLoading && <LoaderCheckout type="PlansLoader" isLoading={isLoading} text="Aguarde..." />}
      {urlData && (
        <UrlPlans
          urlData={urlData}
          queryType={queryType}
          setLoading={setLoading}
          isPartnerIntegration={isPartnerIntegration}
          callback={() =>
            makeAuthentication({ user, bootstrap, cart, setError, hasUrlData: !!urlData })
          }
          setError={setError}
          {...storesProps}
        />
      )}
      <ModalError
        isOpen={error['hasError']}
        error={error}
        onClose={() => navigateToHome({ bootstrap })}
        onActionClick={() => navigateToHome({ bootstrap })}
        bootstrap={bootstrap}
      />
    </AuthContainer>
  );
};

Authentication.propTypes = {
  user: PropTypes.object,
  cart: PropTypes.object,
  bootstrap: PropTypes.object,
};

export default Authentication;
