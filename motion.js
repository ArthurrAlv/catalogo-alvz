'use strict';
const reduced = matchMedia('(prefers-reduced-motion: reduce)');
const items = document.querySelectorAll('.identity-study, .software-projects article, .studio-brand, .about');
if ('IntersectionObserver' in window && !reduced.matches) {
 const observer = new IntersectionObserver(entries => entries.forEach(entry => {if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target);}}), {threshold:.08});
 items.forEach(item=>{item.classList.add('reveal');observer.observe(item);});
 document.documentElement.classList.add('motion-enabled');
} else items.forEach(item=>item.classList.add('visible'));
