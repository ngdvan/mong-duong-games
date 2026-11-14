import {games} from '../catalog.js';
const root=new URL('../',import.meta.url),current=document.body.dataset.game;
const nav=document.createElement('nav');nav.className='collection-nav';nav.setAttribute('aria-label','Điều hướng bộ trò chơi');
const home=document.createElement('a');home.href=new URL('index.html',root);home.textContent='← Bộ trò chơi';nav.append(home);
const label=document.createElement('span');label.textContent=games.find(g=>g.id===current)?.title||'Mông Dương';nav.append(label);
const playable=games.filter(g=>g.status==='playable'),other=playable[(Math.max(0,playable.findIndex(g=>g.id===current))+1)%playable.length];if(other){const a=document.createElement('a');a.href=new URL(other.href,root);a.textContent='Đổi trò chơi ↗';nav.append(a);}
(document.querySelector('header')||document.body.firstElementChild).after(nav);
