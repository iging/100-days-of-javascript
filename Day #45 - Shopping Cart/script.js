// DOM Elements
const cartContainer = document.getElementById("cart-container");
const productsContainer = document.getElementById("products-container");
const dessertCards = document.getElementById("dessert-card-container");
const cartBtn = document.getElementById("cart-btn");
const clearCartBtn = document.getElementById("clear-cart-btn");
const totalNumberOfItems = document.getElementById("total-items");
const cartSubTotal = document.getElementById("subtotal");
const cartTaxes = document.getElementById("taxes");
const cartTotal = document.getElementById("total");
const showHideCartSpan = document.getElementById("show-hide-cart");
const cartCount = document.getElementById("cart-count");

// State
let isCartShowing = false;
let cartAnimationFrame = null;

const products = [
  {
    id: 1,
    name: "Vanilla Cupcakes (6 Pack)",
    price: 12.99,
    category: "Cupcake",
  },
  {
    id: 2,
    name: "French Macaron",
    price: 3.99,
    category: "Macaron",
  },
  {
    id: 3,
    name: "Pumpkin Cupcake",
    price: 3.99,
    category: "Cupcake",
  },
  {
    id: 4,
    name: "Chocolate Cupcake",
    price: 5.99,
    category: "Cupcake",
  },
  {
    id: 5,
    name: "Chocolate Pretzels (4 Pack)",
    price: 10.99,
    category: "Pretzel",
  },
  {
    id: 6,
    name: "Strawberry Ice Cream",
    price: 2.99,
    category: "Ice Cream",
  },
  {
    id: 7,
    name: "Chocolate Macarons (4 Pack)",
    price: 9.99,
    category: "Macaron",
  },
  {
    id: 8,
    name: "Strawberry Pretzel",
    price: 4.99,
    category: "Pretzel",
  },
  {
    id: 9,
    name: "Butter Pecan Ice Cream",
    price: 2.99,
    category: "Ice Cream",
  },
  {
    id: 10,
    name: "Rocky Road Ice Cream",
    price: 2.99,
    category: "Ice Cream",
  },
  {
    id: 11,
    name: "Vanilla Macarons (5 Pack)",
    price: 11.99,
    category: "Macaron",
  },
  {
    id: 12,
    name: "Lemon Cupcakes (4 Pack)",
    price: 12.99,
    category: "Cupcake",
  },
];

// Render product cards
function renderProducts() {
  dessertCards.innerHTML = products
    .map(
      ({ name, id, price, category }) => `
    <div class="dessert-card" data-id="${id}">
      <h2>${name}</h2>
      <p class="dessert-price">$${price.toFixed(2)}</p>
      <div class="product-footer">
        <p class="product-category ${category.replace(
          /\s+/g,
          ""
        )}">${category}</p>
        <button 
          id="${id}" 
          class="btn add-to-cart-btn"
          aria-label="Add ${name} to cart"
        >
          Add to Cart
        </button>
      </div>
    </div>
  `
    )
    .join("");
}

// Initial render
renderProducts();

class ShoppingCart {
  constructor() {
    this.items = [];
    this.total = 0;
    this.taxRate = 8.25;
  }

  addItem(id, products) {
    const product = products.find((item) => item.id === id);
    if (!product) return;

    this.items.push({ ...product });
    this.updateCart();
    this.animateAddToCart(id);
  }

  updateCart() {
    // Group items by ID and count them
    const itemCounts = this.items.reduce((acc, item) => {
      acc[item.id] = (acc[item.id] || 0) + 1;
      return acc;
    }, {});

    // Update cart items display
    productsContainer.innerHTML = Object.entries(itemCounts)
      .map(([id, count]) => {
        const item = this.items.find((i) => i.id === parseInt(id));
        return `
          <div class="product" data-id="${id}">
            <div class="product-info">
              <span class="product-count">${count}</span>
              <span class="product-name">${item.name}</span>
            </div>
            <span class="product-price">$${(item.price * count).toFixed(
              2
            )}</span>
          </div>
        `;
      })
      .join("");

    // Update cart count badge
    cartCount.textContent = this.items.length;
    cartCount.classList.add("bounce");
    setTimeout(() => cartCount.classList.remove("bounce"), 300);

    // Update totals
    this.calculateTotal();
  }

  animateAddToCart(productId) {
    const productCard = document.querySelector(
      `.dessert-card[data-id="${productId}"]`
    );
    if (!productCard) return;

    const clone = productCard.cloneNode(true);
    const rect = productCard.getBoundingClientRect();
    const cartBtnRect = cartBtn.getBoundingClientRect();

    clone.style.position = "fixed";
    clone.style.top = `${rect.top}px`;
    clone.style.left = `${rect.left}px`;
    clone.style.width = `${rect.width}px`;
    clone.style.height = `${rect.height}px`;
    clone.style.pointerEvents = "none";
    clone.style.opacity = "0.8";
    clone.style.transition = "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)";
    clone.style.zIndex = "1000";
    clone.style.transform = "scale(0.5)";

    document.body.appendChild(clone);

    // Force reflow
    void clone.offsetWidth;

    // Animate to cart
    clone.style.transform = `translate(
      ${
        cartBtnRect.left + cartBtnRect.width / 2 - rect.left - rect.width / 2
      }px,
      ${cartBtnRect.top + cartBtnRect.height / 2 - rect.top - rect.height / 2}px
    ) scale(0.1)`;
    clone.style.opacity = "0";

    // Remove the cloned element after animation
    setTimeout(() => {
      document.body.removeChild(clone);
    }, 500);
  }

