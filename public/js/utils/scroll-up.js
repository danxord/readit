const scrollUpBtn = document.querySelector('.scroll-up');

// Кросс-браузерный подход чтобы получить позицию скролла относительно верха страницы
const getTop = () => window.pageYOffset || document.documentElement.scrollTop;

// Добавление и удаление класса по клику
const onWindowScroll = function () {
  const offset = 500;
  if (getTop() > offset) {
    scrollUpBtn.classList.add('scroll-up_active');
  } else {
    scrollUpBtn.classList.remove('scroll-up_active');
  }
};
window.addEventListener('scroll', onWindowScroll);

// Скролл наверх по клику
const scrollUp = function () {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};
scrollUpBtn.addEventListener('click', scrollUp);
