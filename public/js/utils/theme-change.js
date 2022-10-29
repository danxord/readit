// const changeThemeBtn = document.querySelector('.theme-change');
// const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

// console.log(prefersDarkScheme);

// const currentTheme = localStorage.getItem('theme');
// if (currentTheme === 'dark') {
//   document.body.classList.toggle('dark-theme');
// } else if (currentTheme === 'light') {
//   document.body.classList.toggle('light-theme');
// }

// changeThemeBtn.addEventListener('click', () => {
//   if (prefersDarkScheme.matches) {
//     document.body.classList.toggle('light-theme');
//     const theme = document.body.classList.contains('light-theme')
//       ? 'light'
//       : 'dark';
//     localStorage.setItem('theme', theme);
//   } else {
//     document.body.classList.toggle('dark-theme');
//     const theme = document.body.classList.contains('dark-theme')
//       ? 'dark'
//       : 'light';
//     localStorage.setItem('theme', theme);
//   }
// });

// ЭТО БЛЯДСКОЕ НАТЯГИВАНИЕ СОВЫ НА ЕБУЧИЙ ГЛОБУС!!!!!!!!!!!!!!!!
// Правильная реализация и авто-детекта и мануального выбора на странице яндекса
// и на странице дока, и тем более на странице mdn главной докуметации JS!
// Надо либо делать автоматический детект на основе того какая тема в системе,
// тогда вообще Js не нужен
// Либо делаешь мануальный переключать
// А миксовать все воедино невозможно - сплошные баги, которые невозможно пофиксить
// Они зависят не от меня, а от блядской системы юзера, от его браузера, localstorage итд...
// Нужно либо делать мануальную настройку, либо авто-детект, либо давать юзеру
// выбрать либо авто-детект, либо темную тему, либо светлую тему(тоесть мануальный выбор)
// как это сделано на абсолютно всех сайтах и абсолютно во всех приложениях
// Миксовать авто-детект или мануального выбор без возможности выбора - ЗЛО!

// document.querySelector('[title="theme"]').setAttribute('href', `css/theme-${themeName}.css`);
// такой подоход подойдет, только если не делать пременные
// + если хранить в разных файлах css стилизацию(тупость ебаная)
// и тогда типо по ссылке подгружаешь нужный файл со стилМи

// const themeOptions = document.querySelector('.theme-switcher__menu__item');
// themeOptions.addEventListener('click', () => {
//   themeSwitcherMenu.classList.remove('theme-switcher__menu_active');
// });

// if (themeMenu.classList.contains('theme-switcher__menu_active')) {
//   document.body.addEventListener('click', () => {
//     themeMenu.classList.remove('theme-switcher__menu_active');
//   });
// }

// const themeSwitcher = document.querySelector('.theme-switcher');
// const themeOptions = document.querySelector('.theme-switcher__btn');

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
    document.documentElement.classList.remove('theme-light', 'theme-dark');
    document.documentElement.classList.add('theme-os');
    themeMainBtn.classList.remove('theme-light-icon', 'theme-dark-icon');
    themeMainBtn.classList.add('theme-os-icon');
    themeOs.classList.add('theme-active');
    themeLight.classList.remove('theme-active');
    themeDark.classList.remove('theme-active');
  } else if (localStorage.getItem('theme') === 'light') {
    document.documentElement.classList.remove('theme-os', 'theme-dark');
    document.documentElement.classList.add('theme-light');
    themeMainBtn.classList.remove('theme-os-icon', 'theme-dark-icon');
    themeMainBtn.classList.add('theme-light-icon');
    themeLight.classList.add('theme-active');
    themeDark.classList.remove('theme-active');
    themeOs.classList.remove('theme-active');
  } else if (localStorage.getItem('theme') === 'dark') {
    document.documentElement.classList.remove('theme-os', 'theme-light');
    document.documentElement.classList.add('theme-dark');
    themeMainBtn.classList.remove('theme-os-icon', 'theme-light-icon');
    themeMainBtn.classList.add('theme-dark-icon');
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
  themeMainBtn.classList.remove('theme-light-icon', 'theme-dark-icon');
  themeMainBtn.classList.add('theme-os-icon');
  themeOs.classList.add('theme-active');
  themeLight.classList.remove('theme-active');
  themeDark.classList.remove('theme-active');
  themeMenu.classList.remove('theme-switcher__menu_active');
  themeMainBtn.classList.toggle('switcher-main-btn_active');
  localStorage.setItem('theme', 'os');
  checkThemeStatus();
});

themeLight.addEventListener('click', () => {
  themeMainBtn.classList.remove('theme-os-icon', 'theme-dark-icon');
  themeMainBtn.classList.add('theme-light-icon');
  themeLight.classList.add('theme-active');
  themeDark.classList.remove('theme-active');
  themeOs.classList.remove('theme-active');
  themeMenu.classList.remove('theme-switcher__menu_active');
  themeMainBtn.classList.toggle('switcher-main-btn_active');
  localStorage.setItem('theme', 'light');
  checkThemeStatus();
});

themeDark.addEventListener('click', () => {
  themeMainBtn.classList.remove('theme-os-icon', 'theme-light-icon');
  themeMainBtn.classList.add('theme-dark-icon');
  themeDark.classList.add('theme-active');
  themeLight.classList.remove('theme-active');
  themeOs.classList.remove('theme-active');
  themeMenu.classList.remove('theme-switcher__menu_active');
  themeMainBtn.classList.toggle('switcher-main-btn_active');
  localStorage.setItem('theme', 'dark');
  checkThemeStatus();
});
