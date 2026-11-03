'use strict';
document.querySelectorAll('.brand-reveal').forEach(button=>button.addEventListener('click',()=>button.setAttribute('aria-pressed',String(button.getAttribute('aria-pressed')!=='true'))));
const galleries={
 'gamecamp.html':[['gamecamp-demo.png','Visão geral'],['gamecamp-teams.png','Equipes'],['gamecamp-tournaments.png','Campeonatos']],
 'catalogo.html':[['catalogo-screen.png','Catálogo desktop'],['catalogo-mobile.png','Catálogo no celular']],
 'useenvio.html':[['zenvio-screen.png','Tela de acesso — interface interna em preparação']],
 'useivi.html':[['zive-screen.png','Tela de acesso — interface interna em preparação']]
};
document.querySelectorAll('[data-project]').forEach(project=>{const images=galleries[project.dataset.project];if(!images)return;const details=document.createElement('details');details.className='inline-detail';const summary=document.createElement('summary');summary.textContent=images.length>1?'Ver telas · '+images.length:'Sobre esta prévia';const gallery=document.createElement('div');gallery.className='inline-gallery';gallery.tabIndex=0;gallery.setAttribute('aria-label','Galeria de telas; role horizontalmente para navegar');images.forEach(([src,label])=>{const figure=document.createElement('figure'),img=document.createElement('img'),caption=document.createElement('figcaption');img.src='assets/'+src;img.alt=label;img.loading='lazy';caption.textContent=label;figure.append(img,caption);gallery.append(figure)});details.append(summary,gallery);project.append(details);});
