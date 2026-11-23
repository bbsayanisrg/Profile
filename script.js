// Scroll and UI interactions for Blibli Store Ahmad Yani Serang
const toTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  if (toTop) toTop.classList.toggle('visible', window.scrollY > 300);
});
if (toTop) toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

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

document.querySelectorAll('.wish').forEach((button) => {
  button.addEventListener('click', () => {
    button.classList.toggle('active');
    const icon = button.querySelector('i');
    icon.className = button.classList.contains('active') ? 'bi bi-heart-fill' : 'bi bi-heart';
  });
});

const searchInput = document.getElementById('searchInput');
if (searchInput) {
  searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase().trim();
    document.querySelectorAll('.product-card').forEach((card) => {
      card.style.display = card.dataset.name.includes(query) ? '' : 'none';
    });
  });
}

// Preserve existing scroll-to-top behavior compatibility
const mybutton = document.getElementById('myBtn');
if (mybutton) mybutton.style.display = 'none';
