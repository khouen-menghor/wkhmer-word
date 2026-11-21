const $=i=>document.getElementById(i),P=$('page');let cur=null,timer=null,lang='km',db;
const FONTS=[['Noto Serif Khmer','"Noto Serif Khmer",serif'],['Noto Sans Khmer','"Noto Sans Khmer",sans-serif'],['Moul','"Moul","Noto Sans Khmer",serif'],['Moulpali','"Moulpali","Noto Sans Khmer",serif'],['Battambang','"Battambang","Noto Sans Khmer",serif'],['Bokor','"Bokor","Noto Sans Khmer",serif'],['Siemreap','"Siemreap","Noto Sans Khmer",serif'],['Content','"Content","Noto Sans Khmer",serif'],['Hanuman','"Hanuman","Noto Sans Khmer",serif'],['Koulen','"Koulen","Noto Sans Khmer",serif'],['Dangrek','"Dangrek","Noto Sans Khmer",serif'],['Fasthand','"Fasthand","Noto Sans Khmer",serif'],['Odor Mean Chey','"Odor Mean Chey","Noto Sans Khmer",serif'],['Suwannaphum','"Suwannaphum","Noto Sans Khmer",serif'],['Preahvihear','"Preahvihear","Noto Sans Khmer",serif'],['Angkor','"Angkor","Noto Sans Khmer",serif'],['Bayon','"Bayon","Noto Sans Khmer",serif'],['Chenla','"Chenla","Noto Sans Khmer",serif'],['Arial','Arial,"Noto Sans Khmer",sans-serif'],['Times New Roman','"Times New Roman","Noto Serif Khmer",serif'],['Georgia','Georgia,"Noto Serif Khmer",serif'],['Verdana','Verdana,"Noto Sans Khmer",sans-serif'],['Tahoma','Tahoma,"Noto Sans Khmer",sans-serif']];
const SIZES=[8,9,10,11,12,14,16,18,20,22,24,26,28,32,36,48,72];
const T={'កិច្ចការផ្ទះ':'<h1 style="text-align:center">កិច្ចការផ្ទះ</h1><p>ឈ្មោះ៖ ........ ថ្នាក់៖ ........ កាលបរិច្ឆេទ៖ ........</p><p>សំណួរទី១៖ </p>',
'របាយការណ៍':'<h1 style="text-align:center">របាយការណ៍</h1><h2>១. សេចក្តីផ្តើម</h2><p></p><h2>២. ខ្លឹមសារ</h2><p></p><h2>៣. សេចក្តីសន្និដ្ឋាន</h2><p></p>',
'ឯកសារស្រាវជ្រាវ':'<h1 style="text-align:center">ចំណងជើងស្រាវជ្រាវ</h1><p style="text-align:center">អ្នកនិពន្ធ៖ ........</p><h2>សេចក្តីសង្ខេប</h2><p></p><h2>វិធីសាស្ត្រ</h2><p></p><h2>លទ្ធផល</h2><p></p><h2>ឯកសារយោង</h2><p></p>',
'លិខិតស្នើសុំ':'<p style="text-align:center"><b>ព្រះរាជាណាចក្រកម្ពុជា<br>ជាតិ សាសនា ព្រះមហាក្សត្រ</b></p><p>កម្មវត្ថុ៖ ........</p><p>សូមគោរពជូន ........</p><p>ខ្ញុំបាទ/នាងខ្ញុំ ........ សូមស្នើសុំ ........</p>',
'ប្រវត្តិរូបសង្ខេប (CV)':'<h1>ឈ្មោះ / Name</h1><p>Phone · Email</p><h2>ការអប់រំ / Education</h2><p></p><h2>បទពិសោធន៍ / Experience</h2><p></p><h2>ជំនាញ / Skills</h2><p></p>',
'កិច្ចការសាលា':'<h1>កិច្ចការសាលា</h1><p>មុខវិជ្ជា៖ ........</p><p></p>',
'កំណត់ត្រាមេរៀន':'<h1>កំណត់ត្រាមេរៀន</h1><p>មុខវិជ្ជា៖ ........ ថ្ងៃទី៖ ........</p><ul><li></li></ul>'};
const HELP=['របៀបបង្កើតឯកសារថ្មី៖ ចុច «បង្កើតឯកសារថ្មី»។','របៀបវាយអក្សរខ្មែរ៖ ប្តូរក្តារចុចទៅភាសាខ្មែរ ហើយចុចលើទំព័រ រួចវាយ។','របៀបវាយអក្សរអង់គ្លេស៖ ប្តូរក្តារចុចទៅ English ហើយវាយបន្តក្នុងទំព័រដដែល។','របៀបប្តូរពុម្ពអក្សរ៖ ជ្រើសអក្សរ រួចជ្រើសពុម្ពអក្សរក្នុងបញ្ជី។','របៀបប្តូរទំហំអក្សរ៖ ជ្រើសអក្សរ រួចជ្រើសទំហំ ឬវាយលេខ pt។','របៀបធ្វើអក្សរដិត៖ ជ្រើសអក្សរ រួចចុចប៊ូតុង B។','របៀបតម្រឹមអត្ថបទ៖ ចុចក្នុងកថាខណ្ឌ រួចចុចប៊ូតុងតម្រឹម។','របៀបបង្កើតទំព័រ A4៖ ទំព័រ A4 មានស្រាប់ (ផ្ទាំង «ទំព័រ» ដើម្បីកែរឹម/ទិសដៅ)។','របៀបរក្សាទុកឯកសារ៖ រក្សាទុកដោយស្វ័យប្រវត្តិ ឬចុច «រក្សាទុក»។','របៀបទាញយក Word៖ ចុច «ទាញយក» → Word (.docx)។','របៀបទាញយក PDF៖ ចុច «ទាញយក» → PDF។ នៅលើ iPhone ចុច «ចែករំលែក / រក្សាទុក PDF» រួចជ្រើស Save to Files ដើម្បីរក្សាទុក ឬ Telegram ដើម្បីផ្ញើ។','របៀបបម្រុងទុកឯកសារ៖ ទំព័រដើម → «នាំចេញឯកសារបម្រុងទុក»។','របៀបប្រើកម្មវិធីដោយគ្មានអ៊ីនធឺណិត៖ បើកកម្មវិធីម្តងដោយមានអ៊ីនធឺណិត រួចដំឡើងជា App; បន្ទាប់មកប្រើដោយគ្មានអ៊ីនធឺណិតបាន។'];
const msg=(t)=>{$('status').textContent=t};
const toast=m=>{const t=$('toast');t.textContent=m;t.classList.add('on');clearTimeout(toast.t);toast.t=setTimeout(()=>t.classList.remove('on'),2200)};
// ---------- IndexedDB ----------
const open=()=>new Promise((res,rej)=>{const r=indexedDB.open('khmerword',1);r.onupgradeneeded=()=>r.result.createObjectStore('docs',{keyPath:'id'});r.onsuccess=()=>res(r.result);r.onerror=()=>rej(r.error)});
const tx=(m,f)=>new Promise((res,rej)=>{const t=db.transaction('docs',m),r=f(t.objectStore('docs'));t.oncomplete=()=>res(r.result);t.onerror=t.onabort=()=>rej(t.error)});
const all=()=>tx('readonly',s=>s.getAll()),put=d=>tx('readwrite',s=>s.put(d)),get=i=>tx('readonly',s=>s.get(i)),del=i=>tx('readwrite',s=>s.delete(i));
const uid=()=>Date.now().toString(36)+Math.random().toString(36).slice(2,7);
// ---------- documents ----------
function pageOf(){return{or:$('or').value,mt:+$('mt').value,mb:+$('mb').value,ml:+$('ml').value,mr:+$('mr').value,pn:$('pn').checked}}
function applyPage(p){p=p||{or:'p',mt:25,mb:25,ml:30,mr:20,pn:true};$('or').value=p.or;['mt','mb','ml','mr'].forEach(k=>$(k).value=p[k]);$('pn').checked=p.pn;layout()}
const MM=3.7795,GAP=18;let pt;
function dims(){const p=pageOf(),l=p.or=='l';return{p,l,pw:(l?297:210)*MM,ph:(l?210:297)*MM,mt:p.mt*MM,mb:p.mb*MM}}
function layout(){const d=dims(),p=d.p,s=P.style;s.setProperty('--pw',d.pw+'px');s.setProperty('--ph',d.ph+'px');s.setProperty('--gap',GAP+'px');s.setProperty('--mt',p.mt+'mm');s.setProperty('--mb',p.mb+'mm');s.setProperty('--ml',p.ml+'mm');s.setProperty('--mr',p.mr+'mm');
 $('pgs').textContent='@media print{@page{size:A4 '+(d.l?'landscape':'portrait')+';margin:'+[p.mt,p.mr,p.mb,p.ml].map(x=>x+'mm').join(' ')+'}}';paginate()}
