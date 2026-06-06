document.addEventListener('DOMContentLoaded', function(){
  const container = document.getElementById('products');
  const products = window.PRODUCTS || [];
  if(!container) return;
  container.innerHTML = products.map(p=>`
    <article class="card">
      <a href="product.html?sku=${encodeURIComponent(p.sku)}" class="card-link">
        <img src="${(p.images&&p.images[0])?p.images[0]:'images/placeholder.svg'}" alt="${p.title}" onerror="this.src='images/placeholder.svg'">
        <h3>${p.title}</h3>
        <p class="price">${p.currency} ${p.price}</p>
      </a>
    </article>
  `).join('');
});
