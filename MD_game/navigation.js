export const WORLD={w:1300,h:1000},CELL=25;
export function blocked(x,y,buildings,radius=14){return x<25||x>1275||y<25||y>975||buildings.some(b=>x>b.x-radius&&x<b.x+b.w+radius&&y>b.y-radius&&y<b.y+b.h+radius);}
// Grid search avoids roofs; tap-to-walk never passes through a building.
export function findPath(from,to,buildings){
 if(blocked(to.x,to.y,buildings))return [];
 const grid=p=>({x:Math.round(p.x/CELL),y:Math.round(p.y/CELL)}),start=grid(from),goal=grid(to),key=p=>`${p.x},${p.y}`;
 const queue=[start],previous=new Map([[key(start),null]]);let end;
 for(let i=0;i<queue.length;i++){
  const p=queue[i];if(p.x===goal.x&&p.y===goal.y){end=p;break;}
  for(const [dx,dy]of [[1,0],[-1,0],[0,1],[0,-1]]){const n={x:p.x+dx,y:p.y+dy},k=key(n);if(!previous.has(k)&&!blocked(n.x*CELL,n.y*CELL,buildings,17)){previous.set(k,p);queue.push(n);}}
 }
 if(!end)return [];
 const path=[];for(let p=end;previous.get(key(p));p=previous.get(key(p)))path.push({x:p.x*CELL,y:p.y*CELL});
 path.reverse();path.push(to);return path;
}
