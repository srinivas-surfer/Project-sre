const endpoints=['/catalog','/search','/cart','/checkout'];
const records=Array.from({length:1440},(_,i)=>{const minute=Math.floor(i/4);const endpoint=endpoints[(i+Math.floor(i/7))%4];const channel=i%3===0?'mobile':'web';const status=i%41===0?503:i%19===0?404:200;const latency=65+(i*37)%230+(endpoint==='/checkout'?180:0)+(status===503?600:0)+(channel==='mobile'?35:0);return {minute,endpoint,channel,status,latency};});
function percentile(values,p){if(!values.length)return 0;const sorted=[...values].sort((a,b)=>a-b);return sorted[Math.max(0,Math.ceil(sorted.length*p)-1)];}
function summarize(rows){return {count:rows.length,success:rows.filter(r=>r.status>=200&&r.status<300).length,client:rows.filter(r=>r.status>=400&&r.status<500).length,server:rows.filter(r=>r.status>=500).length,avg:rows.length?rows.reduce((s,r)=>s+r.latency,0)/rows.length:0,p90:percentile(rows.map(r=>r.latency),.9)};}
let grouped=[];
function render(){
 const window=Number($('#window').value),channel=$('#channel').value;
 const rows=records.filter(r=>r.minute>=360-window && (channel==='all'||r.channel===channel));
 const s=summarize(rows);
 stats([['Requests',fmt(s.count),'Selected records'],['Success',fmt(100*s.success/s.count,2)+'%','2xx / all requests'],['P90 latency',fmt(s.p90)+' ms','Nearest-rank percentile'],['Server errors',fmt(100*s.server/s.count,2)+'%','5xx / all requests']]);
 const start=360-window,bin=window===60?5:30;
 const buckets=Array.from({length:window/bin},(_,i)=>{const minute=start+i*bin;return {label:`${String(6+Math.floor(minute/60)).padStart(2,'0')}:${String(minute%60).padStart(2,'0')}`,count:rows.filter(r=>r.minute>=minute&&r.minute<minute+bin).length};});
 lineChart(buckets.map(b=>b.count),{labels:buckets.map(b=>b.label),unit:'Requests',title:'Synthetic interval request counts'});
 $('#traffic-rows').innerHTML=buckets.map(b=>`<tr><td>${b.label}</td><td>${b.count}</td></tr>`).join('');
 grouped=endpoints.map(endpoint=>({endpoint,...summarize(rows.filter(r=>r.endpoint===endpoint))}));
 $('#rows').innerHTML=grouped.map(r=>`<tr><td><code>${r.endpoint}</code></td><td>${r.count}</td><td>${fmt(100*r.success/r.count,1)}%</td><td>${r.client}</td><td>${r.server}</td><td>${fmt(r.avg,1)}</td><td>${r.p90}</td></tr>`).join('');
}
['#channel','#window'].forEach(s=>$(s).addEventListener('change',render));
$('#export').addEventListener('click',()=>csvDownload('synthetic-endpoint-report.csv',[['endpoint','requests','success_count','4xx_count','5xx_count','average_ms','p90_ms'],...grouped.map(r=>[r.endpoint,r.count,r.success,r.client,r.server,r.avg.toFixed(2),r.p90])]));render();
