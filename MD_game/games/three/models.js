import * as T from '../../vendor/three.module.min.js';
const colors={green:0x315d50,yellow:0xf4c968,skin:0xd9ac81,navy:0x29495b,paper:0xfff4d0};
export function mesh(g,c,x=0,y=0,z=0,parent){const o=new T.Mesh(g,new T.MeshStandardMaterial({color:c,roughness:.85}));o.position.set(x,y,z);o.castShadow=true;o.receiveShadow=true;parent?.add(o);return o;}
export const box=(p,w,h,d,c,x=0,y=0,z=0)=>mesh(new T.BoxGeometry(w,h,d),c,x,y,z,p);
export const ball=(p,r,c,x=0,y=0,z=0)=>mesh(new T.SphereGeometry(r,12,8),c,x,y,z,p);
export const cyl=(p,rt,rb,h,c,x=0,y=0,z=0)=>mesh(new T.CylinderGeometry(rt,rb,h,16),c,x,y,z,p);
export function worker({helmet=true,color=colors.yellow}={}){const p=new T.Group();box(p,.48,.65,.33,color,0,.87);box(p,.18,.55,.24,colors.navy,-.14,.3);box(p,.18,.55,.24,colors.navy,.14,.3);box(p,.24,.13,.4,0x203930,-.14,.05,.08);box(p,.24,.13,.4,0x203930,.14,.05,.08);ball(p,.21,colors.skin,0,1.41);box(p,.14,.57,.19,color,-.36,.84);box(p,.14,.57,.19,color,.36,.84);if(helmet){const cap=cyl(p,.22,.26,.15,colors.yellow,0,1.58);ball(p,.23,colors.yellow,0,1.56);box(p,.13,.13,.08,0xfff8d8,0,1.6,.23);}box(p,.51,.07,.35,0xecebd4,0,.98);return p;}
function slash(p){const ring=mesh(new T.TorusGeometry(.57,.07,8,32),0xbd563a,0,.8,.25,p);const s=box(p,1.12,.12,.1,0xbd563a,0,.8,.29);s.rotation.z=Math.PI/4;return ring;}
export function model(kind='paper'){
 const p=new T.Group();p.userData.kind=kind;
 switch(kind){
 case 'worker':p.add(worker());break;
 case 'helmet':ball(p,.39,colors.yellow,0,.55);cyl(p,.48,.48,.09,colors.yellow,0,.45);box(p,.18,.16,.1,0xfffae0,0,.6,.38);break;
 case 'boots':for(const x of [-.23,.23]){box(p,.3,.66,.3,0x334d49,x,.44);box(p,.32,.23,.6,0x2b413b,x,.13,.14);}break;
 case 'clothes':box(p,.62,.72,.2,0xdeb35b,0,.55);box(p,.22,.5,.2,0xdeb35b,-.4,.65);box(p,.22,.5,.2,0xdeb35b,.4,.65);box(p,.66,.07,.23,colors.paper,0,.55);break;
 case 'lamp':cyl(p,.27,.34,.65,colors.yellow,0,.4);cyl(p,.19,.19,.12,0xf9f5cf,0,.76);const handle=mesh(new T.TorusGeometry(.25,.045,8,20),colors.green,0,1,0,p);break;
 case 'rescue':box(p,.55,.68,.35,0xb8c1ac,0,.42);box(p,.3,.12,.28,colors.yellow,0,.83);box(p,.38,.1,.04,colors.green,0,.5,.2);break;
 case 'meal':cyl(p,.6,.5,.1,0xe9e8d5,0,.15);ball(p,.26,0xf3e5b4,-.1,.32);ball(p,.13,0x7a9b56,.24,.3,.12);ball(p,.12,0xcf8c4c,.2,.27,-.2);break;
 case 'radio':box(p,.48,.75,.3,colors.navy,0,.48);box(p,.06,.4,.07,colors.navy,.15,1.02);for(let i=0;i<4;i++)box(p,.27,.025,.03,0xa9bdab,0,.45+i*.08,.17);box(p,.22,.15,.03,0xefd173,0,.78,.17);break;
 case 'shield':const shape=new T.Shape();shape.moveTo(-.45,.6);shape.lineTo(.45,.6);shape.lineTo(.42,-.15);shape.lineTo(0,-.5);shape.lineTo(-.42,-.15);shape.closePath();const shield=mesh(new T.ExtrudeGeometry(shape,{depth:.12,bevelEnabled:false}),0x4f826a,0,.65,0,p);const a=box(p,.12,.43,.09,colors.paper,-.12,.63,.19);a.rotation.z=.8;const b=box(p,.12,.68,.09,colors.paper,.14,.75,.19);b.rotation.z=-.65;break;
 case 'beer':cyl(p,.13,.15,.66,0x915b35,0,.4);cyl(p,.08,.08,.22,0x915b35,0,.82);box(p,.27,.27,.04,0xe8d69b,0,.45,.15);break;
 case 'no-beer':p.add(model('beer'));slash(p);break;
 case 'cigarette':{const rod=cyl(p,.05,.05,.85,0xf1e8c8,0,.65);rod.rotation.z=Math.PI/3;ball(p,.06,0xc16a3b,-.37,.85);for(let i=0;i<3;i++)ball(p,.09+i*.025,0xa4b1aa,-.37-i*.07,1+i*.15);break;}
 case 'lighter':box(p,.34,.62,.2,0xb77a43,0,.39);box(p,.32,.16,.22,0xbac1ae,0,.78);break;
 case 'brush':box(p,.65,.16,.34,0xbc8a49,0,.25);for(let i=0;i<8;i++)box(p,.055,.22,.25,0x8a9e5d,-.28+i*.08,.1);const stick=box(p,.09,.86,.09,0x8b6841,.08,.72);stick.rotation.z=-.2;break;
 case 'book':box(p,.75,.17,.55,0xf3e8bd,0,.2);box(p,.8,.06,.6,0x4e7880,0,.31);box(p,.8,.06,.6,0x4e7880,0,.08);box(p,.08,.24,.6,0x365865,-.36,.2);break;
 case 'pen':{const pen=cyl(p,.07,.07,1,colors.navy,0,.65);pen.rotation.z=-.35;const nib=cyl(p,0,.07,.2,colors.yellow,.2,.13);nib.rotation.z=-.35;break;}
 case 'ruler':box(p,.85,.1,.24,colors.yellow,0,.2);for(let i=0;i<9;i++)box(p,.025,.02,i%2?.1:.17,colors.navy,-.36+i*.09,.26);break;
 case 'paper':box(p,.7,.06,.85,colors.paper,0,.1);for(let i=0;i<4;i++)box(p,.46,.02,.035,0x819a85,0,.14,-.2+i*.13);break;
 case 'lock':box(p,.46,.45,.26,colors.yellow,0,.3);const arch=mesh(new T.TorusGeometry(.18,.045,8,20,Math.PI),colors.green,0,.57,0,p);break;
 case 'shower':cyl(p,.06,.06,1.2,0x7d9d94,-.27,.65);box(p,.55,.08,.08,0x7d9d94,-.02,1.2);cyl(p,.27,.18,.08,0xbcc8b8,.23,1.14);for(let i=0;i<5;i++)ball(p,.04,0x8bbbc2,.05+i*.08,.4+(i%2)*.2);break;
 case 'exit':box(p,.13,1.5,.15,colors.green,-.45,.75);box(p,.13,1.5,.15,colors.green,.45,.75);box(p,1.03,.15,.15,colors.green,0,1.5);const arrow=box(p,.65,.1,.11,colors.yellow,0,.9,.14);const tip=box(p,.34,.1,.11,colors.yellow,.2,1,.14);tip.rotation.z=-.55;break;
 case 'warning':{const triangle=new T.Shape();triangle.moveTo(0,.7);triangle.lineTo(.65,-.4);triangle.lineTo(-.65,-.4);triangle.closePath();mesh(new T.ExtrudeGeometry(triangle,{depth:.12,bevelEnabled:false}),colors.yellow,0,.6,0,p);box(p,.1,.42,.06,colors.navy,0,.7,.17);ball(p,.065,colors.navy,0,.36,.18);break;}
 case 'unknown':ball(p,.47,0x8fa5a0,0,.6);const arc=mesh(new T.TorusGeometry(.2,.045,8,20,Math.PI*1.6),colors.paper,0,.75,.45,p);box(p,.07,.2,.06,colors.paper,.06,.53,.45);ball(p,.04,colors.paper,.06,.35,.45);break;
 case 'stop':slash(p);break;
 case 'crate':box(p,.8,.7,.7,0xb88d56,0,.35);for(const x of [-.3,.3])box(p,.08,.77,.75,0x765d3e,x,.38);break;
 default:p.add(model('paper'));
 }
 return p;
}
export function building(kind='office'){
 const p=new T.Group(),palette={office:0xbb9564,canteen:0xb97d64,locker:0x739d94,lamp:0xbcab60,bath:0x739ba9,work:0x8c9c7b,guard:0x9c8569,exit:0x739771};
 if(kind==='exit'){p.add(model('exit'));p.scale.setScalar(1.5);return p;}
 box(p,2,1.1,1.25,palette[kind]||0x8f9a7a,0,.55);const roof=box(p,2.25,.18,1.5,colors.green,0,1.2);roof.rotation.z=.04;box(p,.38,.8,.08,0x344f45,0,.4,.67);for(const x of [-.65,.65]){box(p,.4,.32,.07,0xe2e9cc,x,.7,.67);box(p,.035,.32,.09,colors.green,x,.7,.7);}const icon=model(({office:'paper',canteen:'meal',locker:'helmet',lamp:'lamp',bath:'shower',work:'worker',guard:'shield'})[kind]||'paper');icon.position.set(0,1.35,0);icon.scale.setScalar(.65);p.add(icon);return p;
}
export const stepIcons=['paper','meal','clothes','lamp','book','worker'];
export const endIcons=['shield','lamp','clothes','shower','clothes','exit'];
export const actionIcons=['radio','shield','helmet','no-beer','brush','crate','warning','stop'];
