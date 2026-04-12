// Menu mobile toggle
(function () {
  var toggle = document.querySelector('.menu-toggle');
  var nav = document.querySelector('.nav-menu');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var expanded = nav.classList.toggle('active');
      toggle.setAttribute('aria-expanded', expanded);
    });
    // Close menu when clicking a link
    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('active');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }
})();

// Active nav link
(function () {
  var path = window.location.pathname;
  var links = document.querySelectorAll('.nav-menu a');
  links.forEach(function (link) {
    if (link.getAttribute('href') === path || (path === '/' && link.getAttribute('href') === '/')) {
      link.classList.add('active');
    }
  });
})();

// Fade-in on scroll
(function () {
  var sections = document.querySelectorAll('.diferenciais, .produtos-destaque, .sobre, .testimonials, .faq, .contato, .cta-final, .how-it-works, .related-products, .seasonal-banner');
  sections.forEach(function (s) { s.classList.add('fade-in'); });

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    document.querySelectorAll('.fade-in').forEach(function (el) { observer.observe(el); });
  } else {
    document.querySelectorAll('.fade-in').forEach(function (el) { el.classList.add('visible'); });
  }
})();

// Footer WhatsApp form
function sendFooterWhatsApp(e) {
  e.preventDefault();
  var name = document.getElementById('footer-name').value.trim();
  var msg = document.getElementById('footer-msg').value.trim();
  var text = 'Olá! Meu nome é ' + name + '. ' + msg;
  var url = 'https://wa.me/5531993434414?text=' + encodeURIComponent(text);
  if (typeof trackWhatsAppClick === 'function') {
    trackWhatsAppClick('footer', 'form');
  }
  window.open(url, '_blank');
}

// Filtro de categorias na página de produtos
(function () {
  var buttons = document.querySelectorAll('.filter-btn');
  var cards = document.querySelectorAll('.product-card');
  if (!buttons.length || !cards.length) return;

  buttons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var category = btn.dataset.category;

      // Atualizar estado ativo
      buttons.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');

      // Filtrar cards
      cards.forEach(function (card) {
        if (category === 'all' || card.dataset.type === category) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });

      // Analytics
      if (typeof trackFilterCategory === 'function') {
        trackFilterCategory(category);
      }
    });
  });
})();
