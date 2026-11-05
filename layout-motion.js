'use strict';
(() => {
  const preference = matchMedia('(prefers-reduced-motion: reduce)');
  // Keep native details semantics while animating its actual layout height.
  document.querySelectorAll('.inline-detail').forEach(details => {
    const summary = details.querySelector('summary');
    if (!summary || !details.animate) return;
    let animation = null;
    let expanding = false;
    summary.addEventListener('click', event => {
      if (preference.matches) return;
      event.preventDefault();
      const start = details.getBoundingClientRect().height;
      const opening = animation ? !expanding : !details.open;
      animation?.cancel();
      details.style.height = '';
      details.open = true;
      const end = opening ? details.getBoundingClientRect().height : summary.getBoundingClientRect().height;
      expanding = opening;
      animation = details.animate([{height:`${start}px`},{height:`${end}px`}], {duration:320,easing:'cubic-bezier(.2,.7,.2,1)'});
      animation.onfinish = () => {details.open=opening;animation=null;details.style.height='';};
    });
    preference.addEventListener('change', () => {animation?.cancel();animation=null;details.style.height='';});
  });
  const hero = document.querySelector('.motion-hero');
  if (!hero) return;
  let queued = false;
  let active = true;
  function draw() {
    queued=false;
    const height=hero.offsetHeight;
    const progress=preference.matches?0:Math.min(1,Math.max(0,-hero.getBoundingClientRect().top/height));
    const desktop = innerWidth >= 1000;
    hero.style.setProperty('--photo-offset',`${progress*(desktop?54:28)}px`);
    hero.style.setProperty('--title-offset',`${progress*(desktop?-30:-14)}px`);
  }
  function schedule(){if(!queued&&active){queued=true;requestAnimationFrame(draw);}}
  if ('IntersectionObserver' in window) new IntersectionObserver(entries=>{active=entries[0].isIntersecting;if(active)schedule();}).observe(hero);
  addEventListener('scroll',schedule,{passive:true});
  addEventListener('resize',schedule,{passive:true});
  preference.addEventListener('change',draw);
  draw();
})();
