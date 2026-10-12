function sampleData(service){return Array.from({length:24},(_,i)=>{const index={api:0,worker:1,search:2}[service];const requests=100+i*9+index*37;const errors=i>=16&&i<=18?Math.round(requests*.065):(i+index)%5;return {time:`${String(10+Math.floor(i*5/60)).padStart(2,'0')}:${String(i*5%60).padStart(2,'0')}`,cpu:Math.min(98,30+index*12+((i*7)%24)+(service==='worker'&&i>=15&&i<=18?30:0)),memory:40+index*10+Math.floor(i*.65),requests,errors};});}
function value(row,metric){return metric==='error'?100*row.errors/row.requests:row[metric];}
let current=[];
function render(){
 const raw=$('#threshold').value,threshold=Number(raw);
 if(raw===''||!Number.isFinite(threshold)||threshold<0||threshold>100){$('#validation').textContent='Enter a threshold between 0 and 100. The last valid view remains below.';return;}
 $('#validation').textContent='';const metric=$('#metric').value;
 current=sampleData($('#service').value).slice(-Number($('#window').value));
 const values=current.map(r=>value(r,metric));const mean=metric==='error'?100*current.reduce((s,r)=>s+r.errors,0)/current.reduce((s,r)=>s+r.requests,0):values.reduce((s,v)=>s+v,0)/values.length;
 stats([['Latest',fmt(values.at(-1),1)+'%','Last five-minute interval'],['Window average',fmt(mean,1)+'%',metric==='error'?'Request-weighted rate':'Arithmetic gauge mean'],['Peak',fmt(Math.max(...values),1)+'%','Highest interval value'],['Above threshold',values.filter(v=>v>threshold).length,`Of ${values.length} intervals`]]);
 const name={cpu:'CPU utilization',memory:'Memory utilization',error:'Request error rate'}[metric];$('#chart-title').textContent=name;
 lineChart(values,{labels:current.map(r=>r.time),threshold,unit:'Percent',title:'Synthetic '+name.toLowerCase()});
 $('#definition').textContent=metric==='error'?'Each interval error rate is errors / requests × 100. The window rate uses total errors divided by total requests; it is not an average of percentages.':'CPU and memory are fictional gauge samples. The window average is their arithmetic mean; request and error counts represent each interval.';
 $('#rows').innerHTML=current.map(r=>`<tr><td>${r.time}</td><td>${r.cpu}</td><td>${r.memory}</td><td>${r.requests}</td><td>${r.errors}</td><td>${fmt(100*r.errors/r.requests,2)}</td><td class="${value(r,metric)>threshold?'bad':'good'}">${value(r,metric)>threshold?'Yes':'No'}</td></tr>`).join('');
}
['#service','#metric','#window','#threshold'].forEach(s=>$(s).addEventListener('input',render));
$('#metric').addEventListener('change',()=>{$('#threshold').value=$('#metric').value==='error'?'5':'70';render();});
$('#export').addEventListener('click',()=>csvDownload('synthetic-application-metrics.csv',[['interval_start_utc','cpu_pct','memory_pct','requests','errors','error_pct'],...current.map(r=>[r.time,r.cpu,r.memory,r.requests,r.errors,(100*r.errors/r.requests).toFixed(4)])]));render();
