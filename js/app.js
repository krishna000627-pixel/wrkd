const VERSION="v1";
(()=>{
const $=s=>document.querySelector(s),app=$("#app");
const rd=()=>{const m=document.cookie.match(/(?:^|; )hw=([^;]*)/);try{return m?JSON.parse(decodeURIComponent(m[1])):{}}catch(e){return{}}};
const wr=o=>{document.cookie="hw="+encodeURIComponent(JSON.stringify(o))+"; max-age=31536000; path=/; SameSite=Lax"+(location.protocol==="https:"?"; Secure":"")};
const norm=s=>s.toLowerCase().replace(/[\s।.,!?\-]+/g,"");
const same=(g,a)=>a.split("|").some(x=>norm(x)===norm(g));
const esc=s=>s.replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
$("#ver").textContent=VERSION;
function home(){const d=rd();document.title="Homework web";
app.innerHTML="<h1>अध्याय चुनें</h1><ul class=grid>"+SETS.map(s=>`<li><a href="#/${s.id}"><b>${esc(s.t)}</b><small>${s.q.length} प्रश्न${d[s.id]!=null?" · सर्वश्रेष्ठ "+d[s.id]+"/"+s.q.length:""}</small></a></li>`).join("")+"</ul>";app.focus()}
function quiz(id){const s=SETS.find(x=>x.id===id);if(!s)return home();let i=0,n=0;document.title=s.t+" · Homework web";
function show(){if(i>=s.q.length)return end();
app.innerHTML=`<p class=meta>${esc(s.t)} · ${i+1}/${s.q.length}</p><progress max="${s.q.length}" value="${i}" aria-label="प्रगति"></progress><h1>${esc(s.q[i][0])}</h1><form id=f><label for=a>उत्तर (एक शब्द)</label><div class=row><input id=a autocomplete=off autocapitalize=off lang=hi required><button>जाँचें</button></div></form><button id=r class=link type=button>उत्तर देखें</button><div id=o role=status aria-live=polite></div>`;
const a=$("#a"),o=$("#o");a.focus();
const fin=(good,msg)=>{a.disabled=true;$("#f button").disabled=true;$("#r").hidden=true;
o.innerHTML=`<div class="fb ${good===null?"":good?"y":"n"}">${msg}</div><button id=nx type=button>${i+1<s.q.length?"अगला":"परिणाम"}</button>`;
$("#nx").focus();$("#nx").onclick=()=>{i++;show()}};
$("#f").onsubmit=e=>{e.preventDefault();const g=same(a.value,s.q[i][1]);if(g)n++;fin(g,g?"सही! ✓":"गलत ✗ — सही उत्तर: <b>"+esc(s.q[i][1].split("|")[0])+"</b>")};
$("#r").onclick=()=>fin(null,"उत्तर: <b>"+esc(s.q[i][1].split("|")[0])+"</b>")}
function end(){const d=rd(),t=s.q.length,nb=d[id]==null||n>d[id];if(nb){d[id]=n;wr(d)}
app.innerHTML=`<h1>परिणाम</h1><div class="fb y">${n} / ${t} सही${nb?" — नया सर्वश्रेष्ठ!":""}</div><div class=row><button id=ag>फिर से</button><button id=hm class=link>अध्याय सूची</button></div>`;
$("#ag").onclick=()=>quiz(id);$("#hm").onclick=()=>{location.hash="#/"};$("#ag").focus()}
show()}
function route(){const h=location.hash.replace(/^#\/?/,"");h?quiz(h):home()}
addEventListener("hashchange",route);route();
const nt=$("#note");if(!rd().ok){nt.hidden=false}
$("#okc").onclick=()=>{const d=rd();d.ok=1;wr(d);nt.hidden=true};
$("#reset").onclick=()=>{if(confirm("सारी प्रगति मिटाएँ?")){document.cookie="hw=; max-age=0; path=/";route()}};
})();
