// Logika per halaman. Dipilih lewat <body data-page="...">
const pages={};

pages.index=()=>{
  $('kat').innerHTML=Object.entries(CATEGORIES).map(([k,i])=>`<div class="col-6 col-md-2"><a href="marketplace.html?kat=${k}" class="su-card d-block p-3 text-center text-decoration-none text-reset"><i class="bi ${i} fs-2 text-success"></i><div class="fw-semibold">${k}</div></a></div>`).join('');
  const t=Object.values(IMPACT).reduce((a,b)=>a+b,0);
  $('st').innerHTML=[[t+' kg','Bahan termanfaatkan*'],[getMaterials().length,'Bahan ditawarkan'],[new Set(getMaterials().map(m=>m.umkm)).size,'UMKM terhubung']].map(s=>`<div class="col-4"><div class="stat su-card"><b>${s[0]}</b>${s[1]}</div></div>`).join('');
};

pages.dashboard=()=>{
  const all=getMaterials(),tx=getTx();
  $('hi').textContent=`Halo, ${USER.nama} 👋`;
  const mine=all.filter(m=>m.umkm==USER.umkm).length;
  $('sum').innerHTML=[['Bahan ditawarkan',mine,'bi-box-seam'],['Transaksi',tx.length,'bi-arrow-left-right'],['Berhasil dimanfaatkan',tx.filter(t=>t.status=='Selesai').length,'bi-check2-circle']].map(s=>`<div class="col-md-4"><div class="su-card p-3 d-flex align-items-center gap-3"><i class="bi ${s[2]} fs-1 text-success"></i><div><div class="text-muted small">${s[0]}</div><b class="fs-3">${s[1]}</b></div></div></div>`).join('');
  $('act').innerHTML=tx.slice(0,4).map(t=>`<li class="list-group-item d-flex justify-content-between"><span>${esc(t.nama)} <small class="text-muted">· ${esc(t.umkm)}</small></span>${statusBadge(t.status)}</li>`).join('');
  $('rek').innerHTML=all.filter(m=>m.umkm!=USER.umkm).slice(0,4).map(cardHTML).join('');
  const c={};all.forEach(m=>c[m.kategori]=(c[m.kategori]||0)+1);
  new Chart($('chart'),{type:'bar',data:{labels:Object.keys(c),datasets:[{label:'Jumlah bahan per kategori',data:Object.values(c),backgroundColor:'#23845B',borderRadius:8}]}});
};

pages.marketplace=()=>{
  const all=getMaterials();
  $('fk').innerHTML+=Object.keys(CATEGORIES).map(k=>`<option>${k}</option>`).join('');
  $('fl').innerHTML+=[...new Set(all.map(m=>m.lokasi))].sort().map(l=>`<option>${l}</option>`).join('');
  const kat=new URLSearchParams(location.search).get('kat'); if(kat)$('fk').value=kat;
  const draw=()=>{
    const q=$('q').value.toLowerCase();
    let r=all.filter(m=>(m.nama+' '+m.deskripsi+' '+m.umkm).toLowerCase().includes(q)
      &&(!$('fk').value||m.kategori==$('fk').value)&&(!$('fl').value||m.lokasi==$('fl').value)
      &&(!$('fh').value||($('fh').value=='gratis'?m.harga==0:m.harga>0)));
    const s=$('so').value;
    if(s=='murah')r.sort((a,b)=>a.harga-b.harga);else if(s=='mahal')r.sort((a,b)=>b.harga-a.harga);
    else if(s=='nama')r.sort((a,b)=>a.nama.localeCompare(b.nama));else r.sort((a,b)=>b.id-a.id);
    $('cnt').textContent=r.length+' bahan ditemukan';
    $('grid').innerHTML=r.map(cardHTML).join('')||'<p class="text-muted">Tidak ada bahan yang cocok.</p>';
  };
  ['q','fk','fl','fh','so'].forEach(i=>$(i).addEventListener('input',draw));draw();
};

pages.detail=()=>{
  const id=new URLSearchParams(location.search).get('id');
  const m=getMaterials().find(x=>x.id==id);
  if(!m){$('box').innerHTML='<p>Bahan tidak ditemukan. <a href="marketplace.html">Kembali</a></p>';return;}
  const img=m.foto?`<img src="${m.foto}" class="w-100 rounded-4" style="max-height:320px;object-fit:cover">`:`<div class="thumb rounded-4" style="height:260px;font-size:6rem"><i class="bi ${CATEGORIES[m.kategori]||'bi-box'}"></i></div>`;
  $('box').innerHTML=`<div class="col-md-6">${img}</div><div class="col-md-6"><span class="badge-su">${esc(m.kategori)}</span>
  <h2 class="mt-2">${esc(m.nama)}</h2><h4 class="text-success">${rupiah(m.harga)}</h4><p>${esc(m.deskripsi)}</p>
  <ul class="list-unstyled"><li><i class="bi bi-box"></i> Tersedia: <b>${m.jumlah} ${esc(m.satuan)}</b></li><li><i class="bi bi-geo-alt"></i> ${esc(m.lokasi)}</li><li><i class="bi bi-shop"></i> ${esc(m.umkm)}</li></ul>
  <div class="p-3 mb-3 rounded-3" style="background:var(--lg)"><b><i class="bi bi-lightbulb"></i> Potensi pemanfaatan</b><br>${esc(m.potensi||'-')}</div>
  <div class="input-group mb-2"><input id="qty" type="number" min="1" max="${m.jumlah}" value="1" class="form-control"><span class="input-group-text">${esc(m.satuan)}</span></div>
  <button id="ajukan" class="btn btn-su w-100 py-2">Ajukan Transaksi</button><small class="text-muted">Simulasi — tanpa pembayaran sungguhan.</small></div>`;
  $('ajukan').onclick=()=>{
    const n=Number($('qty').value);
    if(!n||n<1||n>m.jumlah)return alert('Jumlah harus antara 1 dan '+m.jumlah);
    saveTx({id:'T-'+Date.now(),nama:m.nama,umkm:m.umkm,tanggal:new Date().toISOString().slice(0,10),jumlah:n+' '+m.satuan,harga:m.harga,status:'Menunggu konfirmasi'});
    location.href='transaksi.html';
  };
};

