
const nomorWA = "6285894731982";

const products = [
  {
    name: "Risol Mayo Original",
    price: 3.500,
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950"
  },
  {
    name: "Risol coklat",
    price: 3.500,
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950"
  },
  {
    name: "Risol Matcha",
    price: 3.500,
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950"
  },
  {
    name: "cireng pedas",
    price: 3.500,
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950"
  }
];

let cart = [];

const rupiah = n =>
  new Intl.NumberFormat("id-ID").format(n);


// =====================================
// MENAMPILKAN PRODUK
// =====================================

function showProducts() {
  const productList = document.getElementById("productList");
  if (!productList) return;

  productList.innerHTML =
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


// =====================================
// TAMBAH KERANJANG
// =====================================

function addCart(index) {
  const product = products[index];

  if (!product) return;

  const item = cart.find(
    p => p.name === product.name
  );

  if (item) {
    item.qty++;
  } else {
    cart.push({
      ...product,
      qty: 1
    });
  }

  showCart();
}


// =====================================
// MENAMPILKAN KERANJANG
// =====================================

function showCart() {
  const container = document.getElementById("cartItems");
  const totalElement = document.getElementById("total");

  if (!container || !totalElement) return;

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
    (sum, item) => sum + item.price * item.qty,
    0
  );

  totalElement.textContent = rupiah(total);
}


// =====================================
// HAPUS PRODUK
// =====================================

function removeItem(index) {
  cart.splice(index, 1);
  showCart();
}


// =====================================
// CHECKOUT WHATSAPP
// =====================================

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
    (sum, item) => sum + item.price * item.qty,
    0
  );

  pesan += `\nTotal Pesanan: Rp ${rupiah(total)}`;
  pesan += "\n\nMohon konfirmasi pesanan saya. Terima kasih!";

  const url =
    `https://wa.me/${nomorWA}?text=${encodeURIComponent(pesan)}`;

  window.open(url, "_blank");
}


// =====================================
// JALANKAN FITUR PRODUK
// =====================================

// Halaman tetap berjalan jika tidak memiliki
// elemen productList.

if (document.getElementById("productList")) {
  showProducts();
}


/* =========================================
   ANIMASI BACKGROUND ASAP EMAS
   Desktop : Medium
   HP      : Light

   - Full halaman
   - Tanpa library tambahan
   - Performa ringan
   - Berhenti saat tab tidak aktif
   - Mendukung prefers-reduced-motion
   ========================================= */


