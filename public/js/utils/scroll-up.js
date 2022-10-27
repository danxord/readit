const scrollUpBtn = document.querySelector('.scroll-up');

// Cross-browser approach to get the scroll position relative to the top of the page
const getTop = () => window.pageYOffset || document.documentElement.scrollTop;

// Add and remove a class on scroll
const onWindowScroll = function () {
  const offset = 500;
  if (getTop() > offset) {
    scrollUpBtn.classList.add('scroll-up_active');
  } else {
    scrollUpBtn.classList.remove('scroll-up_active');
  }
};
window.addEventListener('scroll', onWindowScroll);

// Scroll to top on click
const scrollUp = function () {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};
scrollUpBtn.addEventListener('click', scrollUp);
