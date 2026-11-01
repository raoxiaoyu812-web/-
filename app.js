const menu = document.querySelector('.menu');
const navigation = document.querySelector('#navigation');
menu.addEventListener('click', () => {
 const open = menu.getAttribute('aria-expanded') !== 'true';
 menu.setAttribute('aria-expanded', String(open)); navigation.classList.toggle('open', open);
});
navigation.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {menu.setAttribute('aria-expanded','false'); navigation.classList.remove('open');}));
const dialog = document.querySelector('#detail-dialog');
const content = document.querySelector('#dialog-content');
const services = {
 materials: {title:'建筑材料检测',description:'从基础材料的性能出发，为工程选材与质量控制提供检测依据。具体项目及承检范围请联系咨询。',tags:['钢材','水泥','混凝土','粗、细骨料','砂浆','砌材','防水材料','外加剂','涂料','给排水材料']},
 structure:{title:'建筑工程检测',description:'围绕工程建设与结构质量，结合专业实验室和技术团队，开展相关检测服务。具体项目及承检范围请联系咨询。',tags:['地基基础','钢结构检测','非破损结构检测','建筑节能','外墙窗','土工程试验','建筑材料力学性能']},
 energy:{title:'水利与电力工程检测',description:'面向水利、电力等工程建设需求，提供相关工程质量与材料检测服务。具体业务范围以对应资质及许可为准。',tags:['水利工程质量检测','水利工程材料','电力工程','电气检测','工程材料性能']}
};
function openDialog(){dialog.showModal(); document.body.style.overflow='hidden';}
function closeDialog(){dialog.close();}
document.querySelector('.dialog-close').addEventListener('click', closeDialog);
dialog.addEventListener('close',()=>{document.body.style.overflow='';content.replaceChildren();});
dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)closeDialog();}});
document.querySelectorAll('[data-service]').forEach(button=>button.addEventListener('click',()=>{
 const s=services[button.dataset.service];
 content.innerHTML=`<h2 class="dialog-title">${s.title}</h2><p class="dialog-description">${s.description}</p><div class="dialog-tags">${s.tags.map(t=>`<span>${t}</span>`).join('')}</div><a class="dialog-call" href="tel:15547203333">咨询魏先生 · 15547203333 ↗</a>`;openDialog();
}));
document.querySelectorAll('[data-cert]').forEach(button=>button.addEventListener('click',()=>{
 const h=document.createElement('h2');h.className='dialog-title';h.textContent=button.dataset.title;
 const img=document.createElement('img');img.className='dialog-image';img.src=`assets/${button.dataset.cert}.jpg`;img.alt=button.dataset.title;content.replaceChildren(h,img);openDialog();
}));
let toastTimer;
function toast(text){const el=document.querySelector('.toast');el.textContent=text;el.classList.add('visible');clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.classList.remove('visible'),3500);}
document.querySelector('.copy-phone').addEventListener('click',async()=>{try{await navigator.clipboard.writeText('15547203333');toast('电话号码已复制');}catch{toast('请长按或选中号码复制：15547203333');}});
document.querySelector('#year').textContent=new Date().getFullYear();

document.querySelector('.report-search').addEventListener('submit', event => {
 event.preventDefault();
 const field=document.querySelector('#report-number');
 if(!field.value.trim()){field.setCustomValidity('请输入报告编号');field.reportValidity();return;}
 field.setCustomValidity('');
 document.querySelector('.report-status').textContent='报告进度查询系统尚未接入。如需查询，请联系魏先生：15547203333。';
});
document.querySelector('#report-number').addEventListener('input',event=>{event.target.setCustomValidity('');document.querySelector('.report-status').textContent='';});
