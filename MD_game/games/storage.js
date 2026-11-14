const key='md-learning-results-v1';
export function readResults(){try{const data=JSON.parse(localStorage.getItem(key)||'{}');return data&&typeof data==='object'&&!Array.isArray(data)?data:{};}catch{return {};}}
export function saveResult(id,result){try{const data=readResults();data[id]={...result,at:new Date().toISOString()};localStorage.setItem(key,JSON.stringify(data));}catch{}}

// Keep campaign economy separate from previous result badges and original game A saves.
import {newLedger,validLedger,award,purchase} from './campaign.js';
const campaignKey='md-campaign-v1';
let fallback=newLedger();
export function readCampaign(){try{const parsed=JSON.parse(localStorage.getItem(campaignKey));if(validLedger(parsed)){fallback=parsed;return parsed;}}catch{}return structuredClone(fallback);}
function writeCampaign(value){fallback=structuredClone(value);try{localStorage.setItem(campaignKey,JSON.stringify(value));}catch{}return value;}
export function claimLevel(id,level){const ledger=readCampaign(),reward=award(ledger,id,level);writeCampaign(ledger);return {ledger,reward};}
export function buyHint(key){const ledger=readCampaign(),result=purchase(ledger,key);if(result.ok)writeCampaign(ledger);return {...result,ledger};}
