import Logo from '../../Icons/components/Logo';
import * as styles from './CopyrightLinks.module.css';
import Link from '../../Link';
import dayjs from 'dayjs';

const CopyrightLinks = () => {
  return (
    <section className="mc center pv16 flex flex-column flex-row-l items-center">
      <div className="order-1 order-0-l pv16 pv0-l">
        {/* <Logo /> */}
      </div>

      <div className="order-1 pl26-l">
        <div className="f14 ph10-l tc">
          © Copyright {dayjs().year()} Algar Telecom - Todos os direitos reservados
        </div>
      </div>

      <div className="order-0 order-2-l w-100 w-auto-l">
        <ul className="list ma0 pa0 ml10-l mh72-m mh0-l flex flex-column flex-row-ns justify-between te-papa-green">
          <li className={`f14 ph10 pv10 pv0-ns tc relative ${styles.item} ${styles.itemFirst}`}>
            <Link
              className="link te-papa-green underline-hover"
              to="https://algartelecom.com.br/lgpd"
              target="_blank"
            >
              Privacidade e segurança da informação
            </Link>
          </li>

          <li className={`f14 ph10 pv10 pv0-ns tc relative ${styles.item}`}>
            <Link
              className="link te-papa-green underline-hover"
              to="https://algartelecom.com.br/institucional/algar/premios.html"
              target="_blank"
            >
              Conheça nossos prêmios
            </Link>
          </li>

          <li className={`f14 ph10 pv10 pv0-ns tc relative ${styles.item}`}>
            <Link
              className="link te-papa-green underline-hover"
              to="https://www.algartelecom.com.br/para-voce/atendimento/central"
              target="_blank"
            >
              Fale Conosco
            </Link>
          </li>

          <li className={`f14 ph10 pv10 pv0-ns tc relative ${styles.item}`}>
            <Link
              className="link te-papa-green  underline-hover"
              to="https://algartelecom.com.br/institucional/sustentabilidade/talentos.html"
              target="_blank"
            >
              Trabalhe Conosco
            </Link>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default CopyrightLinks;
