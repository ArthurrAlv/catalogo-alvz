'use strict';
document.querySelector('#rsvp')?.addEventListener('click', event => { document.querySelector('#status').textContent = 'Presença confirmada nesta demonstração.'; event.currentTarget.disabled = true; });
document.querySelector('#month')?.addEventListener('change', event => { const value = Number(event.currentTarget.value); if (Number.isFinite(value)) document.querySelector('#balance').textContent = 'Saldo: ' + value.toLocaleString('pt-BR', {style:'currency',currency:'BRL'}); });
