import { inject, observer } from 'mobx-react';
import _isFunction from 'lodash/isFunction';

import Link from 'modules/Link';

import Picture from './Picture';
import WeirdSection from './WeirdSection';
import WeirdBackButton from './WeirdBackButton';
import GradientBackground from './GradientBackground';

import * as styles from './styles.module.css';
import Logo from 'modules/Icons/components/Logo';
import LogoEmpresas from 'modules/Icons/components/LogoEmpresas';
import WeirdMenu from './WeirdMenu';

const WeirdLayout = ({ onClose, pictureData, bootstrap, children }) => (
  <GradientBackground>
    <Picture {...pictureData} />
    <WeirdSection>
      <div className="tw-pb-24">{children}</div>
      <Link
        className="link transparent absolute bottom-0 right-0 left-0 w-fit center mb20"
        aria-label="Ir para o site Algar Telecom"
        to={bootstrap?.homeURL}
      >
        {/* {bootstrap.isRetail && <Logo className={styles.logo} />} */}
        {!bootstrap.isRetail && <LogoEmpresas className={styles.logo} />}
      </Link>
    </WeirdSection>
    {_isFunction(onClose) && <WeirdBackButton onClick={onClose} />}
    {<WeirdMenu bootstrap={bootstrap} />}
  </GradientBackground>
);

export default inject('bootstrap')(observer(WeirdLayout));
