// Sidebar Cart & Buy Now with localStorage/cookie persistence
// Assumes sidebar cart and payment.html are implemented as per new requirements

// Utility: Get/Set cart in localStorage/cookie
function getCart() {
  let cart = [];
  try {
    cart = JSON.parse(localStorage.getItem('cart') || '[]');
  } catch (e) {
    cart = [];
  }
  return cart;
}
function setCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
  document.cookie = 'cart=' + encodeURIComponent(JSON.stringify(cart)) + '; path=/';
}

// Render sidebar cart
function renderSidebarCart() {
  const sidebarCart = document.getElementById('sidebar-cart-items');
  const sidebarTotal = document.getElementById('sidebar-cart-total');
  const cart = getCart();
  if (!sidebarCart || !sidebarTotal) return;
  sidebarCart.innerHTML = '';
  let total = 0;
  cart.forEach((item, idx) => {
    total += item.price;
    const li = document.createElement('li');
    li.className = 'flex justify-between items-center py-1 border-b';
    li.innerHTML = `${item.name} - <span class='rupee'>₹</span>${item.price.toFixed(2)} <button class="btn btn-xs btn-outline" data-remove="${idx}">Remove</button>`;
    sidebarCart.appendChild(li);
  });
  sidebarTotal.innerText = total.toFixed(2);
}

// Remove item from sidebar cart
function setupSidebarRemove() {
  const sidebarCart = document.getElementById('sidebar-cart-items');
  if (!sidebarCart) return;
  sidebarCart.addEventListener('click', function(e) {
    if (e.target && e.target.matches('button[data-remove]')) {
      const idx = parseInt(e.target.getAttribute('data-remove'));
      let cart = getCart();
      cart.splice(idx, 1);
      setCart(cart);
      renderSidebarCart();
    }
  });
}

// Add to Cart buttons
function setupAddToCart() {
  document.querySelectorAll('.add-to-cart').forEach(btn => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.card-body');
      const name = card.querySelector('.card-title').innerText;
      const price = parseFloat(card.querySelector('p').innerText.replace(/[^\d.]/g, ''));
      let cart = getCart();
      cart.push({ name, price });
      setCart(cart);
      renderSidebarCart();
    });
  });
}

// Buy Now buttons
function setupBuyNow() {
  document.querySelectorAll('.buy-now').forEach(btn => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.card-body');
      const name = card.querySelector('.card-title').innerText;
      const price = parseFloat(card.querySelector('p').innerText.replace(/[^\d.]/g, ''));
      // Redirect to payment.html with product info in URL
      window.location.href = `payment.html?product=${encodeURIComponent(name)}&price=${encodeURIComponent(price)}`;
    });
  });
}

// Sidebar cart open/close
function setupSidebarCartToggle() {
  const openBtn = document.getElementById('open-sidebar-cart');
  const closeBtn = document.getElementById('close-sidebar-cart');
  const sidebar = document.getElementById('sidebar-cart');
  if (openBtn && sidebar) {
    openBtn.addEventListener('click', () => sidebar.classList.add('open'));
  }
  if (closeBtn && sidebar) {
    closeBtn.addEventListener('click', () => sidebar.classList.remove('open'));
  }
}

// Hamburger Menu Logic
const hamburgerBtn = document.getElementById("hamburger-btn");
const mobileMenu = document.getElementById("mobile-menu");
const closeMobileMenu = document.getElementById("close-mobile-menu");

document.querySelectorAll("#mobile-menu a").forEach(link => {
  link.addEventListener("click", () => {
    mobileMenu.classList.add("-translate-x-full");
  });
});

// Debugging logs for Hamburger Menu
console.log("Hamburger menu script loaded.");

hamburgerBtn.addEventListener("click", () => {
  console.log("Hamburger button clicked.");
  mobileMenu.classList.remove("-translate-x-full");
});

closeMobileMenu.addEventListener("click", () => {
  console.log("Close button clicked.");
  mobileMenu.classList.add("-translate-x-full");
});

// Enhance Hamburger Menu Links
const menuLinks = document.querySelectorAll("#mobile-menu a");

menuLinks.forEach(link => {
  link.addEventListener("click", event => {
    console.log(`Menu link clicked: ${link.getAttribute("href")}`);
    event.preventDefault(); // Prevent default anchor behavior
    const targetId = link.getAttribute("href").substring(1); // Get the target section ID
    const targetSection = document.getElementById(targetId);

    if (targetSection) {
      targetSection.scrollIntoView({ behavior: "smooth" }); // Smooth scroll to the section
    }

    mobileMenu.classList.add("-translate-x-full"); // Close the menu
  });
});

// On page load
window.addEventListener('DOMContentLoaded', () => {
  renderSidebarCart();
  setupSidebarRemove();
  setupAddToCart();
  setupBuyNow();
  setupSidebarCartToggle();
});
