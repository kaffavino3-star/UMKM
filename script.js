
const nomorWA = "6285894731982";

const products = [
  {
    name: "Risol Mayo Original",
    price: 3000,
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950"
  },
  {
    name: "Risol Mayo Beef",
    price: 4000,
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950"
  },
  {
    name: "Risol Mayo Cheese",
    price: 4000,
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950"
  },
  {
    name: "Risol Mayo Mix",
    price: 5000,
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950"
  }
];

let cart = [];

const rupiah = n =>
  new Intl.NumberFormat("id-ID").format(n);

// MENAMPILKAN PRODUK
function showProducts() {
  document.getElementById("productList").innerHTML =
    products.map((p, i) => `
      <div class="card">
        <img src="${p.image}" alt="${p.name}">
        <div class="card-content">
          <h3>${p.name}</h3>

          <div class="price">
            Rp ${rupiah(p.price)} / pcs
          </div>

          <button onclick="addCart(${i})">
            + Tambah Pesanan
          </button>
        </div>
      </div>
    `).join("");
}

// TAMBAH KERANJANG
function addCart(index) {
  const item = cart.find(
    p => p.name === products[index].name
  );

  if (item) {
    item.qty++;
  } else {
    cart.push({...products[index], qty: 1});
  }

  showCart();
}

// TAMPILKAN KERANJANG
function showCart() {
  const container = document.getElementById("cartItems");

  if (cart.length === 0) {
    container.innerHTML = "Keranjang masih kosong.";
  } else {
    container.innerHTML = cart.map((item, i) => `
      <div class="cart-item">
        <div>
          <b>${item.name}</b><br>
          ${item.qty} pcs x Rp ${rupiah(item.price)}
        </div>

        <div>
          Rp ${rupiah(item.price * item.qty)}
          <br>
          <button onclick="removeItem(${i})">
            Hapus
          </button>
        </div>
      </div>
    `).join("");
  }

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.qty, 0
  );

  document.getElementById("total").textContent =
    rupiah(total);
}

// HAPUS PRODUK
function removeItem(index) {
  cart.splice(index, 1);
  showCart();
}

// CHECKOUT WHATSAPP
function checkout() {
  if (cart.length === 0) {
    alert("Keranjang masih kosong!");
    return;
  }

  let pesan =
    "Halo KEDAI LEZATTO, saya ingin memesan risol mayo:\n\n";

  cart.forEach(item => {
    pesan += `- ${item.name}: ${item.qty} pcs = Rp ${rupiah(item.price * item.qty)}\n`;
  });

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.qty, 0
  );

  pesan += `\nTotal Pesanan: Rp ${rupiah(total)}`;
  pesan += "\n\nMohon konfirmasi pesanan saya. Terima kasih!";

  const url =
    `https://wa.me/${nomorWA}?text=${encodeURIComponent(pesan)}`;

  window.open(url, "_blank");
}

// JALANKAN WEBSITE
showProducts();
