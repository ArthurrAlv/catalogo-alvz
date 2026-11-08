'use strict';

(() => {
  const scenes = [];
  const clamp = value => Math.min(1, Math.max(0, value));

  function createScene(content, layers, stage) {
    if (!content || layers.length < 2) return;
    const track = document.createElement('div');
    track.className = 'scroll-scene';
    content.before(track);
    track.append(content);
    content.classList.remove('reveal');
    content.classList.add('scene-sticky');
    stage.classList.add('scene-stack');
    layers.forEach(layer => {
      layer.hidden = false;
      layer.classList.add('scene-layer');
    });
    const scene = { track, content, layers };
    scenes.push(scene);
    return scene;
  }

  const broker = document.querySelector('#broker-preview');
  if (broker) {
    const image = broker.querySelector('img');
    const stack = document.createElement('div');
    image.before(stack);
    stack.append(image);
    const detail = new Image(1440, 1000);
    detail.src = 'assets/catalogo-imovel.webp';
    detail.alt = 'Fotos e detalhes de um imóvel no catálogo RA Broker';
    stack.append(detail);
    broker.querySelector('figcaption').textContent = 'Listagem de imóveis e ficha com galeria, preço e características.';
    document.querySelector('.project-steps').hidden = true;
    createScene(broker.closest('.project-feature'), [image, detail], stack);
  }

  const family = document.querySelector('#dj-family');
  if (family) {
    document.querySelector('.dj-controls').hidden = true;
    createScene(family.closest('.dj-showcase'), [...family.children], family);
  }

  const invitations = document.querySelector('.invitation-gallery');
  if (invitations) {
    const previews = [...invitations.querySelectorAll('.invitation-preview')];
    const scene = createScene(invitations.closest('.invitation-feature'), previews, invitations);
    if (scene) {
      previews.forEach((preview, index) => {
        preview.addEventListener('focus', () => {
          if (!scene.active || !preview.matches(':focus-visible')) return;
          const start = scrollY + scene.track.getBoundingClientRect().top - scene.top;
          const offset = scene.distance * index / (previews.length - 1);
          scrollTo({ top: start + offset, behavior: 'instant' });
          scene.progress = undefined;
          schedule();
        });
      });
    }
  }

  function measure() {
    scenes.forEach(scene => {
      scene.track.classList.add('scene-active');
      const height = scene.content.offsetHeight;
      // A tall composition stays in normal flow so every image remains reachable.
      scene.active = height < innerHeight - 32;
      scene.track.classList.toggle('scene-active', scene.active);
      scene.top = Math.max(24, (innerHeight - height) / 2);
      scene.distance = (scene.layers.length - 1) * innerHeight * 0.75;
      scene.track.style.setProperty('--scene-top', `${scene.top}px`);
      scene.track.style.height = scene.active ? `${height + scene.distance}px` : '';
    });
    scenes.forEach(scene => { scene.progress = undefined; });
    schedule();
  }

  let frame = null;
  let previousTime = null;

  function schedule() {
    if (frame === null) frame = requestAnimationFrame(draw);
  }

  function draw(time) {
    frame = null;
    const elapsed = previousTime === null ? 16 : time - previousTime;
    const blend = 1 - Math.exp(-elapsed / 55);
    previousTime = time;
    let moving = false;

    // Read the scene positions before writing any styles.
    const targets = scenes.map(scene => scene.active
      ? clamp((scene.top - scene.track.getBoundingClientRect().top) / scene.distance)
      : 0);

    scenes.forEach((scene, sceneIndex) => {
      const target = targets[sceneIndex];
      const current = scene.progress ?? target;
      const difference = target - current;
      const progress = Math.abs(difference) < 0.001 ? target : current + difference * blend;
      moving ||= progress !== target;
      if (scene.progress === progress) return;
      scene.progress = progress;

      const position = progress * (scene.layers.length - 1);
      scene.layers.forEach((layer, index) => {
        const angle = (index - position) * (2 * Math.PI / scene.layers.length);
        const depth = Math.cos(angle);
        const orbit = Math.sin(angle);
        layer.style.transform = scene.active
          ? `translate3d(${orbit * 15}%, ${orbit * -9}%, ${(depth - 1) * 160}px) rotateY(${orbit * -24}deg) scale(${0.88 + depth * 0.12})`
          : '';
        layer.style.opacity = scene.active ? String(0.24 + (depth + 1) * 0.38) : '';
        if (layer instanceof HTMLAnchorElement) {
          const isFront = index === Math.round(position);
          layer.style.zIndex = scene.active && isFront ? '1' : '';
          layer.style.pointerEvents = scene.active && !isFront ? 'none' : '';
        }
      });
    });

    if (moving) schedule();
    else previousTime = null;
  }

  addEventListener('scroll', schedule, { passive: true });
  addEventListener('resize', measure, { passive: true });
  document.fonts.ready.then(measure);
  addEventListener('load', measure, { once: true });
  measure();
})();
