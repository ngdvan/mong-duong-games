import * as T from '../../vendor/three.module.min.js';
import {artwork,buildingArtwork} from '../shared/artwork.js?v=phaser-1';
// Flat illustrations rendered by Three.js.
export function mesh(g,c,x=0,y=0,z=0,parent){const o=new T.Mesh(g,new T.MeshBasicMaterial({color:c,side:T.DoubleSide}));o.position.set(x,y,z);parent?.add(o);return o;}
export function box(p,w,h,d,c,x=0,y=0,z=0){const o=mesh(new T.PlaneGeometry(w,d),c,x,y,z,p);o.rotation.x=-Math.PI/2;return o;}
export function boxSide(p,w,h,d,c,x=0,y=0,z=0){return mesh(new T.PlaneGeometry(w,h),c,x,y,z,p);}
export function ball(p,r,c,x=0,y=0,z=0){const o=mesh(new T.CircleGeometry(r,24),c,x,y,z,p);o.rotation.x=-Math.PI/2;return o;}
export const cyl=(p,rt,rb,h,c,x=0,y=0,z=0)=>ball(p,Math.max(rt,rb),c,x,y,z);
function picture(canvas,w=1.5,h=1.5){const texture=new T.CanvasTexture(canvas);texture.colorSpace=T.SRGBColorSpace;const p=new T.Sprite(new T.SpriteMaterial({map:texture,transparent:true,depthTest:false,depthWrite:false}));p.scale.set(w,h,1);return p;}
export function model(kind='paper'){const p=new T.Group();p.userData.kind=kind;p.add(picture(artwork(kind)));return p;}
export function worker(options={}){const p=new T.Group(),s=picture(artwork('worker',options),1.25,1.7);s.center.set(.5,.1);p.add(s);return p;}
export function building(kind='office'){
 const p=new T.Group();if(kind==='exit'){p.add(model('exit'));p.scale.setScalar(1.5);return p;}
 p.add(picture(buildingArtwork(kind),2.5,2.5));return p;
}
export const stepIcons=['paper','meal','clothes','lamp','book','worker'];
export const endIcons=['shield','lamp','clothes','shower','clothes','exit'];
export const actionIcons=['radio','shield','helmet','no-beer','brush','crate','warning','stop'];