function count(){clearTimeout(pt);pt=setTimeout(paginate,120)}
function paginate(){const d=dims(),per=d.ph+GAP,ch=d.ph-d.mt-d.mb,k=[...P.children];k.forEach(e=>e.style.removeProperty('--pb'));let last=0;
 k.forEach(e=>{const t=e.offsetTop,h=e.offsetHeight,pg=Math.floor(t/per),end=pg*per+d.ph-d.mb;let pb=0;
  if(t+h>end+.5&&(h<=ch||t>=end))pb=(pg+1)*per+d.mt-t;else if(t<pg*per+d.mt-1)pb=pg*per+d.mt-t;
  if(pb>0)e.style.setProperty('--pb',pb+'px');last=Math.max(last,e.offsetTop+e.offsetHeight)});
 const n=Math.max(1,Math.floor((last-1)/per)+1);P.style.height=(n*per-GAP)+'px';zoomApply();$('pgc').textContent='ទំព័រ / Pages: '+n;refreshX()}
function zoomFactor(){const d=dims();return(innerWidth<740?(innerWidth-12)/d.pw:1)*(+$('zm').value/100)}
function zoomApply(anchor){const d=dims(),z=zoomFactor(),wrap=$('wrap'),sheet=$('sheet');P.style.transform='scale('+z+')';sheet.style.width=d.pw*z+'px';sheet.style.height=P.offsetHeight*z+'px';
 if(anchor){const wr=wrap.getBoundingClientRect(),sr=sheet.getBoundingClientRect(),left=sr.left-wr.left+wrap.scrollLeft,top=sr.top-wr.top+wrap.scrollTop;wrap.scrollLeft=left+anchor.x*z-(anchor.clientX-wr.left);wrap.scrollTop=top+anchor.y*z-(anchor.clientY-wr.top)}}
