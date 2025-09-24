var cart = [];
var cartItems = document.getElementById("cart-items");
var cartTotal = document.getElementById("cart-total");
var buttons = document.getElementsByClassName("add-to-cart");
var checkoutBtn = document.getElementById("checkout-btn");
if (localStorage.getItem("cartData")) {
  cart = JSON.parse(localStorage.getItem("cartData"));
  updateCart();
}
for (var i = 0; i < buttons.length; i++) {
  buttons[i].onclick = function () {
    var card = this.closest(".card");
    var name = card.querySelector(".card-title").textContent;
    var price = parseInt(card.querySelector(".price").textContent);

    cart.push({ name: name, price: price });
    updateCart();
  };
}
function updateCart() {
  cartItems.innerHTML = "";
  var total = 0;

  for (var i = 0; i < cart.length; i++) {
    total += cart[i].price;

    var li = document.createElement("li");
    li.classList.add("list-group-item");
    li.innerHTML =
      cart[i].name +
      ' - <span class="text-danger">' +
      cart[i].price +
      " EGP</span>" +
      ' <button class="delete-btn" onclick="removeFromCart(' +
      i +
      ')">Delete</button>';

    cartItems.appendChild(li);
  }
  cartTotal.textContent = total;
  localStorage.setItem("cartData", JSON.stringify(cart));
}
function removeFromCart(index) {
  cart.splice(index, 1);
  updateCart();
}
checkoutBtn.onclick = function (e) {
  if (cart.length === 0) {
    alert("Cart is empty!");
    return;
  }
  var user = localStorage.getItem("user");
  if (!user) {
    e.preventDefault();
    alert("You must register first");
  } else {
    alert(
      " Checkout complete, welcome " +
        JSON.parse(user).name +
        "\nTotal: " +
        cartTotal.textContent +
        " EGP"
    );
    cart = [];
    updateCart();
    localStorage.removeItem("cartData");
  }
};
