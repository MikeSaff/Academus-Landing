# 🚀 Быстрый старт

Минимальная инструкция для запуска лендинга за 5 минут.

## ⚡ За 30 секунд

### Windows
1. Двойной клик на `start-server.bat`
2. Откройте http://localhost:8000
3. Готово! 🎉

### Linux / Mac
```bash
./start-server.sh
```
Откройте http://localhost:8000

---

## 📦 Что входит в проект

```
Academus-Landing/
├── 🌐 index.html           # Главная страница
├── 🎨 styles.css           # Стили
├── ⚙️  script.js            # JavaScript
├── 🔧 config.js            # Настройки API
├── 🚀 start-server.*       # Скрипты запуска
├── 🖼️  favicon.svg          # Иконка сайта
└── 📚 README.md            # Документация
```

---

## 🎯 Первые шаги

### 1️⃣ Запустите сервер

**Автоматически (рекомендуется):**
- Windows: `start-server.bat`
- Linux/Mac: `./start-server.sh`

**Вручную:**
```bash
# Python
python -m http.server 8000

# PHP
php -S localhost:8000

# Node.js
npx http-server -p 8000
```

### 2️⃣ Откройте в браузере

```
http://localhost:8000
```

### 3️⃣ Готово!

Вы должны увидеть:
- ✅ Главный экран (Hero)
- ✅ Секцию "О нас" с каруселью книг
- ✅ Все остальные секции
- ✅ Работающие анимации

---

## 🔧 Базовая настройка

### Изменить контент

Откройте `index.html` и найдите нужную секцию:

```html
<!-- Главный экран -->
<section class="hero">
    <h2 class="hero-title">Academus Publishing</h2>
    <p class="hero-subtitle">Ваш проводник...</p>
</section>
```

### Изменить цвета

Откройте `styles.css`, найдите `:root`:

```css
:root {
    --primary-color: #1e40af;      /* Измените здесь */
    --secondary-color: #3b82f6;    /* И здесь */
}
```

### Подключить API

1. Откройте `config.js`
2. Раскомментируйте `EDITORUM_API_CONFIG`
3. Добавьте ваш API endpoint:

```javascript
const EDITORUM_API_CONFIG = {
    endpoint: 'https://your-api.com/books',
    headers: {
        'Content-Type': 'application/json'
    }
};
```

---

## 🌐 Опубликовать онлайн

### Netlify (самый простой)

1. Перейдите на [netlify.com](https://www.netlify.com/)
2. Перетащите папку проекта
3. Готово! Получите URL вида `https://yoursite.netlify.app`

### GitHub Pages

```bash
# Создайте репозиторий на GitHub
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/username/repo.git
git push -u origin main

# Включите GitHub Pages в настройках репозитория
```

Сайт будет доступен: `https://username.github.io/repo/`

---

## 🆘 Проблемы?

### Сайт не открывается

**Проблема:** `ERR_CONNECTION_REFUSED`

**Решение:**
- Убедитесь, что сервер запущен
- Проверьте, что используете http://localhost:8000 (не file://)

### Карусель не работает

**Проблема:** Книги не загружаются

**Решение:**
- Откройте консоль (F12)
- Проверьте наличие ошибок
- По умолчанию используются тестовые данные - это нормально!

### Стили не применяются

**Проблема:** Сайт выглядит сломанным

**Решение:**
- Очистите кэш браузера (Ctrl+F5)
- Проверьте, что `styles.css` в той же папке что и `index.html`

---

## 📚 Дополнительная информация

Подробные гайды:
- 📖 [README.md](README.md) - Полная документация
- 🚀 [DEPLOYMENT.md](DEPLOYMENT.md) - Развертывание
- 🔌 [API-INTEGRATION.md](API-INTEGRATION.md) - Интеграция API
- 📝 [CHANGELOG.md](CHANGELOG.md) - История изменений

---

## 💡 Полезные команды

```bash
# Клонировать проект
git clone <repository-url>
cd Academus-Landing

# Запустить локально
python -m http.server 8000
# или
./start-server.sh

# Проверить в браузере
http://localhost:8000

# Развернуть на Netlify
netlify deploy

# Развернуть на Vercel
vercel
```

---

## ✨ Фичи

- ✅ Адаптивный дизайн (работает на всех устройствах)
- ✅ Современные анимации
- ✅ SEO-оптимизация
- ✅ Быстрая загрузка
- ✅ Интеграция с API
- ✅ Fallback на тестовые данные
- ✅ Cross-browser совместимость

---

## 📞 Помощь

**Технические вопросы:**
- GitHub Issues: [создать issue](https://github.com/academus/landing/issues)
- Email: support@academuspub.com

**Бизнес-вопросы:**
- Email: info@academuspub.com
- Телефон: +7 (499) 350-54-81
- Сайт: [academuspub.com](https://academuspub.com)

---

## 🎓 Следующие шаги

1. ✅ Запустили локально
2. ⬜ Измените контент под себя
3. ⬜ Настройте API (опционально)
4. ⬜ Опубликуйте онлайн
5. ⬜ Настройте домен
6. ⬜ Добавьте аналитику

---

**Время на настройку:** ~5 минут  
**Сложность:** ⭐ Легко  
**Требования:** Любой современный браузер

---

🎉 **Поздравляем! Вы запустили лендинг Academus Publishing!**


