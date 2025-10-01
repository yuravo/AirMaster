
const sheetId = "1oqFEz4woXBf2kw7LxZPtGMPolhG3s85_XepJq_RKWe4"; 
const apiKey = "AIzaSyDGHU6SBVnO2OlHJCPzpyzzoYWMYow8VdM";       
const range = "Лист1!A2:B";

function loadPrices() {
  fetch(`https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`)
    .then(res => res.json())
    .then(data => {
      console.log("Данные из Google Sheets:", data);
      if (!data.values) return;

      const rows = data.values;

      rows.forEach(([name, price]) => {
        switch (name) {
          case "Кондиционер":
            document.querySelectorAll("#ac-price, #ac-price-2")
              .forEach(el => el.textContent = price);
            break;

          case "Окно":
            document.querySelectorAll("#window-price, #window-price-2")
              .forEach(el => el.textContent = price);
            break;

          case "Вентиляция":
            document.querySelectorAll("#vent-price, #vent-price-2")
              .forEach(el => el.textContent = price);
            break;
        }
      });
    })
    .catch(err => console.error("Ошибка загрузки цен:", err));
}

// Загружаем сразу и обновляем раз в 30 секунд (30000 мс)
loadPrices();
setInterval(loadPrices, 30000);

// Лайтбокс для картинок
document.querySelectorAll('.gallery img, .qr-block img, .review img').forEach(img => {
  img.style.cursor = "zoom-in";
  img.addEventListener('click', () => {
    // Добавляем размытие
    document.body.classList.add('lightbox-open');
    document.querySelectorAll('main, header, footer').forEach(el => {
      el.classList.add('blur-background');
    });

    // Создаём лайтбокс
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox active';
    lightbox.innerHTML = `<img src="${img.src}" alt="${img.alt}">`;
    document.body.appendChild(lightbox);

    // Закрытие по клику
    lightbox.addEventListener('click', () => {
      lightbox.remove();
      document.body.classList.remove('lightbox-open');
      document.querySelectorAll('main, header, footer').forEach(el => {
        el.classList.remove('blur-background');
      });
    });
  });
});




(function () {
  const toast = document.createElement('div');
  toast.setAttribute('role', 'status');
  toast.style.position = 'fixed';
  toast.style.left = '50%';
  toast.style.bottom = '24px';
  toast.style.transform = 'translateX(-50%)';
  toast.style.padding = '10px 14px';
  toast.style.borderRadius = '10px';
  toast.style.background = '#111827';
  toast.style.color = '#fff';
  toast.style.boxShadow = '0 8px 24px rgba(2,8,23,.18)';
  toast.style.font = '600 14px/1 Inter, system-ui, sans-serif';
  toast.style.opacity = '0';
  toast.style.transition = 'opacity .2s ease';
  toast.textContent = 'Готовы ответить: WhatsApp и телефон в один клик';
  document.body.appendChild(toast);

  function showToast() {
    toast.style.opacity = '1';
    setTimeout(() => toast.style.opacity = '0', 2600);
  }

  ['click', 'touchstart', 'keydown'].forEach(evt => {
    window.addEventListener(evt, function once() {
      showToast();
      window.removeEventListener(evt, once);
    }, { once: true });
  });
})();



const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add('visible');
  });
}, { threshold: 0.2 });

document.querySelectorAll('.section').forEach(sec => observer.observe(sec));