pages['tambah-bahan']=()=>{
  $('kategori').innerHTML=Object.keys(CATEGORIES).map(k=>`<option>${k}</option>`).join('');
  let foto='';
  $('foto').onchange=e=>{const f=e.target.files[0];if(!f)return;
    if(f.size>300*1024){alert('Ukuran foto maksimal 300 KB (batas LocalStorage).');e.target.value='';return;}
    const r=new FileReader();r.onload=()=>foto=r.result;r.readAsDataURL(f);};
  $('form').onsubmit=e=>{
    e.preventDefault();
    const v=id=>$(id).value.trim(),err=[];
    if(v('nama').length<3)err.push('Nama bahan minimal 3 karakter');
    if(!(Number(v('jumlah'))>0))err.push('Jumlah harus lebih dari 0');
    if(Number(v('harga'))<0||v('harga')==='')err.push('Harga wajib diisi (0 = gratis)');
    if(!v('lokasi'))err.push('Lokasi wajib diisi');
    if(v('deskripsi').length<10)err.push('Deskripsi minimal 10 karakter');
    if(err.length){$('err').innerHTML=err.map(x=>`<div>• ${x}</div>`).join('');$('err').classList.remove('d-none');return;}
    saveMaterial({id:Date.now(),nama:v('nama'),kategori:v('kategori'),deskripsi:v('deskripsi'),jumlah:Number(v('jumlah')),satuan:v('satuan'),harga:Number(v('harga')),lokasi:v('lokasi'),umkm:USER.umkm,potensi:'Belum diisi',foto});
    location.href='marketplace.html';
  };
};

pages.rekomendasi=()=>{
  $('need').innerHTML='<option value="">Semua kategori</option>'+Object.keys(CATEGORIES).map(k=>`<option>${k}</option>`).join('');
  const draw=()=>{
    const cat=$('need').value,kw=$('kw').value.toLowerCase().trim();
    // Logika sederhana: kategori cocok +2, kata kunci cocok +1. TODO: ganti dengan model rekomendasi sungguhan.
    const r=getMaterials().filter(m=>m.umkm!=USER.umkm).map(m=>{
      let s=0,why=[];
      if(cat&&m.kategori==cat){s+=2;why.push(`kategori ${cat} sesuai kebutuhanmu`);}
      if(kw&&(m.nama+m.deskripsi+m.potensi).toLowerCase().includes(kw)){s+=1;why.push(`mengandung kata kunci "${kw}"`);}
      return{m,s,why:why.join(' dan ')||'bahan populer di platform'};
    }).filter(x=>(!cat&&!kw)||x.s>0).sort((a,b)=>b.s-a.s).slice(0,6);
    $('out').innerHTML=r.map(x=>`<div class="col-md-6"><div class="su-card p-3 h-100"><h6>${esc(x.m.nama)} <span class="badge-su">${esc(x.m.kategori)}</span></h6>
    <small class="text-muted">${esc(x.m.umkm)} · ${esc(x.m.lokasi)}</small><p class="mb-2 mt-2"><i class="bi bi-lightbulb text-success"></i> Direkomendasikan karena ${x.why}.</p>
    <a class="btn btn-sm btn-su" href="detail.html?id=${x.m.id}">Lihat Detail</a></div></div>`).join('')||'<p class="text-muted">Belum ada yang cocok.</p>';
  };
  ['need','kw'].forEach(i=>$(i).addEventListener('input',draw));draw();
};

pages.transaksi=()=>{
  $('tb').innerHTML=getTx().map(t=>`<tr><td>${esc(t.nama)}</td><td>${esc(t.umkm)}</td><td>${t.tanggal}</td><td>${esc(t.jumlah)}</td><td>${rupiah(t.harga)}</td><td>${statusBadge(t.status)}</td></tr>`).join('');
};

pages.dampak=()=>{
  const tot=Object.values(IMPACT).reduce((a,b)=>a+b,0);
  $('kpi').innerHTML=[[tot+' kg','Bahan dimanfaatkan'],[getTx().length,'Transaksi pemanfaatan'],[new Set(getMaterials().map(m=>m.umkm)).size,'UMKM terhubung']].map(s=>`<div class="col-md-4"><div class="stat su-card"><b>${s[0]}</b>${s[1]}</div></div>`).join('');
  new Chart($('chart'),{type:'doughnut',data:{labels:Object.keys(IMPACT),datasets:[{data:Object.values(IMPACT),backgroundColor:['#164E3B','#23845B','#4fb585','#8fd4b0','#c3e8d3','#718078']}]}});
};

document.addEventListener('DOMContentLoaded',()=>{
  renderLayout();
  const p=document.body.dataset.page;
  if(pages[p])pages[p]();
});
