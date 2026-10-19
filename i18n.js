// Apply translations before the game starts, including the WebGL fallback screen.
(() => {
  const messages = {
  "ru": {
    "title": "Дрон",
    "hint": "Жми пробел или тапай по экрану для взлёта",
    "start": "Полетели",
    "shield": "ЗАЩИТА",
    "charge": "ЗАРЯД",
    "pausedLabel": "ПОЛЁТ ПРИОСТАНОВЛЕН",
    "pause": "Пауза",
    "resume": "Продолжить",
    "restart": "Ещё раз",
    "webglTitle": "Нужна поддержка WebGL",
    "webglHelp": "Откройте игру в браузере с включённым аппаратным ускорением.",
    "meters": "м",
    "description": "Пилотируйте защищённый промышленный дрон в глубине тёмной пещеры.",
    "gameLabel": "Игра Дрон",
    "pauseAction": "Пауза",
    "soundOff": "Выключить звук",
    "soundOn": "Включить звук",
    "resultLabel": "Результат полёта",
    "distanceLabel": "Пройденная дистанция",
    "shieldValue": "Защита: {n} из 3",
    "chargeValue": "Заряд: {n} из 3"
  },
  "en": {
    "title": "Drone",
    "hint": "Hold Space or touch the screen to fly",
    "start": "Let's fly",
    "shield": "SHIELD",
    "charge": "CHARGE",
    "pausedLabel": "FLIGHT PAUSED",
    "pause": "Paused",
    "resume": "Resume",
    "restart": "Try again",
    "webglTitle": "WebGL required",
    "webglHelp": "Open the game in a browser with hardware acceleration enabled.",
    "meters": "m",
    "description": "Pilot a protected industrial drone through a dark cave.",
    "gameLabel": "Drone game",
    "pauseAction": "Pause",
    "soundOff": "Mute sound",
    "soundOn": "Unmute sound",
    "resultLabel": "Flight result",
    "distanceLabel": "Distance travelled",
    "shieldValue": "Shield: {n} of 3",
    "chargeValue": "Charge: {n} of 3"
  }
};
  const preferred = (navigator.languages && navigator.languages[0]) || navigator.language || 'en';
  const language = /^ru(?:[-_]|$)/i.test(preferred) ? 'ru' : 'en';
  const t = (key, n) => (messages[language][key] || messages.en[key] || key).replace('{n}', String(n));
  document.documentElement.lang = language;
  document.title = t('title');
  document.querySelector('meta[name="description"]').setAttribute('content', t('description'));
  document.querySelectorAll('[data-i18n]').forEach(el => { el.textContent = t(el.dataset.i18n); });
  document.querySelectorAll('[data-i18n-aria]').forEach(el => { el.setAttribute('aria-label', t(el.dataset.i18nAria)); });
  document.querySelector('#lives').setAttribute('aria-label', t('shieldValue', 3));
  document.querySelector('#charge').setAttribute('aria-label', t('chargeValue', 3));
  window.DronI18n = {language, t};
})();
