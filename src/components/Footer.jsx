import { footer } from '../data';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <p>{footer.copyright}</p>
        <a href="#beranda" className="footer__top">
          {footer.backToTop} <span aria-hidden="true">↑</span>
        </a>
      </div>
    </footer>
  );
}
