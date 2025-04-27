fetch("./shop.json")
  .then(res => res.json())
  .then(data => {
    let container = document.querySelector(".container");
    let row = document.createElement("div");
    row.classList.add("row", "mt-4");

    let datas = data.list;
    for (let i = 0; i < datas.length; i++) {
      let card = document.createElement("div");
      card.classList.add("shop", "col-lg-3", "col-md-6", "col-sm-12", "mb-4");

      card.innerHTML = `
        <div class="card h-100 shadow-sm">
          <img src="${datas[i].img}" class="card-img-top" alt="${datas[i].name}" >
          <div class="card-body d-flex flex-column">
            <h5 class="card-title text-center">${datas[i].name}</h5>
            <h6 class="text-primary my-3" > price: ${datas[i].price}</h6>
            <p class="card-text text-muted small">${datas[i].description}</p>
            <button onclick="add(event)" class="btn btn-primary mt-auto">Add to Cart</button>
          </div>
        </div>
      `;

      row.appendChild(card);
    }

    container.appendChild(row);
  })
  .catch(err => console.error("Error Fetching JSON:", err));


function add(event) {
  const card = event.target.closest('.card');
  const name = card.querySelector('.card-title').innerText;
  const price = card.querySelector('.card-text').innerText;
  const img = card.querySelector('img').src;

  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push({ name, price, img });
  localStorage.setItem("cart", JSON.stringify(cart));

  alert(`${name} added to cart!`);
}

function showCart() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  console.log("Cart Items:", cart);
  alert("Check the console to see cart items!");
}