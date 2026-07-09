const file=document.getElementById("file");
const pick=document.getElementById("pick");
const img=document.getElementById("img");
const ph=document.getElementById("ph");
pick.onclick=()=>file.click();
file.onchange=e=>{
 const f=e.target.files[0];
 if(!f)return;
 const r=new FileReader();
 r.onload=ev=>{
   img.src=ev.target.result;
   img.style.display='block';
   ph.style.display='none';
 };
 r.readAsDataURL(f);
};
