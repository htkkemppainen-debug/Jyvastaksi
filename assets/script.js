const button=document.querySelector('.menu');
const links=document.querySelector('.links');
if(button&&links){button.addEventListener('click',()=>{const open=button.getAttribute('aria-expanded')==='true';button.setAttribute('aria-expanded',String(!open));links.classList.toggle('open',!open)});links.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{button.setAttribute('aria-expanded','false');links.classList.remove('open')}));}
document.querySelectorAll('[data-year]').forEach(el=>el.textContent=new Date().getFullYear());
