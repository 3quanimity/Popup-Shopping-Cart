//DECLARATIONS
let cart = document.querySelector(".cart");
let trigger = document.querySelector(".trigger");
let closeButton = document.querySelector(".close-button");
let addToCart = document.querySelectorAll(".btn-add");
let removeFromCart = Array.from(document.querySelectorAll(".delete-element"));
let cartItems = document.querySelector(".cart-items");
let selected = document.querySelector("#selected-item");
let arr = [];
let total = 0;

//SHOW AND HIDE CART MODAL
function toggleCart() {
  cart.classList.toggle("show-cart");
}

function windowOnClick(event) {
  if (event.target === cart) {
    toggleCart();
  }
}

trigger.addEventListener("click", toggleCart);
closeButton.addEventListener("click", toggleCart);
window.addEventListener("click", windowOnClick);

//ADD TO CART
function pushItemToCart(event) {
  let name = event.target.parentElement.querySelector(".product-title")
      .textContent,
    price = parseInt(
      event.target.parentElement.querySelector(".price").textContent
    ),
    amount = parseInt(
      event.target.parentElement.querySelector(".amount").value
    );

  if (!arr.filter(el => el.name === name).length) {
    arr.push({
      name,
      price,
      amount
    });
    // totalCost();
  } else {
    arr.map(el => {
      if (el.name === name) {
        el.amount = amount;
      }
    });
    // totalCost();
  }
  console.log(arr);

  cartItems.innerHTML = arr.map(
    el => `<div class="cart-row">
  <button class="btn-cart delete-element">بطلت</button>
  <p>${el.amount}</p>
  <p>${el.price}</p>
  <p>${el.name}</p>
  </div>`
  );

  removeFromCart = Array.from(document.querySelectorAll(".delete-element"));

  removeFromCart.map(el =>
    el.addEventListener("click", () => {
      console.log(el);

      arr = arr.filter(
        ele => ele.name !== el.parentElement.lastElementChild.innerHTML
      );
      el.parentElement.remove();
      totalCost(arr);
    })
  );
  totalCost(arr);
}

for (let i = 0; i < addToCart.length; i++) {
  addToCart[i].addEventListener("click", pushItemToCart);
}

function totalCost(arr) {
  let total = 0;
  total = arr.map(el => el.price * el.amount);
  document.querySelector(".cart-total-price").innerHTML = total.length
    ? total.reduce((a, b) => a + b)
    : 0;
}
