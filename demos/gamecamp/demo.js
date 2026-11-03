'use strict';
// Original Gamecamp presentation, isolated from authentication and database.
document.querySelector('[data-login-screen]')?.classList.add('is-hidden');
document.querySelector('[data-app-shell]')?.classList.remove('is-hidden');
const banner = document.createElement('div');
banner.textContent = 'Demonstração de consulta · dados de exemplo · sem conexão ao banco';
banner.style.cssText = 'padding:12px;text-align:center;font-size:12px;background:var(--surface);color:var(--ink);position:relative;z-index:5';
document.body.prepend(banner);
document.querySelectorAll('.nav-item[data-view]').forEach(button => button.addEventListener('click', () => {
 document.querySelectorAll('.nav-item[data-view]').forEach(item => item.classList.toggle('is-active', item === button));
 document.querySelectorAll('[data-view-panel]').forEach(panel => panel.classList.toggle('is-active', panel.dataset.viewPanel === button.dataset.view));
 document.querySelector('[data-sidebar]')?.classList.remove('is-mobile-open');
}));
document.querySelectorAll('[data-sidebar-toggle]').forEach(button => button.addEventListener('click', () => document.querySelector('[data-sidebar]')?.classList.toggle('is-mobile-open')));
document.querySelectorAll('button:not(.nav-item):not([data-sidebar-toggle])').forEach(button => {button.disabled = true;button.title = 'Indisponível no modo de consulta';});
document.querySelectorAll('form').forEach(form => form.addEventListener('submit', event => event.preventDefault()));
