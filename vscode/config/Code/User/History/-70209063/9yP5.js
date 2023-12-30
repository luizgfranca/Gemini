import { Component } from 'react';
import { inject } from 'mobx-react';
import classnames from 'classnames';
import * as styles from '../banner.module.css';
import Logo from 'modules/Icons/components/Logo';
import ActivateNow from '../Register/ActivateNow';

@inject('bootstrap')
class MainBanner extends Component {
  isUser = () => {
    const code = this.props.code;
    const INITIAL_USER = 0;
    const STEP1_USER = 2;
    const STEP2_USER = 12;
    const PREVIOUS_USER = 15;
    const DENIED_USER = 10;
    const ERROR_USER = 1;
    const EXPIRED_TOKEN = 11;
    if (code == INITIAL_USER || code == STEP1_USER || code == STEP2_USER || code == PREVIOUS_USER)
      return true;
    else if (code == DENIED_USER || code == ERROR_USER || code == EXPIRED_TOKEN) return false;
  };

  renderUserName = () => {
    if (this.isUser())
      return <p className="navy mt10 f14 f16-m f16-l lh-copy">Olá {this.props.nome}!</p>;
    else return null;
  };

  render() {
    const wrapperClasses = classnames(styles.blockFigure, styles.client);
    return (
      <div className={wrapperClasses}>
        <div className="mc ml72-m ml26">
          <div className="Grid-cell u-size9of12 u-sm-size5of12">
            <div className="order-1 order-0-l pv16 pv0-l mt32">
              {/* <Logo /> */}
            </div>
            <div className={styles.sideBar}>
              <h3 className="fw5 f24 f36-m f36-l ma0 navy mt32">Débito Automático</h3>
            </div>
            {this.renderUserName()}
            <h5 className="fw5 f20 ma0 navy mt20">Pague suas contas com</h5>
            <div className={styles.bannerHighlight}>
              <p>+</p>
              <h4>PRATICIDADE</h4>
            </div>
            <h4 className="fw5 f24 ma0 navy mt32">O que é débito automático?</h4>
            <p className="navy mt10 f14 f16-m f16-l lh-copy">
              É uma forma gratuita, segura e mais garantida de pagar sua conta Algar: O valor é
              debitado da sua conta bancária na data de vencimento ou no próximo dia útil.
            </p>
            <div className="mt26 mb20">
              <div className="Grid">
                <div className="u-size12of12">
                  <ActivateNow buttonType={1} codigo={this.props.codigo} nome={this.props.nome} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.whiteCover}></div>
      </div>
    );
  }
}

export default MainBanner;