addEventListener('resize',()=>zoomApply());
const clean=()=>P.innerHTML.replace(/--pb:[^;"]*;?/g,'').replace(/ style=""/g,'');
function active(){try{document.querySelectorAll('[data-c]').forEach(b=>{
 const c=b.dataset.c;
 if(!/^(bold|italic|underline|strikeThrough|insert(Unordered|Ordered)List|justify[A-Za-z]+)$/.test(c)){b.classList.remove('act');return}
 let on=false;
 try{on=document.queryCommandState(c)}catch{}
 b.classList.toggle('act',!!on);
})}catch{}}

async function save(manual){if(!cur)return;clearTimeout(timer);msg('កំពុងរក្សាទុក...');
 try{cur.name=$('dname').value||'ឯកសារគ្មានឈ្មោះ';cur.html=clean();cur.page=pageOf();cur.modified=Date.now();await put(cur);localStorage.setItem('last',cur.id);msg('បានរក្សាទុករួចរាល់');}
 catch(e){msg('មិនអាចរក្សាទុកបានទេ');if(manual)info('មិនអាចរក្សាទុកបានទេ: '+e.message)}}
function dirty(){msg('មិនទាន់រក្សាទុក');count();clearTimeout(timer);timer=setTimeout(save,800)}
function view(ed){setTimeout(setTitle,0);$('top').hidden=!ed;$('home').hidden=ed;$('ed').hidden=!ed;if(!ed)renderList()}
async function showHome(){if(cur)await save();if(history.state&&history.state.ed)history.back();else view(false)}
async function newDoc(html){const t=typeof html=='string'?html:'<p><br></p>';const n=await promptx('ឈ្មោះឯកសារ','ឯកសារថ្មី','សូមដាក់ឈ្មោះឯកសាររបស់អ្នក');if(n===null)return;cur={id:uid(),name:n.trim()||'ឯកសារថ្មី',html:t,page:null,modified:Date.now()};load();await save()}
async function openDoc(id){const d=await get(id);if(d){cur=d;load()}}
function load(){$('dname').value=cur.name;P.innerHTML=cur.html;applyPage(cur.page);view(true);pushEd();setTimeout(()=>{count();P.focus();document.execCommand('styleWithCSS',false,true)},50)}
async function renderList(){const q=$('q').value.toLowerCase(),a=(await all()).sort((x,y)=>y.modified-x.modified).filter(d=>d.name.toLowerCase().includes(q));
 $('list').innerHTML=a.length?'':'<p>មិនទាន់មានឯកសារ។</p>';a.forEach(d=>{const c=document.createElement('div');c.className='card';c.innerHTML='<div><b></b><small>'+new Date(d.modified).toLocaleString()+'</small></div><button>ចម្លង</button><button>លុប</button>';c.querySelector('b').textContent=d.name;
 const[b,x,y]=c.children;b.onclick=()=>openDoc(d.id);x.onclick=async()=>{await put({...d,id:uid(),name:d.name+' (ចម្លង)',modified:Date.now()});renderList()};y.onclick=async()=>{if(await confirmx('លុបឯកសារ?','«'+d.name+'» នឹងត្រូវលុបជាអចិន្ត្រៃយ៍។','លុប',1)){await del(d.id);renderList()}};$('list').append(c)})}
const dupDoc=async()=>{await save();await put({...cur,id:uid(),name:cur.name+' (ចម្លង)',modified:Date.now()});toast('បានចម្លង');$('set').close()};
const renDoc=async()=>{closeAll();const n=await promptx('ប្តូរឈ្មោះឯកសារ',$('dname').value);if(n&&n.trim()){$('dname').value=n.trim();dirty();setTitle()}};
const delDoc=async()=>{if(await confirmx('លុបឯកសារនេះ?','មិនអាចត្រឡប់វិញបានទេ។','លុប',1)){await del(cur.id);cur=null;localStorage.removeItem('last');closeAll();view(false);if(history.state&&history.state.ed)history.back()}};
// ---------- formatting ----------
const dlg=i=>{if(i=='dl'){$('fn').value=$('dname').value}$(i).showModal()};
document.querySelectorAll('[data-c]').forEach(b=>{b.onmousedown=e=>e.preventDefault();b.onclick=()=>{P.focus();document.execCommand(b.dataset.c,false,null);dirty();active();setTimeout(active,0)}});
FONTS.forEach(f=>$('ff').add(new Option(f[0],f[1])));SIZES.forEach(s=>$('fs').add(new Option(s+' pt',s)));$('fs').value=12;
let sel,activeImg=null,moveImg=null;document.addEventListener('selectionchange',()=>{const s=getSelection();if(s.rangeCount&&P.contains(s.anchorNode)){sel=s.getRangeAt(0).cloneRange();active()}});
function restore(){P.focus();if(sel){const s=getSelection();s.removeAllRanges();s.addRange(sel)}}
function setSize(pt){restore();document.execCommand('styleWithCSS',false,false);document.execCommand('fontSize',false,7);document.execCommand('styleWithCSS',false,true);P.querySelectorAll('font[size="7"]').forEach(f=>{const s=document.createElement('span');s.style.fontSize=pt+'pt';s.innerHTML=f.innerHTML;f.replaceWith(s)});dirty()}
$('ff').onchange=e=>{restore();document.execCommand('fontName',false,e.target.value);dirty()};
$('fs').onchange=e=>setSize(e.target.value);$('fsm').onchange=e=>e.target.value>0&&setSize(e.target.value);
$('fc').onchange=e=>{restore();document.execCommand('foreColor',false,e.target.value);dirty()};
$('hc').onchange=e=>{restore();document.execCommand('hiliteColor',false,e.target.value);dirty()};
const blk=()=>{restore();let n=getSelection().anchorNode;while(n&&n!==P&&!(n.nodeType==1&&/^(P|DIV|H\d|LI|TD)$/.test(n.nodeName)))n=n.parentNode;if(n===P){document.execCommand('formatBlock',false,'p');n=getSelection().anchorNode;while(n&&n!==P&&n.nodeName!='P')n=n.parentNode}return n&&n!==P?n:null};
$('ls').onchange=e=>{const b=blk();if(b&&e.target.value){b.style.lineHeight=e.target.value;dirty()}};
$('ps').onchange=e=>{const b=blk();if(b&&e.target.value!==''){b.style.marginBottom=e.target.value+'pt';dirty()}};
$('paste').onclick=async()=>{restore();try{document.execCommand('insertText',false,await navigator.clipboard.readText());dirty()}catch{info('សូមប្រើ Ctrl+V ឬចុចសង្កត់ដើម្បីបិទភ្ជាប់')}};
const walk=(f)=>{const w=document.createTreeWalker(P,4);let n,a=[];while(n=w.nextNode())a.push(n);a.forEach(f)};
$('find').onclick=async()=>{const t=await promptx('ស្វែងរកពាក្យ');if(!t)return;const n=P.textContent.split(t).length-1;info(n?'រកឃើញ '+n+' កន្លែង':'រកមិនឃើញ');window.find&&window.find(t)};
$('repl').onclick=async()=>{const a=await promptx('ពាក្យចាស់');if(!a)return;const b=await promptx('ជំនួសដោយ');if(b===null)return;let c=0;walk(n=>{if(n.nodeValue.includes(a)){c+=n.nodeValue.split(a).length-1;n.nodeValue=n.nodeValue.split(a).join(b)}});info('បានជំនួស '+c);dirty()};
const ins=h=>{restore();document.execCommand('insertHTML',false,h);dirty()};
$('iimg').onclick=()=>$('imgf').click();$('imgf').onchange=e=>{const f=e.target.files[0];if(!f)return;const r=new FileReader();r.onload=()=>ins('<img src="'+r.result+'">');r.readAsDataURL(f);e.target.value=''};
let skipImageClick=false;
P.addEventListener('click',e=>{if(moveImg||skipImageClick){skipImageClick=false;return}const img=e.target.closest&&e.target.closest('img');activeImg=img&&P.contains(img)?img:null;refreshX()});
function caretAt(x,y){if(document.caretRangeFromPoint)return document.caretRangeFromPoint(x,y);const p=document.caretPositionFromPoint&&document.caretPositionFromPoint(x,y);if(!p)return null;const r=document.createRange();r.setStart(p.offsetNode,p.offset);r.collapse(true);return r}
P.addEventListener('pointerdown',e=>{if(!moveImg)return;if(e.target===moveImg)return;let r=caretAt(e.clientX,e.clientY);if(!r&&e.target===P){r=document.createRange();r.selectNodeContents(P);r.collapse(false)}if(!r||r.startContainer===moveImg||moveImg.contains(r.startContainer)){toast('សូមជ្រើសទីតាំងផ្សេង');return}e.preventDefault();r.insertNode(moveImg);activeImg=moveImg;moveImg=null;skipImageClick=true;setTimeout(()=>skipImageClick=false,300);dirty();refreshX();toast('បានផ្លាស់ទីរូបភាពរួចរាល់')},true);
function resizeImage(img,factor){moveImg=null;const scale=P.getBoundingClientRect().width/P.offsetWidth||1,cs=getComputedStyle(P),max=Math.max(24,P.clientWidth-parseFloat(cs.paddingLeft)-parseFloat(cs.paddingRight)),w=img.getBoundingClientRect().width/scale;img.style.width=Math.max(24,Math.min(max,w*factor))+'px';img.style.height='auto';dirty()}
function cropValues(){return['ct','cr','cb','cl'].map(id=>+$('crop-'+id).value)}
function updateCropPreview(){const v=cropValues(),img=$('cropPreview');img.style.clipPath='inset('+v[0]+'% '+v[1]+'% '+v[2]+'% '+v[3]+'%)';v.forEach((n,i)=>$('crop-out-'+i).textContent=n+'%')}
function openCrop(){if(!activeImg)return;moveImg=null;['ct','cr','cb','cl'].forEach(id=>{$('crop-'+id).value=0});$('cropPreview').src=activeImg.src;updateCropPreview();$('cropdlg').showModal()}
function applyCrop(){if(!activeImg)return;const v=cropValues(),img=activeImg,w=img.naturalWidth,h=img.naturalHeight,sx=Math.round(w*v[3]/100),sy=Math.round(h*v[0]/100),sw=Math.max(1,w-sx-Math.round(w*v[1]/100)),sh=Math.max(1,h-sy-Math.round(h*v[2]/100)),scale=Math.min(1,4096/Math.max(sw,sh)),canvas=document.createElement('canvas');canvas.width=Math.max(1,Math.round(sw*scale));canvas.height=Math.max(1,Math.round(sh*scale));try{const ctx=canvas.getContext('2d');if(!ctx)throw new Error('Canvas is unavailable');ctx.drawImage(img,sx,sy,sw,sh,0,0,canvas.width,canvas.height);img.src=canvas.toDataURL('image/png');$('cropdlg').close();dirty();refreshX()}catch(e){$('cropdlg').close();info('មិនអាចកាត់រូបភាពបានទេ','សូមជ្រើសរូបភាពដែលបានបញ្ចូលក្នុងឯកសារនេះ ហើយព្យាយាមម្ដងទៀត។')}}
['ct','cr','cb','cl'].forEach(id=>$('crop-'+id).oninput=updateCropPreview);
$('crop-cancel').onclick=()=>$('cropdlg').close();$('crop-apply').onclick=applyCrop;
$('itab').onclick=async()=>{const r=+await promptx('ចំនួនជួរដេក',3),c=+await promptx('ចំនួនជួរឈរ',3);if(r>0&&c>0)ins('<table>'+('<tr>'+'<td><br></td>'.repeat(c)+'</tr>').repeat(r)+'</table><p><br></p>')};
$('ipn').onclick=()=>{$('pn').checked=true;dirty();info('លេខទំព័រនឹងបង្ហាញខាងក្រោមទំព័រនីមួយៗក្នុង Word/PDF')};
$('idt').onclick=()=>ins(new Date().toLocaleDateString('km-KH'));
$('ilk').onclick=async()=>{const u=await promptx('តំណភ្ជាប់ (URL)','https://');if(u){restore();document.execCommand('createLink',false,u);dirty()}};
$('ihd').onclick=()=>{restore();document.execCommand('formatBlock',false,'h1');dirty()};
document.querySelectorAll('.mg,#or,#pn').forEach(e=>e.onchange=()=>{layout();dirty()});
function updateZoom(anchor){const z=+$('zm').value;$('zmv').textContent=z+'%';$('zm').setAttribute('aria-valuetext',z+'%');zoomApply(anchor)}
function changeZoom(amount){$('zm').value=Math.max(0,Math.min(500,+$('zm').value+amount));updateZoom()}
$('zm').oninput=()=>updateZoom();
$('zminus').onclick=()=>changeZoom(-10);$('zplus').onclick=()=>changeZoom(10);
$('zreset').onclick=()=>{$('zm').value=100;updateZoom()};
let pinch=null;
const sheet=$('sheet'),wrap=$('wrap');
sheet.addEventListener('touchstart',e=>{
 if(e.touches.length!==2||e.target.closest('button,input,select,textarea'))return;
 const a=e.touches[0],b=e.touches[1],r=sheet.getBoundingClientRect(),distance=Math.hypot(b.clientX-a.clientX,b.clientY-a.clientY),z=zoomFactor();
 if(!distance||!z)return;
 const clientX=(a.clientX+b.clientX)/2,clientY=(a.clientY+b.clientY)/2;
 pinch={distance,zoom:Math.max(1,+$('zm').value),x:(clientX-r.left)/z,y:(clientY-r.top)/z,clientX,clientY};
 e.preventDefault()
},{passive:false});
sheet.addEventListener('touchmove',e=>{
 if(e.touches.length!==2||!pinch)return;
 e.preventDefault();
 const a=e.touches[0],b=e.touches[1],distance=Math.hypot(b.clientX-a.clientX,b.clientY-a.clientY);
 $('zm').value=Math.max(1,Math.min(500,Math.round(pinch.zoom*distance/pinch.distance)));
 updateZoom(pinch)
},{passive:false});
sheet.addEventListener('touchend',e=>{if(e.touches.length<2)pinch=null});
sheet.addEventListener('touchcancel',()=>{pinch=null});
P.addEventListener('input',dirty);$('dname').addEventListener('input',dirty);$('fn').addEventListener('input',()=>{$('dname').value=$('fn').value;dirty();setTitle()});$('dname').addEventListener('input',setTitle);
function setTitle(){document.title=(!$('ed').hidden&&$('dname').value.trim())||'Khmer Word'}
P.addEventListener('paste',e=>{e.preventDefault();const t=e.clipboardData.getData('text/plain');document.execCommand('insertText',false,t)});
P.addEventListener('keyup',active);
P.addEventListener('mouseup',active);
P.addEventListener('touchend',()=>setTimeout(active,0));
document.addEventListener('visibilitychange',()=>{document.hidden&&save()});addEventListener('pagehide',()=>save());
document.querySelectorAll('#tabs [data-t]').forEach(b=>b.onclick=()=>{const was=b.classList.contains('on');document.querySelectorAll('#tabs button').forEach(x=>x.classList.remove('on'));$('tb').classList.toggle('shut',was);if(was)return;b.classList.add('on');document.querySelectorAll('.g').forEach(g=>g.classList.toggle('show',g.dataset.g.split(' ').includes(b.dataset.t)))});
$('tb').classList.add('shut');
// ---------- export DOCX ----------
const mm=x=>Math.round(x*56.7),hex=c=>{const m=c&&c.match(/\d+/g);return m&&m.length>=3?m.slice(0,3).map(v=>(+v).toString(16).padStart(2,'0')).join(''):null};
function runs(n,st,D){let out=[];n.childNodes.forEach(c=>{if(c.nodeType==3){if(c.nodeValue)out.push(new D.TextRun({text:c.nodeValue,...st}))}else if(c.nodeType==1){const s={...st},t=c.nodeName,cs=c.style;
 if(t=='BR'){out.push(new D.TextRun({break:1}));return}
 if(t=='IMG'){const b=c.src.split(','),u=Uint8Array.from(atob(b[1]),x=>x.charCodeAt(0)),nw=c.naturalWidth||300,nh=c.naturalHeight||200,requested=cs.width.endsWith('px')?parseFloat(cs.width):nw,w=Math.max(1,Math.min(requested,450)),h=Math.round(w*nh/nw);out.push(new D.ImageRun({data:u,transformation:{width:w,height:h}}));return}
 if(/^(B|STRONG|H\d)$/.test(t))s.bold=true;if(/^(I|EM)$/.test(t))s.italics=true;if(t=='U'||t=='A')s.underline={};if(/^(S|STRIKE|DEL)$/.test(t))s.strike=true;
 if(cs.fontWeight=='bold'||+cs.fontWeight>=600)s.bold=true;if(cs.fontStyle=='italic')s.italics=true;const td=cs.textDecorationLine||cs.textDecoration||'';if(/underline/.test(td))s.underline={};if(/line-through/.test(td))s.strike=true;if(t=='FONT'&&c.face){const f=c.face.split(',')[0].replace(/["']/g,'').trim();s.font={ascii:f,hAnsi:f,cs:f,eastAsia:f}}
 if(t=='FONT'&&c.color)s.color=hex(c.color)||c.getAttribute('color').replace('#','');
 if(cs.color)s.color=hex(cs.color)||s.color;if(cs.backgroundColor)s.shading={type:'clear',fill:hex(cs.backgroundColor)||'FFFF00'};
 if(cs.fontFamily){const f=cs.fontFamily.split(',')[0].replace(/["']/g,'').trim();s.font={ascii:f,hAnsi:f,cs:f,eastAsia:f}}
 if(cs.fontSize&&cs.fontSize.endsWith('pt')){s.size=Math.round(parseFloat(cs.fontSize)*2);s.sizeComplexScript=s.size}
 if(/^(UL|OL|TABLE|P|DIV|H\d)$/.test(t))return;out=out.concat(runs(c,s,D))}});return out}
function blocks(root,D,list){const out=[];root.childNodes.forEach(n=>{if(n.nodeType==3){if(n.nodeValue.trim())out.push(new D.Paragraph({children:runs({childNodes:[n]},{},D)}));return}if(n.nodeType!=1)return;const t=n.nodeName,s=n.style;
 const base={font:{ascii:'Noto Serif Khmer',hAnsi:'Noto Serif Khmer',cs:'Noto Serif Khmer',eastAsia:'Noto Serif Khmer'},size:24,sizeComplexScript:24};
 const al={left:'LEFT',center:'CENTER',right:'RIGHT',justify:'JUSTIFIED'}[s.textAlign],opt=()=>({alignment:al&&D.AlignmentType[al],spacing:{line:s.lineHeight?Math.round(parseFloat(s.lineHeight)*240):undefined,after:s.marginBottom?Math.round(parseFloat(s.marginBottom)*20):120}});
 if(/^H[1-3]$/.test(t)){const z={H1:32,H2:28,H3:24}[t]*1;out.push(new D.Paragraph({...opt(),children:runs(n,{...base,size:z*2-(t=='H1'?0:0)},D)}));return}
 if(t=='UL'||t=='OL'){n.querySelectorAll(':scope>li').forEach(li=>out.push(new D.Paragraph({children:runs(li,base,D),...(t=='UL'?{bullet:{level:0}}:{numbering:{reference:'num',level:0}})})));return}
 if(t=='TABLE'){out.push(new D.Table({width:{size:100,type:D.WidthType.PERCENTAGE},rows:[...n.rows].map(r=>new D.TableRow({children:[...r.cells].map(c=>new D.TableCell({children:[new D.Paragraph({children:runs(c,base,D)})]}))}))}));return}
 if(t=='P'||t=='DIV'||t=='BLOCKQUOTE'){if(n.querySelector('p,div,ul,ol,table')&&t!='P')out.push(...blocks(n,D));else out.push(new D.Paragraph({...opt(),children:runs(n,base,D)}))}
 else out.push(new D.Paragraph({children:runs({childNodes:[n]},base,D)}))});return out}
async function mkDocx(){const D=window.docx,p=pageOf(),l=p.or=='l';
 const foot=p.pn?{default:new D.Footer({children:[new D.Paragraph({alignment:D.AlignmentType.CENTER,children:[new D.TextRun({children:[D.PageNumber.CURRENT]})]})]})}:undefined;
 const doc=new D.Document({numbering:{config:[{reference:'num',levels:[{level:0,format:'decimal',text:'%1.',alignment:'left'}]}]},sections:[{properties:{page:{size:{width:11906,height:16838,orientation:l?D.PageOrientation.LANDSCAPE:D.PageOrientation.PORTRAIT},margin:{top:mm(p.mt),bottom:mm(p.mb),left:mm(p.ml),right:mm(p.mr)}}},footers:foot,children:blocks(P,D)}]});
 return D.Packer.toBlob(doc)}
async function expDocx(){try{await save();const b=await mkDocx();closeAll();MOB?await readyFile(b,fname()+'.docx','Word'):(dl(b,fname()+'.docx'),toast('ទាញយក Word បានជោគជ័យ ✓'))}catch(e){info('មិនអាចទាញយក Word បានទេ',e.message)}}
async function expPdf(){closeAll();await save();if(MOB)return pdfImg();await document.fonts.ready;document.title=fname();setTimeout(()=>print(),200)}
function dl(b,n){const a=document.createElement('a'),url=URL.createObjectURL(b);a.href=url;a.download=n;document.body.append(a);a.click();setTimeout(()=>{URL.revokeObjectURL(url);a.remove()},60000)}
// ---------- backup ----------
async function exportBackup(){const d=await all();dl(new Blob([JSON.stringify({app:'khmerword',v:1,docs:d})],{type:'application/json'}),'khmer-word-backup-'+new Date().toISOString().slice(0,10)+'.json');$('set').open&&$('set').close()}
$('bk').onchange=async e=>{const f=e.target.files[0];e.target.value='';if(!f)return;try{const j=JSON.parse(await f.text());if(j.app!='khmerword')throw 0;const ex=new Set((await all()).map(d=>d.id));let a=0,c=0;
 for(const d of j.docs){if(ex.has(d.id)){c++;if(await confirmx('«'+d.name+'» មានរួចហើយ','នាំចូលជាច្បាប់ចម្លង? (មិនសរសេរជាន់លើឯកសារចាស់ទេ)','នាំចូល'))await put({...d,id:uid(),name:d.name+' (ស្ដារ)'}),a++}else{await put(d);a++}}
 info('បានស្ដារ '+a+' ឯកសារ (ស្ទួន '+c+')');renderList()}catch{info('ឯកសារបម្រុងទុកមិនត្រឹមត្រូវ')}};
// ---------- lang / init ----------
function setLang(l){lang=l;document.documentElement.lang=l;document.querySelectorAll('[data-en]').forEach(e=>{const t=[...e.childNodes].find(n=>n.nodeType==3&&n.nodeValue.trim());if(!t)return;if(!e.dataset.km)e.dataset.km=t.nodeValue;t.nodeValue=l=='en'?e.dataset.en:e.dataset.km});document.querySelectorAll('[data-enph]').forEach(e=>{if(!e.dataset.kph)e.dataset.kph=e.placeholder;e.placeholder=l=='en'?e.dataset.enph:e.dataset.kph});localStorage.setItem('lang',l);document.querySelectorAll('.segl button').forEach(b=>b.classList.toggle('act',(b.textContent=='English')==(l=='en')))}
async function storage(){try{navigator.storage&&navigator.storage.persist&&navigator.storage.persist();const e=await navigator.storage.estimate();if(e.quota&&e.usage/e.quota>.8){$('stor').hidden=false;$('stor').textContent='ទំហំផ្ទុកជិតពេញ! សូមបម្រុងទុក និងលុបឯកសារមិនចាំបាច់។'}}catch{}}
// ---------- iOS-style modals, naming, back button, Telegram ----------
function icon(name){
 const paths={
  share:['M12 16V4m0 0 4 4m-4-4L8 8','M5 12v7h14v-7'],
  download:['M12 4v12m0 0 4-4m-4 4-4-4','M5 16v4h14v-4'],
  edit:['M12 20h9','M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4Z'],
  trash:['M3 6h18','M8 6V4h8v2','M19 6l-1 14H6L5 6','M10 11v5m4-5v5'],
  close:['M5 5l14 14','M19 5 5 19'],
  sparkle:['M12 3l1.9 5.8L20 11l-6.1 2.2L12 19l-1.9-5.8L4 11l6.1-2.2L12 3Z','M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8L19 15Z'],
  question:['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z','M9.6 9a2.5 2.5 0 1 1 4.3 1.8c-1.1 1-1.9 1.4-1.9 3','M12 17.5v.1'],
  list:['M9 6h12M9 12h12M9 18h12','M4 6h.01M4 12h.01M4 18h.01'],
  copy:['M8 8V4h12v12h-4','M4 8h12v12H4z'],
  document:['M6 3h8l5 5v13H6z','M14 3v5h5','M9 13h7M9 17h7'],
  crop:['M8 3v13a2 2 0 0 0 2 2h11','M3 8h13a2 2 0 0 1 2 2v11'],
  move:['M12 3v18m0-18-3 3m3-3 3 3m-3 15-3-3m3 3 3-3M3 12h18m-18 0 3-3m-3 3 3 3m15-3-3-3m3 3-3 3'],
  resize:['M4 20 20 4m-8 0h8v8m-16 0v8h8']
 };
 const svg=document.createElementNS('http://www.w3.org/2000/svg','svg');
 svg.setAttribute('viewBox','0 0 24 24');svg.setAttribute('class','btn-icon');svg.setAttribute('aria-hidden','true');
 paths[name].forEach(d=>{const p=document.createElementNS('http://www.w3.org/2000/svg','path');p.setAttribute('d',d);p.setAttribute('fill','none');p.setAttribute('stroke','currentColor');p.setAttribute('stroke-width','1.8');p.setAttribute('stroke-linecap','round');p.setAttribute('stroke-linejoin','round');svg.append(p)});
 return svg
}
function setIconLabel(button,name,label){button.replaceChildren(icon(name),document.createTextNode(label))}
function modal(o){return new Promise(res=>{const d=$('ios');d.className=o.sheet?'sheet':'alert';d.innerHTML='<div class="mb"><b></b><p></p>'+(o.input?'<input>':'')+'</div><div class="mbt"></div>';
 const b=d.querySelector('b'),p=d.querySelector('p'),inp=d.querySelector('input'),bt=d.querySelector('.mbt');b.textContent=o.title||'';p.textContent=o.msg||'';b.hidden=!o.title;p.hidden=!o.msg;
 if(inp){inp.value=o.value===undefined?'':o.value;inp.onkeydown=e=>{if(e.key=='Enter')end(inp.value)}}let done=false;const end=v=>{if(done)return;done=true;d.close();res(v)};
 o.buttons.forEach(x=>{const e=document.createElement('button');e.className=x.c||'';if(x.i)e.append(icon(x.i));e.append(document.createTextNode(x.t));e.onclick=()=>end(x.v===undefined?(inp?inp.value:true):x.v);bt.append(e)});
 d.oncancel=e=>{e.preventDefault();end(inp?null:false)};if(o.sheet){const x=document.createElement('button');x.className='x';x.setAttribute('aria-label','Close dialog');x.append(icon('close'));x.onclick=()=>end(false);d.prepend(x)}d.showModal();inp&&inp.focus()})}
const info=(t,m)=>modal({title:t,msg:m,buttons:[{t:'យល់ព្រម',c:'b'}]});
const confirmx=(t,m,ok,danger)=>modal({title:t,msg:m,buttons:[{t:'បោះបង់',v:false},{t:ok||'យល់ព្រម',c:danger?'r b':'b',v:true}]});
const promptx=(t,v,m)=>modal({title:t,msg:m,input:1,value:v,buttons:[{t:'បោះបង់',v:null},{t:'យល់ព្រម',c:'b'}]});
const closeAll=()=>document.querySelectorAll('dialog[open]').forEach(d=>d.close());
const fname=()=>(($('dname').value||'document')).replace(/[\\/:*?"<>|]+/g,'').trim().slice(0,60)||'document';
function pushEd(){if(!(history.state&&history.state.ed))history.pushState({ed:1},'')}
addEventListener('popstate',async()=>{if(document.querySelector('dialog[open]')){closeAll();if(!$('ed').hidden)pushEd();return}if(cur&&!$('ed').hidden){await save();view(false)}});
const IOS=/iPad|iPhone|iPod/.test(navigator.userAgent)||(navigator.platform==='MacIntel'&&navigator.maxTouchPoints>1);
const MOB=IOS||/Android/.test(navigator.userAgent);
const loadJs=s=>(window.__l=window.__l||{})[s]||(window.__l[s]=new Promise((r,j)=>{const e=document.createElement('script');e.src=s;e.onload=r;e.onerror=j;document.head.append(e)}));
let pdfFontCss;
async function embeddedPdfFontCss(families){
 try{
  if(!pdfFontCss)pdfFontCss=await (await fetch('fonts.css')).text();
  let css=pdfFontCss;
  const blocks=css.match(/@font-face\{[^}]+\}/g)||[];
  css=blocks.filter(b=>families.some(f=>b.includes('"'+f+'"'))).join('\n');
  if(!css)css=pdfFontCss;
  const urls=[...css.matchAll(/url\(([^)]+)\)/g)].map(m=>m[1].replace(/^['"]|['"]$/g,''));
  await Promise.all([...new Set(urls)].map(async u=>{
   try{
    const b=await (await fetch(u)).arrayBuffer();
    let binary='';
    const bytes=new Uint8Array(b);
    for(let i=0;i<bytes.length;i+=8192)binary+=String.fromCharCode(...bytes.subarray(i,i+8192));
    css=css.split('url('+u+')').join('url(data:font/woff2;base64,'+btoa(binary)+')');
   }catch{}
  }));
  return css;
 }catch{return ''}
}
async function svgPdfPage(host,d,k,per,families){
 const source=P.cloneNode(true);
 source.contentEditable='false';source.spellcheck=false;source.lang='km';source.dir='ltr';
 const copyStyle=(sourceNode,targetNode)=>{
  const cs=getComputedStyle(sourceNode),properties=['position','left','top','width','height','min-height','font-family','font-size','font-style','font-weight','line-height','text-align','color','background','background-color','padding','padding-top','padding-right','padding-bottom','padding-left','margin','margin-top','margin-right','margin-bottom','margin-left','border','border-collapse','border-spacing','text-decoration','text-decoration-line','vertical-align','transform','display','overflow'];
  properties.forEach(p=>targetNode.style.setProperty(p,cs.getPropertyValue(p)));
 };
 copyStyle(P,source);
 source.style.position='absolute';source.style.left='0';source.style.top=(-k*per)+'px';source.style.transform='none';source.style.textRendering='optimizeLegibility';source.style.fontKerning='normal';source.style.fontVariantLigatures='common-ligatures contextual';
 const sources=[...P.querySelectorAll('*')],targets=[...source.querySelectorAll('*')];
 sources.forEach((el,i)=>{if(targets[i])copyStyle(el,targets[i])});
 source.querySelectorAll('*').forEach(el=>{el.style.textRendering='optimizeLegibility';el.style.fontKerning='normal';el.style.fontVariantLigatures='common-ligatures contextual';el.style.fontFeatureSettings='"liga" 1,"clig" 1,"ccmp" 1,"kern" 1'});
 const css=await embeddedPdfFontCss(families);
 source.setAttribute('xmlns','http://www.w3.org/1999/xhtml');
 const markup=new XMLSerializer().serializeToString(source);
 const svg='<svg xmlns="http://www.w3.org/2000/svg" width="'+d.pw+'" height="'+d.ph+'" viewBox="0 0 '+d.pw+' '+d.ph+'"><foreignObject width="'+d.pw+'" height="'+d.ph+'"><div xmlns="http://www.w3.org/1999/xhtml" style="width:'+d.pw+'px;height:'+d.ph+'px;overflow:hidden;background:#fff"><style>'+css+'</style>'+markup+'</div></foreignObject></svg>';
 const blob=new Blob([svg],{type:'image/svg+xml;charset=utf-8'}),url=URL.createObjectURL(blob),img=new Image();
 await new Promise((resolve,reject)=>{img.onload=resolve;img.onerror=reject;img.src=url});
 const scale=3,canvas=document.createElement('canvas');canvas.width=Math.round(d.pw*scale);canvas.height=Math.round(d.ph*scale);
 const ctx=canvas.getContext('2d');if(!ctx)throw new Error('Canvas is unavailable');
 ctx.fillStyle='#fff';ctx.fillRect(0,0,canvas.width,canvas.height);ctx.drawImage(img,0,0,canvas.width,canvas.height);URL.revokeObjectURL(url);
 return canvas;
}
async function pdfImg(){toast('កំពុងបង្កើត PDF...');try{await Promise.all([loadJs('vendor/html2canvas.min.js'),loadJs('vendor/jspdf.umd.min.js'),document.fonts.ready]);
 const d=dims(),per=d.ph+GAP,n=Math.max(1,Math.round((P.offsetHeight+GAP)/per)),o=d.l?'l':'p',pdf=new window.jspdf.jsPDF({orientation:o,unit:'pt',format:'a4',compress:true}),W=pdf.internal.pageSize.getWidth(),H=pdf.internal.pageSize.getHeight();
 const fonts=new Set();
 [P,...P.querySelectorAll('*')].forEach(el=>{const s=getComputedStyle(el),family=s.fontFamily.split(',')[0].replace(/["']/g,'').trim(),weight=s.fontWeight;if(family)fonts.add((weight||'400')+' 16px "'+family+'"')});
 await Promise.all([...fonts].map(req=>document.fonts.load(req,P.textContent).catch(()=>{})));
 const families=[...new Set([P,...P.querySelectorAll('*')].map(el=>getComputedStyle(el).fontFamily.split(',')[0].replace(/["']/g,'').trim()).filter(Boolean))];
 for(let k=0;k<n;k++){const host=document.createElement('div');host.style.cssText='position:fixed;left:0;top:0;z-index:5;pointer-events:none;width:'+d.pw+'px;height:'+d.ph+'px;overflow:hidden;background:#fff';
  let c;
  if(IOS){
   c=await svgPdfPage(host,d,k,per,families);
  }else{
   const cl=P.cloneNode(true);cl.contentEditable='false';cl.spellcheck=false;cl.style.cssText+=';transform:none;position:absolute;left:0;top:'+(-k*per)+'px';host.append(cl);document.body.append(host);
   await new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)));
   c=await html2canvas(host,{scale:2,backgroundColor:'#fff',logging:false,useCORS:true,scrollX:0,scrollY:0,windowWidth:d.pw,windowHeight:d.ph});
  }
  host.remove();
  if(k)pdf.addPage('a4',o);pdf.addImage(c.toDataURL('image/png'),'PNG',0,0,W,H);c.width=c.height=0}
 await readyFile(pdf.output('blob'),fname()+'.pdf','PDF')}catch(e){info('មិនអាចបង្កើត PDF បានទេ',e.message)}}
async function readyFile(blob,name,kind){const f=new File([blob],name,{type:blob.type});
 if(IOS)return iosFileReady(f,name,blob,kind);
 const v=await modal({sheet:1,title:kind+' រួចរាល់ ✓',msg:'«'+name+'»',buttons:[{t:'ចែករំលែក '+kind+' ទៅកាន់ Telegram',i:'share',c:'b share',v:'s'},{t:'រក្សាទុក '+kind+' ក្នុង File',i:'download',c:'b',v:'d'},{t:'បិទ',i:'close',c:'c',v:false}]});
 if(v=='d')return dl(blob,name);if(v!='s')return;
 try{if(navigator.canShare&&navigator.canShare({files:[f]})){await navigator.share({files:[f]});return}}catch(e){if(e.name=='AbortError')return;info('មិនអាចបើកការចែករំលែកបានទេ',e.message);return}
 dl(blob,name)}
function iosFileReady(file,name,blob,kind){
 const d=$('ios');d.className='sheet';d.innerHTML='';
 const box=document.createElement('div');box.className='mb';
 const title=document.createElement('b');title.textContent=kind+' រួចរាល់';
 const text=document.createElement('p');text.textContent='ជ្រើស Telegram ដើម្បីចែករំលែក ឬ Save to Files ដើម្បីរក្សាទុក។';
 box.append(title,text);
 const buttons=document.createElement('div');buttons.className='mbt';
 const share=document.createElement('button');share.className='b';setIconLabel(share,'share','ចែករំលែក '+kind+' ទៅកាន់ Telegram');
 const shareFile=()=>{
  if(!navigator.share||(navigator.canShare&&!navigator.canShare({files:[file]}))){d.close();dl(blob,name);return}
  let task;
  try{task=navigator.share({files:[file]})}
  catch(e){d.close();info('មិនអាចចែករំលែកឯកសារបានទេ',e.message);return}
  d.close();
  Promise.resolve(task).catch(e=>{if(e.name!='AbortError')info('មិនអាចចែករំលែកឯកសារបានទេ','សូមពិនិត្យថា Safari អាចចែករំលែកឯកសារនេះបាន ហើយព្យាយាមម្ដងទៀត។')});
 };
 share.onclick=shareFile;
 const download=document.createElement('button');setIconLabel(download,'download','រក្សាទុក '+kind+' ក្នុង File');download.onclick=shareFile;
 const close=document.createElement('button');close.className='c';setIconLabel(close,'close','បិទ');close.onclick=()=>d.close();
 buttons.append(share,download,close);d.append(box,buttons);d.showModal();
}
async function saveSheet(){await save(true);const v=await modal({sheet:1,title:'បានរក្សាទុករួចរាល់ ✓',msg:'«'+$('dname').value+'» ត្រូវបានរក្សាទុកក្នុងឧបករណ៍នេះ។',buttons:[{t:'ទាញយកជា Word (.docx)',c:'b',v:'w'},{t:'ទាញយកជា PDF (.pdf)',c:'b',v:'p'},{t:'បិទ',i:'close',c:'c',v:false}]});if(v=='w')expDocx();else if(v=='p')expPdf()}
(async()=>{history.replaceState({home:1},'');Object.entries(T).forEach(([k,v])=>{const b=document.createElement('button');b.textContent=k;b.onclick=()=>newDoc(v);$('tpls').append(b)});
 HELP.forEach(h=>{const li=document.createElement('li');li.textContent=h;$('hl').append(li)});$('q').oninput=renderList;
 try{db=await open()}catch{info('មិនអាចបើកការផ្ទុកក្នុង Browser បានទេ');return}
 storage();setLang(localStorage.getItem('lang')||'km')
 const last=localStorage.getItem('last');if(last){const d=await get(last);if(d){cur=d;load()}else view(false)}else view(false);
 if('serviceWorker' in navigator)navigator.serviceWorker.register('sw.js').catch(()=>{})})();

// ---------- remove (x) buttons on images & tables ----------
function refreshX(){
 const L=$('xl');if(!L)return;L.replaceChildren();
 if(activeImg&&!P.contains(activeImg)){activeImg=null;moveImg=null}
 const s=$('sheet').getBoundingClientRect();
 const makeButton=(name,label,fn,klass,shortLabel)=>{const b=document.createElement('button');b.type='button';b.className=(klass||'')+(shortLabel?' img-action':'');b.title=label;b.setAttribute('aria-label',label);b.append(icon(name));if(shortLabel)b.append(document.createTextNode(shortLabel));b.onpointerdown=e=>e.stopPropagation();b.onclick=e=>{e.preventDefault();e.stopPropagation();fn()};return b};
 P.querySelectorAll('img,table').forEach(el=>{
  const r=el.getBoundingClientRect(),left=r.left-s.left,top=r.top-s.top;
  if(el===activeImg){
   const outline=document.createElement('div');outline.className='img-highlight';outline.style.left=left+'px';outline.style.top=top+'px';outline.style.width=r.width+'px';outline.style.height=r.height+'px';L.append(outline);
   const tools=document.createElement('div');tools.className='img-tools';tools.style.left=Math.max(0,Math.min(left,s.width-270))+'px';tools.style.top=Math.max(4,top-44)+'px';
   const smaller=document.createElement('button');smaller.type='button';smaller.textContent='−';smaller.title='បន្ថយទំហំ';smaller.setAttribute('aria-label','បន្ថយទំហំរូបភាព');smaller.onclick=e=>{e.preventDefault();e.stopPropagation();resizeImage(el,.9)};
   const larger=document.createElement('button');larger.type='button';larger.textContent='+';larger.title='បង្កើនទំហំ';larger.setAttribute('aria-label','បង្កើនទំហំរូបភាព');larger.onclick=e=>{e.preventDefault();e.stopPropagation();resizeImage(el,1.1)};
   tools.append(smaller,larger,makeButton('crop','កាត់រូបភាព',openCrop,'','កាត់'),makeButton('move','ផ្លាស់ទីរូបភាព',()=>{moveImg=moveImg===el?null:el;toast(moveImg?'ចុចទីតាំងថ្មីសម្រាប់រូបភាព':'បានបោះបង់ការផ្លាស់ទី');refreshX()},moveImg===el?'on':'','ផ្លាស់ទី'));L.append(tools);
   const handle=makeButton('resize','អូសដើម្បីប្តូរទំហំ',()=>{},'img-resize');handle.style.left=(left+r.width-14)+'px';handle.style.top=(top+r.height-14)+'px';
   handle.onclick=e=>{e.preventDefault();e.stopPropagation()};
   handle.onpointerdown=e=>{
    e.preventDefault();e.stopPropagation();
    const scale=P.getBoundingClientRect().width/P.offsetWidth||1,startX=e.clientX,startW=el.getBoundingClientRect().width/scale,cs=getComputedStyle(P),max=Math.max(24,P.clientWidth-parseFloat(cs.paddingLeft)-parseFloat(cs.paddingRight));
    if(handle.setPointerCapture)handle.setPointerCapture(e.pointerId);
    const move=ev=>{el.style.width=Math.max(24,Math.min(max,startW+(ev.clientX-startX)/scale))+'px';el.style.height='auto'};
    const end=()=>{handle.removeEventListener('pointermove',move);handle.removeEventListener('pointerup',end);handle.removeEventListener('pointercancel',end);dirty()};
    handle.addEventListener('pointermove',move);handle.addEventListener('pointerup',end);handle.addEventListener('pointercancel',end);
   };
   L.append(handle)
  }
  const remove=document.createElement('button');remove.type='button';remove.className='xb';remove.title='លុប';remove.setAttribute('aria-label','លុប');remove.append(icon('close'));remove.style.left=(r.right-s.left-16)+'px';remove.style.top=(r.top-s.top-12)+'px';remove.onpointerdown=e=>e.stopPropagation();
  remove.onclick=e=>{e.preventDefault();e.stopPropagation();el.remove();if(el===activeImg){activeImg=null;moveImg=null}if(!P.textContent.trim()&&!P.querySelector('img,table'))P.innerHTML='<p><br></p>';dirty();toast('បានលុបរួចរាល់')};L.append(remove)
 })
}
P.addEventListener('load',()=>count(),true);
// ---------- AI writing assistant ----------
const openAI=()=>{$('ai').showModal()};
const aiChip=t=>{$('aiq').value=t;$('aiq').focus()};
const aiCopy=async()=>{try{await navigator.clipboard.writeText($('aio').value);toast('បានចម្លង ✓')}catch{$('aio').select()}};
async function aiGo(){const q=$('aiq').value.trim();if(!q)return;const b=$('aigo');b.disabled=true;b.textContent='កំពុងសរសេរចូលក្នុងឯកសារ...';$('aiact').hidden=true;
 const ac=new AbortController(),timer=setTimeout(()=>ac.abort(),30000);
 try{
  const r=await fetch('/api/ai',{method:'POST',headers:{'Content-Type':'application/json'},signal:ac.signal,body:JSON.stringify({prompt:q,context:(P.innerText||'').slice(-1500),title:$('dname').value})}),j=await r.json().catch(()=>({}));
  if(r.status==404)throw new Error('route_missing');
  if(j.error=='not_configured')throw new Error('not_configured');
  if(!r.ok)throw new Error(j.error||'AI request failed');
  const text=typeof j.text=='string'?j.text.trim():'';
  if(!text)throw new Error('AI returned an empty response');
  $('aio').value=text;aiInsert()
 }catch(e){
  const timed=e.name=='AbortError',missingKey=e.message=='not_configured',missingRoute=e.message=='route_missing';
  const title=timed?'AI អស់ពេលឆ្លើយតប':missingKey?'មិនទាន់កំណត់ AI API Key':missingRoute?'រកមិនឃើញ AI API':'មិនអាចប្រើ AI បានទេ';
  const detail=timed?'សូមព្យាយាមម្ដងទៀត។':missingKey?'បន្ថែម AI_API_KEY នៅក្នុង Vercel → Project Settings → Environment Variables ហើយ Deploy ម្តងទៀត។':missingRoute?'កំណត់ Framework Preset ជា Other ហើយ Deploy ម្តងទៀត។ ប្រសិនបើកំពុងសាកល្បង Local សូមប្រើ Flask server។':e.message||'សូមពិនិត្យអ៊ីនធឺណិត និងការកំណត់ AI រួចព្យាយាមម្ដងទៀត។';
  info(title,detail)
 }finally{clearTimeout(timer);b.disabled=false;setIconLabel(b,'sparkle','សរសេរចូលឯកសារ')}
}
function aiStyle(){let n=sel&&P.contains(sel.startContainer)?sel.startContainer:(P.lastElementChild||P);const e=n.nodeType==1?n:n.parentElement,cs=getComputedStyle(e);let bl=e;while(bl&&bl!==P&&bl.parentNode!==P)bl=bl.parentNode;const ok=bl&&bl!==P;return{ff:cs.fontFamily,fs:Math.round(parseFloat(cs.fontSize)*.75*2)/2,al:ok?bl.style.textAlign:'',lh:ok?bl.style.lineHeight:'',mb:ok?bl.style.marginBottom:''}}
function aiNodes(t,st){const f=document.createElement('div');let ul=null;const mk=(x,b)=>{const s=document.createElement('span');s.style.fontFamily=st.ff;s.style.fontSize=st.fs+'pt';if(b)s.style.fontWeight='bold';s.textContent=x.replace(/\*\*/g,'');return s};
 t.split(/\n+/).map(x=>x.trim()).filter(Boolean).forEach(l=>{const li=l.match(/^[-*•]\s+(.*)/);if(li){if(!ul){ul=document.createElement('ul');f.append(ul)}const e=document.createElement('li');e.append(mk(li[1]));ul.append(e);return}ul=null;
  const h=l.match(/^#+\s+(.*)/),p=document.createElement('p');if(st.al)p.style.textAlign=st.al;if(st.lh)p.style.lineHeight=st.lh;if(st.mb)p.style.marginBottom=st.mb;p.append(mk(h?h[1]:l,!!h));f.append(p)});return f}
function aiInsert(){const t=$('aio').value.trim();if(!t)return;const html=aiNodes(t,aiStyle()).innerHTML;$('ai').close();
 if(sel&&P.contains(sel.startContainer)){restore();document.execCommand('insertHTML',false,html)}else{P.insertAdjacentHTML('beforeend',html)}dirty();toast('បានបញ្ចូលក្នុងឯកសារ ✓')}
