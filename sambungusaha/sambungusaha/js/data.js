// DATA DUMMY — ganti/tambah di sini. TODO: ganti dengan API backend + database.
const CATEGORIES = { Organik:'bi-cup-hot', Kertas:'bi-box-seam', Tekstil:'bi-scissors', Kayu:'bi-tree', Plastik:'bi-recycle', Logam:'bi-gear' };
const USER = { nama:'Bu Sari', umkm:'Dapur Sari' }; // TODO: ganti dengan autentikasi sungguhan
const SEED_MATERIALS = [
 {id:1,nama:'Ampas Kopi',kategori:'Organik',jumlah:25,satuan:'kg',harga:0,lokasi:'Jakarta',umkm:'Kopi Senja',deskripsi:'Ampas kopi sisa seduhan harian, kering dan bersih.',potensi:'Pupuk kompos, scrub kecantikan, media jamur'},
 {id:2,nama:'Kardus Bekas Kemasan',kategori:'Kertas',jumlah:80,satuan:'lembar',harga:15000,lokasi:'Bandung',umkm:'Toko Maju Jaya',deskripsi:'Kardus tebal bekas pengiriman barang, kondisi baik.',potensi:'Kerajinan, kemasan, organizer'},
 {id:3,nama:'Perca Kain Katun',kategori:'Tekstil',jumlah:15,satuan:'kg',harga:30000,lokasi:'Bandung',umkm:'Konveksi Rasa',deskripsi:'Potongan kain katun berbagai warna sisa produksi kaos.',potensi:'Tas, aksesori, boneka, patchwork'},
 {id:4,nama:'Potongan Kayu Jati',kategori:'Kayu',jumlah:40,satuan:'kg',harga:25000,lokasi:'Semarang',umkm:'Mebel Karya',deskripsi:'Sisa potongan kayu jati ukuran kecil dan sedang.',potensi:'Kerajinan, talenan, hiasan'},
 {id:5,nama:'Ampas Tahu',kategori:'Organik',jumlah:50,satuan:'kg',harga:0,lokasi:'Yogyakarta',umkm:'Tahu Bu Lastri',deskripsi:'Ampas tahu segar setiap pagi.',potensi:'Pakan ternak, tempe gembus, kompos'},
 {id:6,nama:'Botol Plastik PET',kategori:'Plastik',jumlah:200,satuan:'pcs',harga:20000,lokasi:'Jakarta',umkm:'Warung Es Segar',deskripsi:'Botol PET bekas minuman, sudah dicuci.',potensi:'Pot tanaman, kerajinan, daur ulang'},
 {id:7,nama:'Serbuk Gergaji',kategori:'Kayu',jumlah:60,satuan:'kg',harga:0,lokasi:'Semarang',umkm:'Mebel Karya',deskripsi:'Serbuk gergaji kering dari produksi mebel.',potensi:'Media jamur, briket, alas kandang'},
 {id:8,nama:'Kaleng Aluminium Bekas',kategori:'Logam',jumlah:120,satuan:'pcs',harga:18000,lokasi:'Yogyakarta',umkm:'Kedai Soda',deskripsi:'Kaleng minuman aluminium bersih.',potensi:'Kerajinan logam, lampu hias'},
 {id:9,nama:'Kulit Telur',kategori:'Organik',jumlah:10,satuan:'kg',harga:0,lokasi:'Jakarta',umkm:'Dapur Sari',deskripsi:'Cangkang telur sisa produksi kue.',potensi:'Pupuk kalsium, pakan unggas'}
];
const SEED_TX = [
 {id:'T-001',nama:'Perca Kain Katun',umkm:'Konveksi Rasa',tanggal:'2026-10-28',jumlah:'5 kg',harga:10000,status:'Selesai'},
 {id:'T-002',nama:'Ampas Kopi',umkm:'Kopi Senja',tanggal:'2026-11-02',jumlah:'10 kg',harga:0,status:'Diproses'},
 {id:'T-003',nama:'Kardus Bekas Kemasan',umkm:'Toko Maju Jaya',tanggal:'2026-11-06',jumlah:'30 lembar',harga:15000,status:'Menunggu konfirmasi'}
];
// DATA SIMULASI untuk Impact Dashboard (bukan data nyata)
const IMPACT = { Organik:120, Kertas:60, Tekstil:35, Kayu:48, Plastik:22, Logam:15 };
