const GTC_SUPABASE_URL='https://ojxarsfaewehwjidwgac.supabase.co';
const GTC_SUPABASE_KEY='sb_publishable_ZoAZrV5rDmYDLxhXlnEXCw_lPqJfin0';
const gtcDb=window.supabase.createClient(GTC_SUPABASE_URL,GTC_SUPABASE_KEY);
const form=document.getElementById('applyForm'),statusEl=document.getElementById('formStatus'),submitBtn=document.getElementById('submitBtn'),courseSelect=document.getElementById('courseSelect');
const requested=new URLSearchParams(location.search).get('course');if(requested&&[...courseSelect.options].some(o=>o.value===requested))courseSelect.value=requested;
function setStatus(message,color=''){statusEl.textContent=message;statusEl.style.color=color}
form.addEventListener('submit',async event=>{event.preventDefault();submitBtn.disabled=true;setStatus('신청서를 접수하고 있습니다...','#efc45f');const fd=new FormData(form);
 const payload={course_code:String(fd.get('course_code')||''),name:String(fd.get('name')||'').trim(),phone:String(fd.get('phone')||'').trim(),email:String(fd.get('email')||'').trim(),region:String(fd.get('region')||'').trim(),applicant_type:String(fd.get('applicant_type')||''),organization:String(fd.get('organization')||'').trim()||null,experience:String(fd.get('experience')||'').trim()||null,message:String(fd.get('message')||'').trim()||null,status:'new',source:'gtc-web'};
 const {error}=await gtcDb.from('gtc_course_applications').insert(payload);if(error){setStatus('현재 온라인 접수 연결을 준비 중입니다. 본부에 문의해 주세요. ('+error.message+')','#ff9e9e');submitBtn.disabled=false;return}
 form.reset();setStatus('사전등록 신청이 정상적으로 접수되었습니다. 본부 확인 후 안내드리겠습니다.','#78dfa5');submitBtn.disabled=false;window.scrollTo({top:0,behavior:'smooth'});
});
