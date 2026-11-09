// Fungsi umum: penyimpanan, format, layout bersama
const $ = id => document.getElementById(id);
const KEY_M='su_materials', KEY_T='su_transactions';
const load=(k,d)=>{try{return JSON.parse(localStorage.getItem(k))||d}catch(e){return d}};
const getMaterials=()=>[...SEED_MATERIALS,...load(KEY_M,[])];
const getTx=()=>[...load(KEY_T,[]),...SEED_TX];
function saveMaterial(m){const l=load(KEY_M,[]);l.push(m);localStorage.setItem(KEY_M,JSON.stringify(l));}
function saveTx(t){const l=load(KEY_T,[]);l.unshift(t);localStorage.setItem(KEY_T,JSON.stringify(l));}
const rupiah=n=>n>0?'Rp '+Number(n).toLocaleString('id-ID'):'GRATIS';
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

const NAV=[['index.html','Beranda'],['dashboard.html','Dashboard'],['marketplace.html','Marketplace'],['rekomendasi.html','Rekomendasi'],['transaksi.html','Transaksi'],['dampak.html','Dampak']];
function renderLayout(){
  const cur=location.pathname.split('/').pop()||'index.html';
  $('nav').innerHTML=`<nav class="navbar navbar-expand-lg navbar-su sticky-top"><div class="container">
  <a class="navbar-brand brand" href="index.html"><i class="bi bi-recycle"></i> SAMBUNG<span>USAHA</span></a>
  <button class="navbar-toggler bg-light" data-bs-toggle="collapse" data-bs-target="#menu"><span class="navbar-toggler-icon"></span></button>
  <div class="collapse navbar-collapse" id="menu"><div class="navbar-nav ms-auto py-2">
  ${NAV.map(n=>`<a class="nav-link ${n[0]==cur?'active':''}" href="${n[0]}">${n[1]}</a>`).join('')}
  <a class="btn btn-light btn-sm ms-lg-2 mt-2 mt-lg-0" href="tambah-bahan.html"><i class="bi bi-plus-circle"></i> Tambah Bahan</a></div></div></div></nav>`;
  $('foot').innerHTML=`<footer><div class="container text-center"><b class="text-white">SAMBUNGUSAHA</b><br>Sisa Bahanmu, Peluang Usaha Mereka.<br><small>Prototype INDONERIS 2026 — data bersifat simulasi.</small></div></footer>`;
  const rm=$('roadmap');
  if(rm) rm.innerHTML=[['bi-chat-dots','Chat Antar-UMKM'],['bi-credit-card','Pembayaran Digital'],['bi-patch-check','Verifikasi UMKM'],['bi-bell','Notifikasi Real-time'],['bi-geo-alt','Peta & Lokasi'],['bi-shield-lock','Login & Admin']]
   .map(r=>`<div class="col-6 col-md-4"><div class="su-card soon p-3 text-center"><i class="bi ${r[0]} fs-3 text-success"></i><div class="fw-semibold">${r[1]}</div><span class="badge-su">Segera hadir</span></div></div>`).join('');
}
function cardHTML(m){
  const img=m.foto?`<img src="${m.foto}" class="card-img" alt="${esc(m.nama)}">`:`<div class="thumb"><i class="bi ${CATEGORIES[m.kategori]||'bi-box'}"></i></div>`;
  return `<div class="col-sm-6 col-xl-3"><div class="su-card h-100">${img}<div class="p-3"><span class="badge-su">${esc(m.kategori)}</span>
  <h6 class="mt-2 mb-1">${esc(m.nama)}</h6><small class="text-muted d-block">${m.jumlah} ${esc(m.satuan)} · <i class="bi bi-geo-alt"></i> ${esc(m.lokasi)}</small>
  <small class="text-muted d-block mb-2">${esc(m.umkm)}</small><div class="d-flex justify-content-between align-items-center">
  <b class="text-success">${rupiah(m.harga)}</b><a href="detail.html?id=${m.id}" class="btn btn-sm btn-su">Lihat Detail</a></div></div></div></div>`;
}
const statusBadge=s=>`<span class="badge ${s=='Selesai'?'bg-success':s=='Diproses'?'bg-primary':'bg-warning text-dark'}">${s}</span>`;
