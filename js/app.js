const VERSION="v3";
(()=>{
const $=s=>document.querySelector(s),app=$("#app");
const esc=s=>s.replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const ans=a=>a.split("|")[0];
$("#ver").textContent=VERSION;
function home(){document.title="Homework web";
app.innerHTML="<h1>अध्याय चुनें</h1><ul class=grid>"+SETS.map(s=>`<li><a href="#/${s.id}"><b>${esc(s.t)}</b><small>${s.q.length} प्रश्न</small></a></li>`).join("")+"</ul>";app.focus()}
function chapter(id){const s=SETS.find(x=>x.id===id);if(!s)return home();document.title=s.t+" · Homework web";
app.innerHTML=`<p><a class=back href="#/">← अध्याय सूची</a></p><h1>${esc(s.t)}</h1><div class=row><button id=cp type=button>सब कॉपी करें</button><button id=pr type=button class=alt>प्रिंट</button></div><ol class=qa>`+
s.q.map(q=>`<li><p class=q>${esc(q[0])}</p><p class=a><span>उत्तर:</span> ${esc(ans(q[1]))}</p></li>`).join("")+
`</ol><p class=nav>${nav(id)}</p>`;
$("#pr").onclick=()=>print();
$("#cp").onclick=async e=>{const t=s.t+"\n\n"+s.q.map((q,i)=>(i+1)+". "+q[0]+"\nउत्तर: "+ans(q[1])).join("\n\n");
try{await navigator.clipboard.writeText(t);e.target.textContent="कॉपी हो गया ✓"}catch(x){e.target.textContent="कॉपी नहीं हुआ"}
setTimeout(()=>e.target.textContent="सब कॉपी करें",1800)};
scrollTo(0,0);app.focus()}
function nav(id){const i=SETS.findIndex(x=>x.id===id),p=SETS[i-1],n=SETS[i+1];
return (p?`<a href="#/${p.id}">← पिछला</a>`:"<span></span>")+(n?`<a href="#/${n.id}">अगला →</a>`:"<span></span>")}
function route(){const h=location.hash.replace(/^#\/?/,"");h?chapter(h):home()}
addEventListener("hashchange",route);route();
})();