  getCounts() {
    return this.items.length;
  }

  clearCart() {
    if (!this.items.length) {
      this.showNotification("Your shopping cart is already empty", "info");
      return;
    }

    // Animate cart clear
    const cartItems = productsContainer.querySelectorAll(".product");
    cartItems.forEach((item, index) => {
      setTimeout(() => {
        item.style.transform = "translateX(100%)";
        item.style.opacity = "0";
      }, index * 50);
    });

    // Clear after animation
    setTimeout(() => {
      this.items = [];
      productsContainer.innerHTML = "";
      this.updateCart();
      this.showNotification("Cart cleared successfully", "success");
    }, 300 + cartItems.length * 50);
  }

  showNotification(message, type = "info") {
    const notification = document.createElement("div");
    notification.className = `notification ${type}`;
    notification.textContent = message;

    document.body.appendChild(notification);

    // Trigger animation
    setTimeout(() => {
      notification.classList.add("show");
    }, 10);

    // Remove after delay
    setTimeout(() => {
      notification.classList.remove("show");
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 3000);
  }

  calculateTaxes(amount) {
    return parseFloat(((this.taxRate / 100) * amount).toFixed(2));
  }

  calculateTotal() {
    const subTotal = this.items.reduce((total, item) => total + item.price, 0);
    const tax = this.calculateTaxes(subTotal);
    this.total = subTotal + tax;

    // Animate number updates
    this.animateNumber(
      cartSubTotal,
      parseFloat(cartSubTotal.textContent.replace(/[^0-9.-]+/g, "") || 0),
      subTotal
    );
    this.animateNumber(
      cartTaxes,
      parseFloat(cartTaxes.textContent.replace(/[^0-9.-]+/g, "") || 0),
      tax
    );
    this.animateNumber(
      cartTotal,
      parseFloat(cartTotal.textContent.replace(/[^0-9.-]+/g, "") || 0),
      this.total
    );

    // Update item count
    totalNumberOfItems.textContent = this.items.length;

    return this.total;
  }

  animateNumber(element, start, end, duration = 500) {
    if (start === end) return;

    const range = end - start;
    const startTime = performance.now();
    const formatValue = (value) => `$${value.toFixed(2)}`;

    const updateNumber = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = this.easeOutCubic(progress);
      const current = start + range * easedProgress;

      element.textContent = formatValue(current);

      if (progress < 1) {
        cartAnimationFrame = requestAnimationFrame(updateNumber);
      } else {
        element.textContent = formatValue(end);
      }
    };

    cancelAnimationFrame(cartAnimationFrame);
    cartAnimationFrame = requestAnimationFrame(updateNumber);
  }

  easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
  }
}

// Initialize shopping cart
const cart = new ShoppingCart();

// Event delegation for add to cart buttons
document.addEventListener("click", (event) => {
  const addToCartBtn = event.target.closest(".add-to-cart-btn");
  if (addToCartBtn) {
    const productId = parseInt(addToCartBtn.id);
    cart.addItem(productId, products);
  }
});

// Toggle cart visibility
cartBtn.addEventListener("click", () => {
  isCartShowing = !isCartShowing;
  cartContainer.style.display = isCartShowing ? "block" : "none";
  showHideCartSpan.textContent = isCartShowing ? "Hide" : "Show";

  // Add animation class
  if (isCartShowing) {
    cartContainer.classList.add("cart-visible");
  } else {
    cartContainer.classList.remove("cart-visible");
  }
});

// Clear cart
clearCartBtn.addEventListener("click", cart.clearCart.bind(cart));

// Close cart when clicking outside
window.addEventListener("click", (event) => {
  if (
    isCartShowing &&
    !cartContainer.contains(event.target) &&
    !cartBtn.contains(event.target)
  ) {
    cartContainer.style.display = "none";
    showHideCartSpan.textContent = "Show";
    isCartShowing = false;
    cartContainer.classList.remove("cart-visible");
  }
});

// Add notification styles
const style = document.createElement("style");
style.textContent = `
  .notification {
    position: fixed;
    bottom: 2rem;
    left: 50%;
    transform: translateX(-50%) translateY(100px);
    background: rgba(0, 0, 0, 0.9);
    color: white;
    padding: 1rem 2rem;
    border-radius: 8px;
    z-index: 1000;
    transition: transform 0.3s ease-out, opacity 0.3s ease;
    opacity: 0;
    pointer-events: none;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
  }
  
  .notification.show {
    transform: translateX(-50%) translateY(0);
    opacity: 1;
  }
  
  .notification.success {
    background: rgba(34, 197, 94, 0.9);
  }
  
  .notification.info {
    background: rgba(59, 130, 246, 0.9);
  }
  
  .cart-count {
    background: #ff3b30;
    color: white;
    border-radius: 9999px;
    width: 24px;
    height: 24px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 0.75rem;
    font-weight: 600;
    margin-left: 0.5rem;
    transition: transform 0.2s ease;
  }
  
  .cart-count.bounce {
    animation: bounce 0.3s ease;
  }
  
  @keyframes bounce {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.2); }
  }
  
  .product {
    opacity: 0;
    transform: translateY(10px);
    transition: opacity 0.3s ease, transform 0.3s ease;
  }
  
  .product-enter {
    opacity: 1;
    transform: translateY(0);
  }
  
  .cart-visible {
    animation: slideIn 0.3s ease-out forwards;
  }
  
  @keyframes slideIn {
    from { transform: translateY(20px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
`;
document.head.appendChild(style);
