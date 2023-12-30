import { navigate } from 'gatsby';
import _get from 'lodash/get';
import { inject, observer } from 'mobx-react';
import queryString from 'query-string';
import { Component } from 'react';
import { navigateSegmented } from 'src/utils/navigation';
import Cart from '../modules/Cart';
import Layout from 'src/modules/Core/components/Layout';
import { showChat } from '../utils/controlChat';

@inject('bootstrap', 'user')
@observer
class PageCart extends Component {
  state = {
    segmentName: '',
  };

  componentDidMount() {
    const { bootstrap } = this.props;
    const parsedQuery = queryString.parse(window.location.search);
    const querySegment = parsedQuery.segment;
    const segment = querySegment ?? _get(bootstrap, 'segmentName', '');
    this.setState({ segmentName: segment }, () => {
      if (!segment) {
        navigate('/');
      } else {
        navigateSegmented({ url: '/carrinho', bootstrap, segment });
      }
    });
  }

  render() {
    const { bootstrap, user } = this.props;
    const { segmentName } = this.state;
    const segment = segmentName ?? _get(bootstrap, 'segmentName', '');

    if (typeof window !== 'undefined') {
      var queryParams = new URLSearchParams(window.location.search);
      let code = queryParams.get('code');
      const state = queryParams.get('state');
      const error = queryParams.get('error');
      console.log('carrinho', { code, state, error });
      user.tryToAuthenticateUser({ code, state, error });
    }

    const page = {
      title: 'Algar Telecom - Portal de Vendas Digital',
      path: '/carrinho',
    };
    showChat();

    return <Layout page={page}>{segment && <Cart segmentName={segment} />}</Layout>;
  }
}

export default PageCart;
