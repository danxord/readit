const themeMenu = document.querySelector('.theme-switcher__menu');
const themeMainBtn = document.querySelector('.switcher-main-btn');
const themeOs = document.querySelector('.switcher-os');
const themeLight = document.querySelector('.switcher-light');
const themeDark = document.querySelector('.switcher-dark');

function checkThemeStatus() {
  if (localStorage.getItem('theme') === null) {
    localStorage.setItem('theme', 'os');
  }
  if (localStorage.getItem('theme') === 'os') {
    document.documentElement.className = 'theme-os';
    themeOs.classList.add('theme-active');
    themeLight.classList.remove('theme-active');
    themeDark.classList.remove('theme-active');
  }
  if (localStorage.getItem('theme') === 'light') {
    document.documentElement.className = 'theme-light';
    themeLight.classList.add('theme-active');
    themeDark.classList.remove('theme-active');
    themeOs.classList.remove('theme-active');
  }
  if (localStorage.getItem('theme') === 'dark') {
    document.documentElement.className = 'theme-dark';
    themeDark.classList.add('theme-active');
    themeLight.classList.remove('theme-active');
    themeOs.classList.remove('theme-active');
  }
}
checkThemeStatus();

document.documentElement.addEventListener('click', () => {
  themeMenu.classList.remove('theme-switcher__menu_active');
  themeMainBtn.classList.remove('switcher-main-btn_active');
});

themeMainBtn.addEventListener('click', (e) => {
  themeMenu.classList.toggle('theme-switcher__menu_active');
  themeMainBtn.classList.toggle('switcher-main-btn_active');
  e.stopPropagation();
});

themeOs.addEventListener('click', () => {
  themeOs.classList.add('theme-active');
  themeLight.classList.remove('theme-active');
  themeDark.classList.remove('theme-active');
  themeMenu.classList.remove('theme-switcher__menu_active');
  themeMainBtn.classList.toggle('switcher-main-btn_active');
  localStorage.setItem('theme', 'os');
  checkThemeStatus();
});

themeLight.addEventListener('click', () => {
  themeLight.classList.add('theme-active');
  themeDark.classList.remove('theme-active');
  themeOs.classList.remove('theme-active');
  themeMenu.classList.remove('theme-switcher__menu_active');
  themeMainBtn.classList.toggle('switcher-main-btn_active');
  localStorage.setItem('theme', 'light');
  checkThemeStatus();
});

themeDark.addEventListener('click', () => {
  themeDark.classList.add('theme-active');
  themeLight.classList.remove('theme-active');
  themeOs.classList.remove('theme-active');
  themeMenu.classList.remove('theme-switcher__menu_active');
  themeMainBtn.classList.toggle('switcher-main-btn_active');
  localStorage.setItem('theme', 'dark');
  checkThemeStatus();
});
