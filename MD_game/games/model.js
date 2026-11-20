export const sameSet=(a,b)=>a.length===b.length&&new Set(a).size===a.length&&a.every(x=>b.includes(x));
export const ordered=values=>values.every((n,i)=>n===i);
export function shuffled(values,random=Math.random){const a=[...values];for(let i=a.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}if(a.length>1&&a.every((v,i)=>v===values[i]))a.push(a.shift());return a;}
export function swap(values,a,b){const result=[...values];if(a>=0&&b>=0&&a<result.length&&b<result.length)[result[a],result[b]]=[result[b],result[a]];return result;}
export function newSession(){return {done:new Set(),errors:new Map()};}
export function record(session,key,correct,theme){if(session.done.has(key))return false;if(!correct){session.errors.set(key,theme);return false;}session.done.add(key);return true;}
export const ready=(session,total)=>session.done.size===total;
export const registeredIds=['mentor','report','platform','sequence','memory','response-cards','locker-walk','tidy','board','sort','comic','jigsaw','missing','evidence','first-shift','sharp-eyes','safe-journey','safety-dispatch','daily-mine','zero-mistake'];
export function stepPlatform(p,input,dt,platforms){
 const next={...p};dt=Math.max(0,Math.min(dt,.035));next.vx=(input.right?1:0)-(input.left?1:0);next.vx*=210;
 if(input.jump&&next.grounded){next.vy=-430;next.grounded=false;}
 next.x=Math.max(12,Math.min(2140,next.x+next.vx*dt));const previousFeet=next.y+42;next.vy+=1000*dt;next.y+=next.vy*dt;next.grounded=false;
 for(const s of platforms)if(next.vy>=0&&previousFeet<=s.y+1&&next.y+42>=s.y&&next.x+26>s.x&&next.x<s.x+s.w){next.y=s.y-42;next.vy=0;next.grounded=true;break;}
 if(next.y>550){next.x=30;next.y=380;next.vy=0;}
 return next;
}
