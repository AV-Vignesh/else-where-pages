export const KEY = 'elsewhere.v1:' + new URL('../',import.meta.url).pathname;
export const today = (d = new Date()) => `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
export const uid = () => globalThis.crypto?.randomUUID?.() || `${Date.now()}-${Math.random().toString(36).slice(2)}`;
export const clamp = (v,a,b) => Math.min(b,Math.max(a,Number(v)||0));
export const freshState = () => ({version:1,profile:{name:'Wanderer',created:Date.now(),sparks:0},awards:{},activity:[],explore:{},quests:[],debates:[],activeDebate:null,lives:{},endings:[],pet:null,surprises:[],preferences:{motion:true,sound:false},lastRoute:'home'});
const text = (v,n=4000) => typeof v==='string' ? v.slice(0,n) : '';
const obj = v => v && typeof v==='object' && !Array.isArray(v);
const arr = (v,n=100) => Array.isArray(v) ? v.slice(0,n) : [];
const cleanDeep = (v,depth=0) => {
  if(depth>9)return null;
  if(typeof v==='string')return v.slice(0,8000);
  if(typeof v==='number')return Number.isFinite(v)?v:0;
  if(typeof v==='boolean'||v===null)return v;
  if(Array.isArray(v))return v.slice(0,300).map(x=>cleanDeep(x,depth+1));
  if(obj(v)){const o={};for(const [k,x] of Object.entries(v).slice(0,300)){if(!['__proto__','constructor','prototype'].includes(k))o[k.slice(0,120)]=cleanDeep(x,depth+1);}return o;}
  return null;
};
export function validateState(input) {
  if(!obj(input)||input.version!==1)throw new Error('This is not an Elsewhere version 1 backup.');
  if(JSON.stringify(input).length>5000000)throw new Error('This backup is too large.');
  const s=freshState();
  s.profile={name:text(input.profile?.name,32)||'Wanderer',created:clamp(input.profile?.created,0,Date.now()),sparks:clamp(input.profile?.sparks,0,1000000)};
  s.awards={};if(obj(input.awards))for(const [k,v] of Object.entries(input.awards)){if(!['__proto__','constructor','prototype'].includes(k)&&typeof v==='number'&&Number.isFinite(v))s.awards[k.slice(0,180)]=v;}
  s.activity=arr(input.activity,150).filter(x=>obj(x)&&typeof x.title==='string').map(x=>({id:text(x.id,100),title:text(x.title,160),kind:text(x.kind,30),at:clamp(x.at,0,Date.now()),sparks:clamp(x.sparks,0,100)}));
  if(obj(input.explore))for(const [id,p] of Object.entries(input.explore).slice(0,30)){if(!obj(p)||['__proto__','constructor','prototype'].includes(id))continue;s.explore[id]={step:Math.trunc(clamp(p.step,0,5)),done:arr(p.done,6).filter(Number.isInteger),answers:obj(p.answers)?cleanDeep(p.answers):{},notes:text(p.notes),reflection:text(p.reflection),complete:!!p.complete};}
  s.quests=arr(input.quests,5000).filter(x=>obj(x)&&typeof x.title==='string').map(x=>({id:text(x.id,100)||uid(),title:text(x.title,100),question:text(x.question,500),steps:arr(x.steps,6).map(v=>text(v)),created:clamp(x.created,0,Date.now())}));
  s.debates=arr(input.debates,5000).filter(x=>validDebate(x)).map(x=>cleanDebate(x));
  if(validDebate(input.activeDebate))s.activeDebate=cleanDebate(input.activeDebate);
  if(obj(input.lives))for(const [id,v] of Object.entries(input.lives).slice(0,10)){if(!obj(v)||typeof v.node!=='string'||!Array.isArray(v.history)||!obj(v.stats)||['__proto__','constructor','prototype'].includes(id))continue;s.lives[id]={node:text(v.node,50),stats:{courage:clamp(v.stats.courage,0,10),trust:clamp(v.stats.trust,0,10),insight:clamp(v.stats.insight,0,10)},inventory:arr(v.inventory,30).map(x=>text(x,80)),history:arr(v.history,100).filter(x=>obj(x)&&typeof x.node==='string'&&typeof x.choice==='string').map(x=>({node:text(x.node,50),choice:text(x.choice,300),consequence:text(x.consequence,1200)})),name:text(v.name,32)||'Wanderer',started:clamp(v.started,0,Date.now()),completed:!!v.completed,ending:text(v.ending,100)};}
  s.endings=arr(input.endings,50).filter(x=>obj(x)&&typeof x.title==='string').map(x=>({world:text(x.world,40),ending:text(x.ending,60),title:text(x.title,100),at:clamp(x.at,0,Date.now())}));
  const p=input.pet;
  if(obj(p)&&typeof p.name==='string')s.pet={name:text(p.name,24)||'Miso',element:['moss','ember','moon','tide'].includes(p.element)?p.element:'moss',temperament:['curious','brave','gentle'].includes(p.temperament)?p.temperament:'curious',born:clamp(p.born,0,Date.now()),bond:clamp(p.bond,0,100),energy:clamp(p.energy,0,100),joy:clamp(p.joy,0,100),xp:clamp(p.xp,0,100000),actions:obj(p.actions)?cleanDeep(p.actions):{},memories:arr(p.memories,30).map(x=>text(x,300)),accessory:['none','starlight','crown','halo'].includes(p.accessory)?p.accessory:'none',habitat:['grove','moon','shore'].includes(p.habitat)?p.habitat:'grove'};
  s.surprises=arr(input.surprises,5000).filter(x=>obj(x)&&typeof x.id==='string'&&obj(x.input)).map(x=>({id:text(x.id,100),input:cleanSurprise(x.input),checks:arr(x.checks,30).filter(x=>typeof x==='string'),created:clamp(x.created,0,Date.now())}));
  s.preferences={motion:input.preferences?.motion!==false,sound:input.preferences?.sound===true};
  return s;
}
function validDebate(v){return obj(v)&&typeof v.claim==='string'&&Array.isArray(v.answers)&&typeof v.id==='string';}
function cleanDebate(v){return {id:text(v.id,100),claim:text(v.claim,500),arena:text(v.arena,30)||'custom',lens:['gentle','direct','rigorous'].includes(v.lens)?v.lens:'direct',confidence:clamp(v.confidence,0,100),after:clamp(v.after,0,100),round:Math.trunc(clamp(v.round,0,4)),answers:arr(v.answers,5).map(x=>text(x)),revision:text(v.revision,1500),complete:!!v.complete,created:clamp(v.created,0,Date.now())};}
export function cleanSurprise(v){const x=obj(v)?v:{};return {recipient:text(x.recipient,60),relationship:text(x.relationship,40),occasion:text(x.occasion,40),style:['hunt','memory','night','distance'].includes(x.style)?x.style:'hunt',budget:clamp(x.budget,0,1000000),currency:['INR','USD','EUR','GBP'].includes(x.currency)?x.currency:'INR',duration:clamp(x.duration,30,240)||60,date:text(x.date,10),memory:text(x.memory,500),likes:text(x.likes,300),message:text(x.message,1200),reveal:text(x.reveal,300),place:text(x.place,200),access:text(x.access,300)};}
export function loadState(storage){try{const raw=storage?.getItem(KEY);return {state:raw?validateState(JSON.parse(raw)):freshState(),error:null};}catch(e){return {state:freshState(),error:'Your saved data could not be read. Import a backup in Settings to restore it.'};}}
export function persist(s,storage){try{storage?.setItem(KEY,JSON.stringify(s));return !!storage;}catch{return false;}}
export function award(s,key,title,kind,points=10){if(Object.hasOwn(s.awards,key))return false;s.awards[key]=Date.now();s.profile.sparks+=points;s.activity.unshift({id:uid(),title,kind,at:Date.now(),sparks:points});s.activity=s.activity.slice(0,150);if(s.pet){s.pet.xp+=points;s.pet.joy=clamp(s.pet.joy+3,0,100);s.pet.memories.unshift(title);s.pet.memories=s.pet.memories.slice(0,30);}return true;}
export function petStage(xp){return xp>=350?'Celestial':xp>=160?'Guardian':xp>=60?'Adventurer':'Hatchling';}
export function petAction(s,action,now=Date.now()){
  if(!s.pet)return {ok:false,message:'Create your creature first.'};
  const p=s.pet,last=Number(p.actions[action])||0;
  const effects={feed:[4,14,4],play:[8,-10,16],rest:[2,25,2],pet:[8,0,7]};
  if(!Object.hasOwn(effects,action))return {ok:false,message:'Unknown activity.'};
  if(now-last<8000)return {ok:false,message:'Give your little friend a moment.'};
  if(action==='play'&&p.energy<10)return {ok:false,message:'A little rest first, then play.'};
  p.actions[action]=now;
  const [bond,energy,joy]=effects[action];p.bond=clamp(p.bond+bond,0,100);p.energy=clamp(p.energy+energy,0,100);p.joy=clamp(p.joy+joy,0,100);
  award(s,`pet:${action}:${today(new Date(now))}`,`${p.name}: ${action==='pet'?'a quiet moment together':action==='feed'?'a favourite snack':action==='play'?'time to play':'a peaceful rest'}`,'pet',5);
  return {ok:true,message:{feed:'Snack accepted. With enthusiasm.',play:'That was the best idea all day.',rest:'A tiny nap. A very big dream.',pet:'You are clearly their favourite human.'}[action]};
}
