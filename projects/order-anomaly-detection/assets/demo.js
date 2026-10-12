const patterns=[-0.8,-0.4,0.1,-0.2,0.4,0.6,0.2,-0.5,0.7,1.1,0.8,0.3,-0.1,0.9,0.6,0.4,1.0,0.5,-0.3,-0.6,0.2,-0.4,-0.7,-0.2];
const baselines={north:{mean:200,std:20},south:{mean:120,std:15},west:{mean:80,std:10}};
function analyzeOrders(region,scenario,threshold){
 const b=baselines[region];
 return patterns.map((z,hour)=>{
  let count=Math.round(b.mean+z*b.std);
  if(scenario==='drop' && hour>=14 && hour<=16)count=Math.round(b.mean*(0.45+(hour-14)*0.04));
  if(scenario==='spike' && hour>=10 && hour<=11)count=Math.round(b.mean*(1.65+(hour-10)*0.05));
  const score=(count-b.mean)/b.std;
  return {hour,count,mean:b.mean,std:b.std,score,flagged:Math.abs(score)>=threshold};
 });
}
let current=[];
function render(){
 const threshold=Number($('#threshold').value);$('#threshold-value').textContent=threshold.toFixed(1);
 current=analyzeOrders($('#region').value,$('#scenario').value,threshold);
 const flagged=current.filter(r=>r.flagged).length;
 stats([['Observed orders',fmt(current.reduce((s,r)=>s+r.count,0)),'24-hour fictional total'],['Flagged hours',flagged,'Review candidates'],['Baseline mean',current[0].mean,'Orders per hour'],['Sensitivity',threshold.toFixed(1)+'σ','Absolute Z-score threshold']]);
 lineChart(current.map(r=>r.count),{labels:current.map(r=>String(r.hour).padStart(2,'0')+':00'),unit:'Orders',title:'Synthetic hourly orders'});
 $('#rows').innerHTML=current.map(r=>`<tr><td>${String(r.hour).padStart(2,'0')}:00</td><td>${r.count}</td><td>${r.mean}</td><td>${r.std}</td><td>${r.score.toFixed(2)}</td><td class="${r.flagged?'bad':'good'}">${r.flagged?'Review':'Within threshold'}</td></tr>`).join('');
}
['#scenario','#region','#threshold'].forEach(s=>$(s).addEventListener('input',render));
$('#export').addEventListener('click',()=>csvDownload('synthetic-order-analysis.csv',[['hour','orders','mean','stddev','z_score','flagged'],...current.map(r=>[r.hour,r.count,r.mean,r.std,r.score.toFixed(4),r.flagged])]));
render();
