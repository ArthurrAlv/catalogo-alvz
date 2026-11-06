'use strict';

document.querySelectorAll('.brand-reveal').forEach(button => {
  button.addEventListener('click', () => {
    button.setAttribute('aria-pressed', String(button.getAttribute('aria-pressed') !== 'true'));
  });
});

const previews = {
  browse: ['catalogo-screen.png', 'Lista de imóveis do catálogo RA Broker', 'Explore os imóveis disponíveis no catálogo.'],
  view: ['catalogo-imovel.webp', 'Página pública de um imóvel no RA Broker', 'Confira as fotos e características de um imóvel.']
};
const frame = document.querySelector('#broker-preview');
const steps = document.querySelector('.project-steps');
if (frame && steps) {
  const image = frame.querySelector('img');
  const caption = frame.querySelector('figcaption');
  let selection = 0;
  steps.hidden = false;
  steps.addEventListener('click', async event => {
    const button = event.target.closest('[data-preview]');
    if (!button || !Object.hasOwn(previews, button.dataset.preview)) return;
    const [file, alt, text] = previews[button.dataset.preview];
    const request = ++selection;
    const source = 'assets/' + file;
    const candidate = new Image();
    candidate.src = source;
    try { await candidate.decode(); } catch {
      if (request === selection) caption.textContent = 'Não foi possível carregar esta tela. Tente novamente.';
      return;
    }
    if (request !== selection) return;
    image.src = source;
    image.alt = alt;
    caption.textContent = text;
    steps.querySelectorAll('button').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
      image.animate?.([{opacity:.55}, {opacity:1}], {duration:220, easing:'ease-out'});
    }
  });
}

const familyControls = document.querySelector('.dj-controls');
const familyPanels = document.querySelectorAll('[data-family-panel]');
if (familyControls && familyPanels.length) {
  familyControls.hidden = false;
  familyControls.addEventListener('click', event => {
    const button = event.target.closest('[data-family]');
    if (!button) return;
    familyPanels.forEach(panel => { panel.hidden = panel.dataset.familyPanel !== button.dataset.family; });
    familyControls.querySelectorAll('button').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
  });
}
