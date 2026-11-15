import {startSteps,endSteps,refs,challengeQuestions,sortCards,cardRounds,evidenceRounds,diaries} from '../content.js';
import {orderFor} from '../campaign.js';
import {missions} from '../../missions.js';
export const questionActions=[['lamp'],['radio','shield'],['no-beer'],['radio'],['lamp'],['helmet'],['brush'],['paper'],['clothes'],['worker'],['clothes'],['unknown']];
export const actionNames={meal:'Suất ăn',book:'Sổ lệnh',lamp:'Đèn & bình tự cứu',radio:'Báo người phụ trách',shield:'Quyền từ chối',helmet:'Bảo hộ',brush:'Sắp xếp',paper:'Báo công',clothes:'Quần áo',worker:'Nhận việc','no-beer':'Dừng uống bia',unknown:'Bổ sung hồ sơ',crate:'Làm tiếp',warning:'Tự xử lý',stop:'Bỏ qua'};
export function cases(config){return orderFor(challengeQuestions.length,config.level,config.count).map(i=>({...challengeQuestions[i],actions:questionActions[i],index:i}));}
export function sequencePlan(config){return Array.from({length:config.count},(_,r)=>{const base=r%2?endSteps:startSteps;const start=config.level<=2?0:Math.max(0,r%3-1);return {steps:base.slice(start,start+config.sequenceSize),source:r%2?refs.end:refs.start,end:!!(r%2),start};});}
export function missingPlan(config){const n=config.level>=6?3:config.level>=4?2:1;return orderFor(diaries.length,config.level,config.count).map(i=>({...diaries[i],slots:Array.from({length:n},(_,j)=>(diaries[i].missing+j*2)%6)}));}
export function shiftPlan(config){const ranges=[[0,1],[2,3],[4,5,6],[7,8,9],[10,11,12],missions.map((_,i)=>i)];return ranges[config.level-1].map(i=>({...missions[i],index:i}));}
export const sortPlan=config=>orderFor(sortCards.length,config.level,config.count).map(i=>({...sortCards[i],index:i}));
export const deckPlan=config=>orderFor(cardRounds.length,config.level,config.count).map(i=>cardRounds[i]);
export const evidencePlan=config=>orderFor(evidenceRounds.length,config.level,config.count).map(i=>evidenceRounds[i]);
export const missionIcon={report:'paper',eat:'meal',clothes:'clothes',boots:'boots',helmet:'helmet',special:'shield',lock:'lock',lamp:'lamp',rescue:'rescue',order:'book',arrive:'worker',endReport:'shield',returnLamp:'lamp',returnRescue:'rescue',returnGear:'clothes',wash:'shower',clean:'clothes',leave:'exit'};
