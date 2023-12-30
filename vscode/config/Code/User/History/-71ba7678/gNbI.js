import { error } from 'console';
import _get from 'lodash/get';
import { inject, observer } from 'mobx-react';
import { makeAuthentication } from 'modules/NewCheckout/Authentication/utils/makeAuthentication';
import Navbar from 'modules/NewCheckout/components/Navbar';
import PropTypes from 'prop-types';
import { cloneElement, useEffect } from 'react';
import Helmet from 'react-helmet';
import { createQuery } from 'src/utils/blockData';
import { createMetatags } from 'src/utils/page';
import WebAnalytics from 'src/utils/web-analytics';

export const NewCheckout = ({
  integracaoParceiro,
  bootstrap,
  checkout,
  sidebar,
  product,
  order,
  cart,
  user,
  data,
  page,
  children,
}) => {
  useEffect(() => {
    const query = createQuery(data);

    bootstrap.setBusinessContext({
      segments: query('allDirectusSegmento'),
      areas: query('allDirectusAreaAtuacao'),
    });
  }, []);

  if (!WebAnalytics.isReady) {
    WebAnalytics.setContext({
      getSegment: () => _get(bootstrap.actualSegment, 'name', ''),
      getArea: () => _get(bootstrap.area, 'name', ''),
      getCity: () => _get(bootstrap.city, 'name', ''),
      getPackageName: () => bootstrap.rootStore.cart.getPackageName(),
    });
  }

  makeAuthentication({
    user, 
    bootstrap, 
    cart, 
    setError: (error) => console.log(error);, 
    hasUrlData
  })

  return (
    <>
      <Helmet title={page.title} meta={createMetatags(page)}>
        <body className="montserrat tw-bg-alabaster tw-w-auto tw-h-auto" />
      </Helmet>
      <Navbar id="checkout" url="/para-voce" cart={cart} order={order} user={user} />
      <main className="tw-bg-alabaster">
        {cloneElement(children, {
          integracaoParceiro,
          bootstrap,
          checkout,
          sidebar,
          product,
          order,
          cart,
          user,
        })}
      </main>
    </>
  );
};

NewCheckout.propTypes = {
  integracaoParceiro: PropTypes.object.isRequired,
  bootstrap: PropTypes.object.isRequired,
  order: PropTypes.object.isRequired,
  cart: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  sidebar: PropTypes.object.isRequired,
  checkout: PropTypes.object.isRequired,
  page: PropTypes.object.isRequired,
  data: PropTypes.object,
  children: PropTypes.node,
};

const NewCheckoutLayoutObserver = props => <NewCheckout {...props} />;

export default inject(
  'integracaoParceiro',
  'bootstrap',
  'checkout',
  'sidebar',
  'product',
  'order',
  'cart',
  'user'
)(observer(NewCheckoutLayoutObserver));