(() => {

  const canvas = document.getElementById("gold-smoke-bg");

  if (!canvas) return;

  const ctx = canvas.getContext("2d", {
    alpha: true
  });

  if (!ctx) return;


  // PENGATURAN PERANGKAT

  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  );

  const mobileQuery = window.matchMedia(
    "(max-width: 680px)"
  );


  // VARIABEL ANIMASI

  let width = 0;
  let height = 0;
  let dpr = 1;

  let animationId = 0;
  let lastFrame = 0;

  let smoke = [];
  let motes = [];


  // ANGKA ACAK

  const random = (min, max) => {
    return Math.random() * (max - min) + min;
  };


  // =====================================
  // MEMBUAT PARTIKEL ASAP
  // =====================================

  function createScene() {

    const mobile = mobileQuery.matches;

    // Desktop medium, HP light

    const smokeCount = mobile ? 3 : 6;
    const moteCount = mobile ? 10 : 24;


    // PARTIKEL ASAP

    smoke = Array.from(
      { length: smokeCount },
      () => ({

        x: random(-width * 0.1, width * 1.1),

        y: random(-height * 0.1, height * 1.1),

        radius: random(
          mobile ? 85 : 120,
          mobile ? 155 : 220
        ),

        driftX: random(-0.12, 0.12),

        driftY: random(-0.09, 0.09),

        phase: random(0, Math.PI * 2),

        alpha: random(
          0.035,
          mobile ? 0.075 : 0.095
        )

      })
    );


    // PARTIKEL CAHAYA

    motes = Array.from(
      { length: moteCount },
      () => ({

        x: random(0, width),

        y: random(0, height),

        radius: random(
          0.7,
          mobile ? 1.2 : 1.6
        ),

        speed: random(
          0.08,
          mobile ? 0.18 : 0.28
        ),

        drift: random(-0.12, 0.12),

        phase: random(0, Math.PI * 2),

        alpha: random(0.16, 0.48)

      })
    );

  }


  // =====================================
  // UKURAN CANVAS
  // =====================================

  function resizeCanvas() {

    const nextWidth = window.innerWidth;
    const nextHeight = window.innerHeight;

    // Batasi resolusi agar ringan di HP

    dpr = Math.min(
      window.devicePixelRatio || 1,
      1.5
    );

    width = nextWidth;
    height = nextHeight;

    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);

    ctx.setTransform(
      dpr,
      0,
      0,
      dpr,
      0,
      0
    );

    createScene();

    drawFrame(0, true);

  }


  // =====================================
  // MENGGAMBAR ANIMASI
  // =====================================

  function drawFrame(time, still = false) {

    ctx.clearRect(
      0,
      0,
      width,
      height
    );


    // ASAP EMAS

    smoke.forEach((p) => {

      const pulse = still
        ? 1
        : 0.82 + Math.sin(
            time * 0.00022 + p.phase
          ) * 0.18;

      const radius = p.radius * pulse;


      const gradient = ctx.createRadialGradient(
        p.x,
        p.y,
        0,
        p.x,
        p.y,
        radius
      );


      gradient.addColorStop(
        0,
        `rgba(210, 145, 72, ${p.alpha})`
      );

      gradient.addColorStop(
        0.42,
        `rgba(164, 111, 55, ${p.alpha * 0.48})`
      );

      gradient.addColorStop(
        1,
        "rgba(164, 111, 55, 0)"
      );


      ctx.fillStyle = gradient;

      ctx.fillRect(
        p.x - radius,
        p.y - radius,
        radius * 2,
        radius * 2
      );


      // GERAKAN ASAP

      if (!still) {

        p.x += p.driftX;
        p.y += p.driftY;


        if (p.x < -radius) {
          p.x = width + radius;
        }

        if (p.x > width + radius) {
          p.x = -radius;
        }

        if (p.y < -radius) {
          p.y = height + radius;
        }

        if (p.y > height + radius) {
          p.y = -radius;
        }

      }

    });


    // =====================================
    // PARTIKEL CAHAYA EMAS
    // =====================================

    motes.forEach((p) => {

      const flicker = 0.65 + Math.sin(
        time * 0.001 + p.phase
      ) * 0.35;


      ctx.beginPath();

      ctx.arc(
        p.x,
        p.y,
        p.radius,
        0,
        Math.PI * 2
      );


      ctx.fillStyle =
        `rgba(245, 201, 142, ${p.alpha * flicker})`;

      ctx.fill();


      // GERAKAN PARTIKEL

      if (!still) {

        p.y -= p.speed;
        p.x += p.drift;


        if (p.y < -3) {

          p.y = height + 3;

          p.x = random(0, width);

        }


        if (p.x < -3) {
          p.x = width + 3;
        }

        if (p.x > width + 3) {
          p.x = -3;
        }

      }

    });

  }


  // =====================================
  // ANIMASI UTAMA
  // =====================================

  function animate(timestamp) {

    if (
      document.hidden ||
      reduceMotion.matches
    ) {

      animationId = 0;

      return;

    }


    // Maksimal sekitar 30 FPS

    if (timestamp - lastFrame >= 33) {

      drawFrame(timestamp);

      lastFrame = timestamp;

    }


    animationId = window.requestAnimationFrame(
      animate
    );

  }


  // =====================================
  // MULAI ANIMASI
  // =====================================

  function startAnimation() {

    if (
      reduceMotion.matches ||
      document.hidden ||
      animationId
    ) {
      return;
    }

    animationId = window.requestAnimationFrame(
      animate
    );

  }


  // =====================================
  // HENTIKAN ANIMASI
  // =====================================

  function stopAnimation() {

    if (animationId) {

      window.cancelAnimationFrame(
        animationId
      );

      animationId = 0;

    }

  }


  // =====================================
  // PENGATURAN GERAKAN
  // =====================================

  function refreshMotionPreference() {

    stopAnimation();

    if (reduceMotion.matches) {

      drawFrame(0, true);

    } else {

      startAnimation();

    }

  }


  // =====================================
  // MENJALANKAN BACKGROUND
  // =====================================

  resizeCanvas();

  refreshMotionPreference();


  // HENTIKAN SAAT TAB TIDAK AKTIF

  document.addEventListener(
    "visibilitychange",
    () => {

      if (document.hidden) {

        stopAnimation();

      } else {

        startAnimation();

      }

    }
  );


  // RESPONSIVE SAAT UKURAN LAYAR BERUBAH

  window.addEventListener(
    "resize",
    () => {

      resizeCanvas();

      startAnimation();

    },
    { passive: true }
  );


  // DETEKSI PENGATURAN REDUCED MOTION

  if (
    typeof reduceMotion.addEventListener === "function"
  ) {

    reduceMotion.addEventListener(
      "change",
      refreshMotionPreference
    );

  }


  // DETEKSI PERANGKAT HP

  if (
    typeof mobileQuery.addEventListener === "function"
  ) {

    mobileQuery.addEventListener(
      "change",
      resizeCanvas
    );

  }

})();
