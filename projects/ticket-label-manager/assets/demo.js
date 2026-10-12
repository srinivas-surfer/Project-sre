const originalTickets=[
 {id:'DEMO-101',title:'Catalog response delay',type:'incident',status:'Open',labels:['incident']},
 {id:'DEMO-102',title:'Repeated queue backlog',type:'problem',status:'Open',labels:['problem']},
 {id:'DEMO-103',title:'Worker restart review',type:'incident',status:'Closed',labels:['incident','triaged']},
 {id:'DEMO-104',title:'Search timeout follow-up',type:'problem',status:'Closed',labels:['problem','category-reviewed','resolution-reviewed']},
 {id:'DEMO-105',title:'Scheduled check review',type:'incident',status:'Open',labels:['incident','triaged']},
 {id:'DEMO-106',title:'Retry policy investigation',type:'problem',status:'Closed',labels:[]}
];
let tickets=structuredClone(originalTickets), selected=new Set();
function requiredLabels(t){return [t.type,t.type==='incident'?'triaged':'category-reviewed',...(t.status==='Closed'?['resolution-reviewed']:[])];}
function missingLabels(t){return requiredLabels(t).filter(label=>!t.labels.includes(label));}
function repair(t){t.labels=[...new Set([...t.labels,...missingLabels(t)])];}
function updateSelection(){ $('#repair-selected').disabled=!selected.size;$('#message').textContent=selected.size?`${selected.size} tickets selected.`:'Select tickets to enable bulk repair.'; }
function render(){
 const incomplete=tickets.filter(t=>missingLabels(t).length).length;
 stats([['Tickets',tickets.length,'Fictional records'],['Complete',tickets.length-incomplete,'Meet current rules'],['Need review',incomplete,'Missing required labels'],['Missing labels',tickets.reduce((s,t)=>s+missingLabels(t).length,0),'Across all tickets']]);
 $('#rows').innerHTML=tickets.map(t=>`<tr><td><input type="checkbox" data-select="${t.id}" aria-label="Select ${t.id}" ${selected.has(t.id)?'checked':''}></td><td><strong>${t.id}</strong><br>${t.title}</td><td><select data-type="${t.id}" aria-label="Type for ${t.id}"><option value="incident" ${t.type==='incident'?'selected':''}>Incident</option><option value="problem" ${t.type==='problem'?'selected':''}>Problem</option></select></td><td><select data-status="${t.id}" aria-label="Status for ${t.id}"><option ${t.status==='Open'?'selected':''}>Open</option><option ${t.status==='Closed'?'selected':''}>Closed</option></select></td><td>${t.labels.map(l=>`<span class="pill">${l}</span>`).join('')||'None'}</td><td class="${missingLabels(t).length?'bad':'good'}">${missingLabels(t).join(', ')||'Complete'}</td><td><button data-repair="${t.id}" ${missingLabels(t).length?'':'disabled'}>Repair</button></td></tr>`).join('');updateSelection();
}
$('#rows').addEventListener('change',e=>{
 const id=e.target.dataset.select||e.target.dataset.type||e.target.dataset.status;
 const t=tickets.find(t=>t.id===id);if(!t)return;
 if(e.target.dataset.select){e.target.checked?selected.add(id):selected.delete(id);updateSelection();return;}
 if(e.target.dataset.type){t.labels=t.labels.filter(l=>l!=='incident'&&l!=='problem');t.type=e.target.value;t.labels.push(t.type);}
 if(e.target.dataset.status)t.status=e.target.value;
 render();
});
$('#rows').addEventListener('click',e=>{const t=tickets.find(t=>t.id===e.target.dataset.repair);if(t){repair(t);render();$('#message').textContent=`Repaired ${t.id}.`;}});
$('#repair-selected').addEventListener('click',()=>{const count=selected.size;tickets.filter(t=>selected.has(t.id)).forEach(repair);selected.clear();render();$('#message').textContent=`Reviewed and repaired ${count} selected tickets.`;});
$('#reset').addEventListener('click',()=>{tickets=structuredClone(originalTickets);selected.clear();render();});render();
