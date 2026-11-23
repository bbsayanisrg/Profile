// Interaksi untuk Blibli Store Ahmad Yani Serang

// GANTI nomor WhatsApp toko (format internasional, tanpa + atau spasi). Contoh: 6281234567890
const STORE_WA = '62XXXXXXXXXX';

// Tombol kembali ke atas
const toTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  if (toTop) toTop.classList.toggle('visible', window.scrollY > 300);
});
if (toTop) toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// Keranjang (hitungan sederhana)
let cartCount = 0;
document.querySelectorAll('.add-cart').forEach((button) => {
  button.addEventListener('click', () => {
    cartCount += 1;
    const count = document.getElementById('cartCount');
    if (count) count.textContent = cartCount;
    button.classList.add('added');
    button.innerHTML = '<i class="bi bi-check2"></i> Ditambahkan';
  });
});

// Wishlist
document.querySelectorAll('.wish').forEach((button) => {
  button.addEventListener('click', () => {
    button.classList.toggle('active');
    const icon = button.querySelector('i');
    icon.className = button.classList.contains('active') ? 'bi bi-heart-fill' : 'bi bi-heart';
  });
});

// Pencarian + filter merek
const searchInput = document.getElementById('searchInput');
const cards = document.querySelectorAll('.product-card');
const emptyNote = document.getElementById('emptyNote');
let activeBrand = new URLSearchParams(location.search).get('brand') || 'all';

function applyFilter() {
  if (!cards.length) return;
  const query = searchInput ? searchInput.value.toLowerCase().trim() : '';
  let shown = 0;
  cards.forEach((card) => {
    const okBrand = activeBrand === 'all' || card.dataset.brand === activeBrand;
    const okQuery = card.dataset.name.includes(query);
    const show = okBrand && okQuery;
    card.style.display = show ? '' : 'none';
    if (show) shown += 1;
  });
  // Kartu unggulan hanya melebar penuh saat semua merek ditampilkan tanpa pencarian
  document.querySelectorAll('.product-card.featured').forEach((c) => {
    c.classList.toggle('compact', activeBrand !== 'all' || query !== '');
  });
  if (emptyNote) emptyNote.style.display = shown ? 'none' : 'block';
}

if (searchInput) searchInput.addEventListener('input', applyFilter);

const chips = document.querySelectorAll('#brandChips .chip');
chips.forEach((chip) => {
  chip.classList.toggle('active', chip.dataset.filter === activeBrand);
  chip.addEventListener('click', () => {
    activeBrand = chip.dataset.filter;
    chips.forEach((c) => c.classList.toggle('active', c === chip));
    applyFilter();
  });
});
applyFilter();

// Tautan WhatsApp
function waLink(text) {
  return 'https://wa.me/' + STORE_WA + '?text=' + encodeURIComponent(text);
}
document.querySelectorAll('[data-wa]').forEach((a) => {
  a.href = waLink(a.dataset.wa);
  a.target = '_blank';
  a.rel = 'noopener';
});

// Formulir kontak -> WhatsApp
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('cName').value.trim();
    const subject = document.getElementById('cSubject').value.trim();
    const message = document.getElementById('cMessage').value.trim();
    const text = 'Halo Blibli Store Ahmad Yani Serang, saya ' + name +
      (subject ? '. Produk: ' + subject : '') + '.\n' + message;
    window.open(waLink(text), '_blank', 'noopener');
  });
}
