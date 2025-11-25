const sheetId = "1oqFEz4woXBf2kw7LxZPtGMPolhG3s85_XepJq_RKWe4"; 
const apiKey = "AIzaSyDGHU6SBVnO2OlHJCPzpyzzoYWMYow8VdM";       
const range = "Лист1!A2:B";

function loadPrices() {
  fetch(`https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`)
    .then(res => res.json())
    .then(data => {
      if (!data.values) return;
      data.values.forEach(([name, price]) => {
        const map = {
          "Кондиционер": ["#ac-price", "#ac-price-2"],
          "Окно": ["#window-price", "#window-price-2"],
          "Вентиляция": ["#vent-price", "#vent-price-2"]
        };
        if (map[name]) {
          map[name].forEach(sel => {
            document.querySelectorAll(sel).forEach(el => el.textContent = price);
          });
        }
      });
    })
    .catch(err => console.error("Ошибка загрузки цен:", err));
}
loadPrices();
setInterval(loadPrices, 30000);

const allImages = document.querySelectorAll(
  '.gallery img, .qr-block img, .review img, .works-gallery img'
);
let currentIndex = 0;

const lightbox = document.createElement('div');
lightbox.className = 'lightbox';
lightbox.innerHTML = `
  <span class="close">&times;</span>
  <img src="" alt="Просмотр">
  <div class="lightbox-nav">
    <button id="prev">‹</button>
    <button id="next">›</button>
  </div>
`;
document.addEventListener("DOMContentLoaded", () => {
  const lightbox = document.querySelector(".lightbox");
  const lightboxImg = lightbox.querySelector("img");
  const closeBtn = lightbox.querySelector(".close");
  const prevBtn = lightbox.querySelector("#prev");
  const nextBtn = lightbox.querySelector("#next");
  const caption = lightbox.querySelector(".lightbox-caption");

  const allImages = document.querySelectorAll(".works-gallery img");
  const worksCover = document.querySelector(".works-cover");
  let currentIndex = 0;

  function showImage(index) {
    currentIndex = index;
    lightboxImg.src = allImages[index].src;
    caption.textContent = `Фото ${index + 1} из ${allImages.length}`;
    lightbox.classList.add("active");
    document.body.classList.add("no-scroll");
  }

  if (worksCover) {
    worksCover.addEventListener("click", () => showImage(0));
  }

  closeBtn.addEventListener("click", () => {
    lightbox.classList.remove("active");
    document.body.classList.remove("no-scroll");
  });

  prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + allImages.length) % allImages.length;
    showImage(currentIndex);
  });

  nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % allImages.length;
    showImage(currentIndex);
  });

  document.addEventListener("keydown", e => {
    if (!lightbox.classList.contains("active")) return;
    if (e.key === "Escape") closeBtn.click();
    if (e.key === "ArrowLeft") prevBtn.click();
    if (e.key === "ArrowRight") nextBtn.click();
  });
});

const nav = document.querySelector('.nav');
burger.addEventListener('click', () => {
  nav.classList.toggle('active');
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add('visible');
  });
}, { threshold: 0.2 });
document.querySelectorAll('.section').forEach(sec => observer.observe(sec));

const worksCover = document.querySelector('.works-cover');
if (worksCover) {
  worksCover.addEventListener('click', () => showImage(0));
}