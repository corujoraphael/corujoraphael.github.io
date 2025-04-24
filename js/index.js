console.log("AKI")
// const slider = document.querySelector('.slider');
// const testimonials = document.querySelectorAll('.testimonial');

// let currentIndex = 0;
// let autoSlideInterval;

// function updateSlider() {
//   const width = testimonials[0].clientWidth;
//   slider.style.transform = `translateX(-${currentIndex * width}px)`;
// }

// // Função para avançar o slider automaticamente
// function nextSlide() {
//   currentIndex = (currentIndex + 1) % testimonials.length; // Loop para o início
//   updateSlider();
// }

// // Inicia o movimento automático
// function startAutoSlide() {
//   autoSlideInterval = setInterval(nextSlide, 4000); // Altere o tempo (em ms) conforme necessário
// }

// // Pausa o movimento automático
// function stopAutoSlide() {
//   clearInterval(autoSlideInterval);
// }

// // Eventos para pausar e retomar o slider ao passar o mouse
// slider.addEventListener('mouseenter', stopAutoSlide);
// slider.addEventListener('mouseleave', startAutoSlide);

// // Inicializa o slider
// startAutoSlide();

// // Atualiza o slider no redimensionamento da janela
// window.addEventListener('resize', updateSlider);