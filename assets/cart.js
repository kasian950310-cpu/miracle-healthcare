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

/* site-wide professional-items notice (koreaderma-style first-visit popup) */
(function(){
 if(/product\.html/.test(location.pathname)) return;
 var seen=false; try{seen=sessionStorage.getItem('kbAck')==='1'}catch(e){}
 if(seen) return;
 document.addEventListener('DOMContentLoaded',function(){
  var d=document.createElement('div');
  d.id='kbAckModal';
  d.style.cssText='position:fixed;inset:0;background:rgba(16,22,19,.55);z-index:80;display:flex;align-items:center;justify-content:center;padding:18px';
  d.innerHTML='<div style="background:var(--bg,#F6F5EC);max-width:440px;padding:26px;border:1px solid var(--line,#D8D6C5);font-family:inherit">'
   +'<div style="font-size:18px;font-weight:700;margin-bottom:10px;color:var(--ink,#252525)">Important notice before ordering</div>'
   +'<div style="font-size:13.5px;line-height:1.7;color:var(--sub,#6B6A5F)">Professional (Rx) items — toxins, injectable fillers, lipolysis and whitening injections — are sold <b style="color:var(--ink,#252525)">only to verified clinics, hospitals and registered spas</b>.<br><br>Cold-chain items ship refrigerated from our Vietnam warehouse in insulated boxes with ice packs; orders before 14:00 ship the same day. Once dispatched they cannot be returned except for transport damage or our error.</div>'
   +'<button type="button" id="kbAckBtn" style="margin-top:18px;width:100%;padding:13px;background:var(--ink,#252525);color:var(--bg,#F6F5EC);border:1px solid var(--ink,#252525);font-size:13px;font-weight:600;cursor:pointer">I understand</button></div>';
  document.body.appendChild(d);
  document.getElementById('kbAckBtn').onclick=function(){try{sessionStorage.setItem('kbAck','1')}catch(e){} d.remove();};
 });
})();
