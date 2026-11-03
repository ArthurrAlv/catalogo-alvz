'use strict';
(() => {
const contactSettings = window.PORTFOLIO_CONTACT;
const whatsappLink = document.querySelector('.whatsapp-link');
if (whatsappLink && contactSettings && /^[0-9]{10,15}$/.test(contactSettings.whatsappNumber)) {
  whatsappLink.href = 'https://wa.me/' + contactSettings.whatsappNumber + '?text=' + encodeURIComponent(contactSettings.message);
  whatsappLink.removeAttribute('aria-disabled');
  whatsappLink.querySelector('small').textContent = 'Conversar ↗';
  document.querySelector('#contact-status').textContent = 'Uma conversa direta, do começo à entrega.';
}
})();
