// Cart and Buy Now functionality
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
let cart = [];

// Add to Cart
if (document.querySelectorAll(".add-to-cart").length) {
  document.querySelectorAll(".add-to-cart").forEach((btn) => {
    btn.addEventListener("click", () => {
      const name = btn.closest(".card-body").querySelector(".card-title").innerText;
      const price = parseFloat(btn.closest(".card-body").querySelector("p").innerText.replace(/[^\d.]/g, ""));
      cart.push({ name, price });
      updateCart();
    });
  });
}

// Buy Now
if (document.querySelectorAll(".buy-now").length) {
  document.querySelectorAll(".buy-now").forEach((btn) => {
    btn.addEventListener("click", () => {
      const name = btn.closest(".card-body").querySelector(".card-title").innerText;
      const price = parseFloat(btn.closest(".card-body").querySelector("p").innerText.replace(/[^\d.]/g, ""));
      cart = [{ name, price }];
      updateCart();
      setTimeout(() => {
        alert(`Thank you for buying the ${name}!`);
      }, 300);
    });
  });
}

function updateCart() {
  if (!cartItems || !cartTotal) return;
  cartItems.innerHTML = "";
  let total = 0;
  cart.forEach((item, index) => {
    total += item.price;
    const li = document.createElement("li");
    li.className = "flex justify-between items-center py-1 border-b";
    li.innerHTML = `${item.name} - <span class='rupee'>₹</span>${item.price.toFixed(2)} <button onclick=\"removeItem(${index})\" class=\"btn btn-xs btn-outline\">Remove</button>`;
    cartItems.appendChild(li);
  });
  cartTotal.innerText = total.toFixed(2);
}

window.removeItem = function(index) {
  cart.splice(index, 1);
  updateCart();
};

window.clearCart = function() {
  cart = [];
  updateCart();
};

// Payment Modal Logic
const checkoutBtn = document.getElementById('checkout-btn');
const paymentModal = document.getElementById('payment-modal');
const closeModal = document.getElementById('close-modal');
const paymentForm = document.getElementById('payment-form');
const paymentMethod = document.getElementById('payment-method');
const cardFields = document.getElementById('card-fields');
const upiFields = document.getElementById('upi-fields');
const paymentSuccess = document.getElementById('payment-success');
const closeSuccess = document.getElementById('close-success');

// Only allow checkout if cart is not empty
if (checkoutBtn) {
  checkoutBtn.addEventListener("click", (e) => {
    if (!cart || cart.length === 0) {
      e.preventDefault();
      checkoutBtn.classList.add("animate__animated", "animate__shakeX", "btn-error");
      checkoutBtn.innerText = "Add items to cart!";
      setTimeout(() => {
        checkoutBtn.classList.remove("animate__animated", "animate__shakeX", "btn-error");
        checkoutBtn.innerText = "Checkout";
      }, 1200);
      return false;
    }
    // else, allow redirect (handled in index.html)
  });
}

if (closeModal) {
  closeModal.addEventListener('click', () => {
    paymentModal.classList.add('hidden');
  });
}
if (paymentMethod) {
  paymentMethod.addEventListener('change', (e) => {
    document.querySelectorAll('.payment-fields').forEach(f => f.classList.add('hidden'));
    if (e.target.value === 'card') {
      cardFields.classList.remove('hidden');
    } else if (e.target.value === 'upi') {
      upiFields.classList.remove('hidden');
    }
  });
}
if (paymentForm) {
  paymentForm.addEventListener('submit', (e) => {
    e.preventDefault();
    paymentModal.classList.add('hidden');
    setTimeout(() => {
      paymentSuccess.classList.remove('hidden');
      paymentSuccess.classList.add('animate__fadeInUp');
      cart = [];
      updateCart();
    }, 700);
  });
}
if (closeSuccess) {
  closeSuccess.addEventListener('click', () => {
    paymentSuccess.classList.add('hidden');
    paymentSuccess.classList.remove('animate__fadeInUp');
  });
}

// Advanced smooth fade, slide, and highlight transition for section navigation
if (document.querySelectorAll('.menu a').length) {
  document.querySelectorAll('.menu a').forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href.startsWith('#')) {
        e.preventDefault();
        const section = document.querySelector(href);
        if (section) {
          document.querySelectorAll('section, footer').forEach(sec => {
            sec.classList.remove('active-section');
          });
          section.classList.add('fading');
          setTimeout(() => {
            section.scrollIntoView({ behavior: 'smooth', block: 'start' });
            section.classList.remove('fading');
            section.classList.add('active-section');
            setTimeout(() => {
              section.classList.remove('active-section');
            }, 1200);
          }, 400);
        }
      }
    });
  });
}
