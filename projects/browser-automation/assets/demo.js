const products={notebook:{name:'Field notebook',price:12},marker:{name:'Desk marker',price:5}};
let cart={notebook:0,marker:0};
function total(){return Object.keys(cart).reduce((sum,id)=>sum+cart[id]*products[id].price,0)+(Object.values(cart).some(Boolean)?Number($('#shipping').value):0);}
function render(){
 const empty=!Object.values(cart).some(Boolean);$('#cart-empty').hidden=!empty;
 $('#cart-rows').innerHTML=Object.keys(cart).filter(id=>cart[id]>0).map(id=>`<tr><td>${products[id].name}</td><td><input type="number" data-quantity="${id}" aria-label="${products[id].name} quantity" min="0" max="20" step="1" value="${cart[id]}" style="width:90px"></td><td>$${(products[id].price*cart[id]).toFixed(2)}</td></tr>`).join('');
 $('#total').textContent='$'+total().toFixed(2);$('#checkout').disabled=empty||!$('#agreement').checked;
}
function reset(){cart={notebook:0,marker:0};$('#shipping').value='0';$('#agreement').checked=false;$('#confirmation').textContent='';render();}
Object.keys(products).forEach(id=>$('#add-'+id).addEventListener('click',()=>{cart[id]=Math.min(20,cart[id]+1);$('#confirmation').textContent='';render();}));
$('#cart-rows').addEventListener('change',e=>{const id=e.target.dataset.quantity;if(!id)return;const quantity=Number(e.target.value);if(!Number.isInteger(quantity)||quantity<0||quantity>20){$('#confirmation').textContent='Quantity must be a whole number from 0 to 20.';render();return;}cart[id]=quantity;$('#confirmation').textContent='';render();});
$('#shipping').addEventListener('change',render);$('#agreement').addEventListener('change',render);$('#reset').addEventListener('click',reset);
$('#checkout').addEventListener('click',()=>{if($('#checkout').disabled)return;const amount=total();cart={notebook:0,marker:0};$('#agreement').checked=false;render();$('#confirmation').textContent=`Fictional order DEMO-001 confirmed for $${amount.toFixed(2)}. No payment was processed.`;});
function assert(condition,message){if(!condition)throw new Error(message);}
$('#run-tests').addEventListener('click',()=>{
 const tests=[['Adding an item updates the total',()=>{$('#add-notebook').click();assert($('#total').textContent==='$12.00','Expected $12.00');}],['Quantity changes recalculate the cart',()=>{$('#add-notebook').click();const q=$('[data-quantity="notebook"]');q.value='2';q.dispatchEvent(new Event('change',{bubbles:true}));assert($('#total').textContent==='$24.00','Expected $24.00');}],['Checkout requires the demo agreement',()=>{$('#add-marker').click();assert($('#checkout').disabled,'Checkout should be disabled');}],['A valid fictional checkout confirms and clears the cart',()=>{$('#add-marker').click();$('#agreement').click();$('#checkout').click();assert($('#confirmation').textContent.includes('DEMO-001'),'Missing confirmation');assert(!$('#cart-empty').hidden,'Cart should be empty');}]];
 const results=tests.map(([name,fn])=>{reset();try{fn();return {name,passed:true};}catch(error){return {name,passed:false,error:error.message};}});reset();
 $('#test-results').innerHTML=results.map(r=>`<li class="${r.passed?'good':'bad'}"><strong>${r.passed?'PASS':'FAIL'}</strong> · ${escapeHTML(r.name)}${r.error?' — '+escapeHTML(r.error):''}</li>`).join('');
});render();
