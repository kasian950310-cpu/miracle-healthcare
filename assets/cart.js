/* KBEAUTY demo cart — localStorage, per-browser. Rx items cannot be added (B2B verification required). */
var KB_CAT={
 innotox:['INNOTOX 100U',2390000,'innotox',1],
 coretox:['CORETOX 100U',2190000,'coretox',1],
 botulax:['Botulax 100U',1890000,'botulax',1],
 botaone:['BOTAONE 100U',1950000,'botaone',1],
 neuramisL:['NEURAMIS Light 1.1ml',890000,'neuramis',0],
 neuramisD:['NEURAMIS Deep Lidocaine 1.1ml',950000,'neuramis',0],
 rejeunesse:['Rejeunesse Deep 1.1ml',820000,'rejeunesse',0],
 rejuran:['Rejuran Healer 2ml',2690000,'rejuran',0],
 neuraderm:['NEURADERM Core Time Ampoule',1150000,'neuraderm',0],
 lipolab:['Lipo Lab PPC 10ml ×10',2050000,'lipolab',1],
 luthione:['Glutathione 1200mg (10 vials)',1800000,'luthione',1],
 evecain:['EVE CAIN Cream 30g',250000,'evecain',0],
 bbraun:['B.Braun syringe 31G 1ml (100)',190000,'bbraun',0]
};
function kbFmt(n){return '₫'+n.toLocaleString('vi-VN')}
function kbGet(){try{return JSON.parse(localStorage.getItem('kbcart')||'{}')}catch(e){return {}}}
function kbSet(c){try{localStorage.setItem('kbcart',JSON.stringify(c))}catch(e){}}
function kbAdd(id,q){
 if(!KB_CAT[id]||KB_CAT[id][3]) return false;
 q=Math.max(1,parseInt(q)||1);
 var c=kbGet(); c[id]=(c[id]||0)+q; kbSet(c); kbCount(); return true;
}
function kbQty(id,q){var c=kbGet(); if(q<=0){delete c[id]}else{c[id]=q} kbSet(c); kbCount();}
function kbCount(){
 var c=kbGet(),n=0; for(var k in c){ if(KB_CAT[k]) n+=c[k]; }
 document.querySelectorAll('.cartlink').forEach(function(el){
  if(/\(\d+\)/.test(el.textContent)) el.textContent=el.textContent.replace(/\(\d+\)/,'('+n+')');
 });
 return n;
}
document.addEventListener('DOMContentLoaded',kbCount);
/* re-apply count after language switch rewrites header text */
if(typeof setLang==='function'){var _kbSetLang=setLang; setLang=function(l){_kbSetLang(l); kbCount();};}
else document.addEventListener('click',function(e){if(e.target&&e.target.classList&&e.target.classList.contains('lb'))setTimeout(kbCount,0)});
