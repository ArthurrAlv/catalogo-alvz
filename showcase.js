'use strict';
const modal=document.querySelector('#showcase'), content=document.querySelector('#showcase-content'), title=document.querySelector('#showcase-title');
let opener;
function arrowIcon(direction) {
 const namespace = 'http://www.w3.org/2000/svg';
 const svg = document.createElementNS(namespace, 'svg');
 svg.setAttribute('aria-hidden', 'true');
 svg.setAttribute('focusable', 'false');
 svg.setAttribute('viewBox', '0 0 16 16');
 svg.setAttribute('width', '1em');
 svg.setAttribute('height', '1em');
 svg.setAttribute('fill', 'none');
 svg.setAttribute('stroke', 'currentColor');
 svg.setAttribute('stroke-width', '1.4');
 svg.setAttribute('stroke-linecap', 'round');
 svg.setAttribute('stroke-linejoin', 'round');
 svg.style.verticalAlign = '-.125em';
 const use = document.createElementNS(namespace, 'use');
 use.setAttribute('href', 'assets/arrows.svg#' + direction);
 svg.append(use);
 return svg;
}
const cases={
 'gamecamp.html':{name:'Gamecamp',text:'Interface original em demonstração de consulta.',images:['gamecamp-demo.png','gamecamp-teams.png','gamecamp-tournaments.png'],url:'demos/gamecamp/'},
 'catalogo.html':{name:'Catálogo RA Broker',text:'Catálogo público de imóveis, em desktop e celular.',images:['catalogo-screen.png','catalogo-mobile.png'],url:'https://catalogo.rabroker.com.br/'},
 'useenvio.html':{name:'useenvio',text:'Convites e gestão de convidados. A captura disponível é da tela de acesso; as telas internas ainda estão em preparação.',images:['zenvio-screen.png']},
 'useivi.html':{name:'USEIVI',text:'Controle financeiro. A captura disponível é da tela de acesso; as telas internas ainda estão em preparação.',images:['zive-screen.png']},
 'alvz.html':{name:'ALVZ — minha identidade',text:'Monograma, assinatura e contraste. A identidade do meu estúdio.',images:['brand.png','signature.svg','monogram.svg']}
};
function openSheet(link,name){opener=link;title.textContent=name;content.replaceChildren();modal.showModal();modal.scrollTop=0;}
document.querySelector('#modal-close').addEventListener('click',()=>modal.close());
modal.addEventListener('close',()=>opener?.focus({preventScroll:true}));
modal.addEventListener('click',event=>{if(event.target===modal){const r=modal.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)modal.close();}});
document.querySelectorAll('a').forEach(link=>link.addEventListener('click',event=>{
 const data=cases[link.getAttribute('href')];if(!data||event.ctrlKey||event.metaKey)return;event.preventDefault();openSheet(link,data.name);
 const text=document.createElement('p');text.textContent=data.text;content.append(text);
 const img=document.createElement('img');img.className='gallery-image';const controls=document.createElement('div');controls.className='gallery-controls';let index=0;const prev=document.createElement('button'),next=document.createElement('button'),status=document.createElement('span');status.setAttribute('aria-live','polite');prev.append(arrowIcon('left'), ' Anterior');next.append('Próxima ', arrowIcon('right'));function render(){img.src='assets/'+data.images[index];img.alt=data.name+' — imagem '+(index+1);status.textContent=(index+1)+' / '+data.images.length;prev.disabled=index===0;next.disabled=index===data.images.length-1;}prev.onclick=()=>{index--;render()};next.onclick=()=>{index++;render()};controls.append(prev,status,next);content.append(img,controls);render();if(data.url){const a=document.createElement('a');a.href=data.url;a.append('Explorar projeto ', arrowIcon('up-right'));a.className='project-link';content.append(a);}
}));
document.querySelectorAll('[data-brand]').forEach(link=>link.addEventListener('click',event=>{event.preventDefault();const name=link.querySelector('img').alt;openSheet(link,name);const sheet=document.createElement('div');sheet.className='brand-sheet';sheet.innerHTML='<h3>ASSINATURA</h3><img class="brand-main" alt=""><h3>VERSÕES</h3><div class="brand-variations"><img alt="Versão original"><img alt="Estudo monocromático"></div><h3>ESTRUTURA</h3><canvas width="900" height="600" aria-label="Contornos da marca e linhas auxiliares"></canvas><p>Estudo visual derivado da imagem original. Não representa o processo histórico de criação.</p>';sheet.querySelectorAll('img').forEach(i=>{i.src=link.getAttribute('href');});content.append(sheet);const source=new Image();source.onload=()=>{const c=sheet.querySelector('canvas'),ctx=c.getContext('2d',{willReadFrequently:true});ctx.fillStyle='#ffffff';ctx.fillRect(0,0,900,600);const size=500;ctx.drawImage(source,200,50,size,size);const pixels=ctx.getImageData(0,0,900,600),out=ctx.createImageData(900,600);out.data.fill(255);for(let y=1;y<599;y++)for(let x=1;x<899;x++){const p=(y*900+x)*4;let edge=0;for(let k=0;k<3;k++)edge+=Math.abs(pixels.data[p+k]-pixels.data[p+4+k])+Math.abs(pixels.data[p+k]-pixels.data[p+3600+k]);if(edge>140){out.data[p]=65;out.data[p+1]=69;out.data[p+2]=72;}}ctx.putImageData(out,0,0);ctx.strokeStyle='rgba(60,65,70,.17)';ctx.lineWidth=.7;for(let x=200;x<=700;x+=100){ctx.beginPath();ctx.moveTo(x,25);ctx.lineTo(x,575);ctx.stroke();}for(let y=50;y<=550;y+=100){ctx.beginPath();ctx.moveTo(170,y);ctx.lineTo(730,y);ctx.stroke();}};source.src=link.getAttribute('href');}));
