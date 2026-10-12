const $ = s => document.querySelector(s);
const fmt = (v, digits=0) => Number(v).toLocaleString('en-US',{maximumFractionDigits:digits,minimumFractionDigits:digits});
const escapeHTML = s => String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function csvDownload(name, rows) {
 const csv=rows.map(row=>row.map(value=>'"'+String(value).replace(/"/g,'""')+'"').join(',')).join('\r\n');
 const url=URL.createObjectURL(new Blob([csv],{type:'text/csv;charset=utf-8'}));
 const a=document.createElement('a');a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
}
function stats(items) { $('#stats').innerHTML=items.map(([label,value,detail])=>`<div class="stat"><small>${escapeHTML(label)}</small><strong>${escapeHTML(value)}</strong><small>${escapeHTML(detail||'')}</small></div>`).join(''); }
function lineChart(values,{labels=[],threshold=null,unit='',title='Synthetic measurements'}={}) {
 const w=900,h=260,left=65,right=22,top=20,bottom=40;
 const max=Math.max(1,...values,threshold===null?0:threshold)*1.12;
 const x=i=>left+i*(w-left-right)/Math.max(1,values.length-1),y=v=>h-bottom-v/max*(h-top-bottom);
 let html=`<svg class="chart" role="img" aria-label="${escapeHTML(title)}; data available in the table below" viewBox="0 0 ${w} ${h}">`;
 for(let i=0;i<=4;i++){let v=max*i/4;html+=`<line x1="${left}" x2="${w-right}" y1="${y(v)}" y2="${y(v)}" stroke="#dbe2d5"/><text x="${left-9}" y="${y(v)+4}" text-anchor="end">${fmt(v,v<10?1:0)}</text>`;}
 html+=`<polyline points="${values.map((v,i)=>`${x(i)},${y(v)}`).join(' ')}" fill="none" stroke="#235f54" stroke-width="3"/>`;
 if(threshold!==null)html+=`<line x1="${left}" x2="${w-right}" y1="${y(threshold)}" y2="${y(threshold)}" stroke="#a42f2c" stroke-width="2" stroke-dasharray="7 5"/>`;
 values.forEach((v,i)=>{if(i===0||i===values.length-1||i%Math.max(1,Math.floor(values.length/5))===0)html+=`<text x="${x(i)}" y="${h-12}" text-anchor="middle">${escapeHTML(labels[i]??i)}</text>`;});
 html+=`<text x="${left}" y="14">${escapeHTML(unit)}</text></svg>`;$('#chart').innerHTML=html;
}
