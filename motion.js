'use strict';
const reduced = matchMedia('(prefers-reduced-motion: reduce)');
const items = document.querySelectorAll('.brand-inline, .software-projects article, .project-feature, .project-notes article, .studio-brand, .about, .contact-section');
if ('IntersectionObserver' in window && !reduced.matches) {
 const observer = new IntersectionObserver(entries => entries.forEach(entry => {if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target);}}), {threshold:.08});
 items.forEach(item=>{item.classList.add('reveal');const siblings=[...item.parentElement.children];item.style.setProperty('--reveal-delay', `${Math.min(siblings.indexOf(item), 2)*70}ms`);observer.observe(item);});
 document.documentElement.classList.add('motion-enabled');
} else items.forEach(item=>item.classList.add('visible'));
