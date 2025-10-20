# Academus Publishing - Landing Page

Современный лендинг для научного издательства Academus Publishing — американского издательства, издающего российскую научную литературу на английском языке.

## 🌟 Особенности

- **Современный дизайн** - профессиональный и академичный интерфейс
- **Адаптивная верстка** - корректное отображение на всех устройствах
- **Карусель книг** - динамическое отображение изданий через API Эдиторум
- **Плавные анимации** - современные переходы и эффекты
- **SEO-оптимизация** - правильная структура и мета-теги
- **Производительность** - быстрая загрузка и оптимизация ресурсов

## 📋 Структура проекта

```
Academus-Landing/
│
├── index.html          # Основная HTML-страница
├── styles.css          # Стили и адаптивная верстка
├── script.js           # JavaScript функциональность
├── config.js           # Конфигурация API
└── README.md           # Документация проекта
```

## 🚀 Быстрый старт

### Локальный запуск

1. **Клонируйте или скачайте проект**
   ```bash
   git clone <repository-url>
   cd Academus-Landing
   ```

2. **Запустите локальный сервер**

   Используйте один из следующих способов:

   - **Python 3:**
     ```bash
     python -m http.server 8000
     ```

   - **Node.js (http-server):**
     ```bash
     npx http-server -p 8000
     ```

   - **PHP:**
     ```bash
     php -S localhost:8000
     ```

3. **Откройте в браузере**
   ```
   http://localhost:8000
   ```

> ⚠️ **Важно:** Не открывайте файл напрямую через `file://` - используйте локальный сервер для корректной работы всех функций.

## 🔧 Настройка API Эдиторум

По умолчанию лендинг использует тестовые данные для отображения книг. Для подключения реального API:

### Шаг 1: Откройте `config.js`

### Шаг 2: Раскомментируйте и настройте конфигурацию

```javascript
const EDITORUM_API_CONFIG = {
    endpoint: 'https://your-api-endpoint.com/books',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer YOUR_API_KEY', // если требуется
    }
};
```

### Шаг 3: Обновите парсер ответа API

В файле `script.js` найдите метод `parseAPIResponse()` и адаптируйте его под структуру вашего API:

```javascript
parseAPIResponse(data) {
    // Пример для вашей структуры API
    return data.items.map(book => ({
        id: book.id,
        title: book.title,
        author: book.author,
        cover: book.coverUrl,
        url: book.link
    }));
}
```

### Примеры структур API

**Вариант 1: Прямой массив**
```json
[
    {
        "id": 1,
        "title": "Book Title",
        "author": "Author Name",
        "cover_url": "https://example.com/cover.jpg"
    }
]
```

**Вариант 2: Объект с массивом**
```json
{
    "books": [...],
    "total": 10
}
```

**Вариант 3: Вложенная структура**
```json
{
    "data": {
        "items": [...],
        "meta": {...}
    }
}
```

## 📱 Секции лендинга

1. **Hero Section** - Главный экран с призывом к действию
2. **О нас** - Информация о компании и карусель изданий
3. **Уникальная программа** - Описание услуг перевода с помощью ИИ
4. **Типы изданий** - Книги и научные журналы
5. **Комплексное предложение** - Полный цикл услуг
6. **Контакты** - Способы связи

## 🎨 Кастомизация

### Цветовая схема

В файле `styles.css` можно изменить цветовую палитру:

```css
:root {
    --primary-color: #1e40af;      /* Основной цвет */
    --secondary-color: #3b82f6;    /* Вторичный цвет */
    --accent-color: #60a5fa;       /* Акцентный цвет */
    /* ... другие переменные */
}
```

### Шрифты

Используются Google Fonts:
- **Inter** - для основного текста
- **Playfair Display** - для заголовков

Можно заменить в `<head>` секции `index.html`.

### Контент

Весь контент можно редактировать непосредственно в `index.html`.

## 🌐 Развертывание и расшаривание

### 📤 Расшарить сайт (для просмотра)

#### Вариант 1: Netlify (РЕКОМЕНДУЕТСЯ)
**Самый простой способ - 2 минуты**

1. Создайте аккаунт на [Netlify](https://www.netlify.com/)
2. Перетащите папку проекта в браузер (Drag & Drop)
3. Готово! Получите ссылку типа `academus-publishing.netlify.app`

**Или используйте автоматический скрипт:**
```bash
# Запустите deploy-netlify.bat
deploy-netlify.bat
```

#### Вариант 2: Vercel

1. Зарегистрируйтесь на [Vercel](https://vercel.com)
2. Импортируйте проект или загрузите папку
3. Получите ссылку типа `academus-publishing.vercel.app`

#### Вариант 3: GitHub Pages

1. Загрузите код в GitHub репозиторий (см. `GITHUB_SETUP.md`)
2. Перейдите в Settings → Pages
3. Выберите ветку `main` для публикации
4. Сайт будет доступен по адресу `https://username.github.io/repository-name/`

#### Вариант 4: Временный доступ (для демо)

Используйте ngrok для временной публикации:
1. Скачайте [ngrok](https://ngrok.com/download)
2. Запустите сервер: `npx http-server -p 8000`
3. В другом терминале: `ngrok http 8000`
4. Поделитесь временной ссылкой

### 📦 Расшарить код (для редактирования)

#### Вариант 1: GitHub (РЕКОМЕНДУЕТСЯ)
**Для совместной работы над кодом**

См. подробную инструкцию в файле `GITHUB_SETUP.md`

Кратко:
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/USERNAME/REPO.git
git push -u origin main
```

#### Вариант 2: ZIP архив
**Для простой передачи файлов**

Используйте скрипт:
```bash
# Запустите create-archive.bat
create-archive.bat
```

Или создайте вручную:
- Упакуйте все файлы проекта в ZIP
- Отправьте через email, мессенджер или облако

#### Вариант 3: Облачные сервисы

Загрузите проект в:
- Google Drive
- OneDrive
- Dropbox

И настройте доступ для нужных пользователей.

---

### 📖 Полная документация

Подробные инструкции см. в файле **`SHARE_OPTIONS.md`**

### Обычный хостинг

Загрузите все файлы в корневую директорию веб-сервера через FTP/SFTP.

## 🔍 SEO

### Мета-теги

Обновите мета-теги в `<head>` секции `index.html`:

```html
<meta name="description" content="Ваше описание">
<meta name="keywords" content="ключевые, слова">
<meta property="og:title" content="Заголовок для соцсетей">
<meta property="og:description" content="Описание для соцсетей">
<meta property="og:image" content="https://yoursite.com/image.jpg">
```

### Favicon

Добавьте иконку сайта:

```html
<link rel="icon" type="image/png" href="favicon.png">
```

## 📊 Аналитика

### Google Analytics

Добавьте перед закрывающим тегом `</head>`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Yandex Metrika

Добавьте счетчик Яндекс.Метрики перед `</body>`.

## 🐛 Устранение неполадок

### Карусель не работает

- Убедитесь, что файл `config.js` загружается перед `script.js`
- Проверьте консоль браузера на наличие ошибок
- Убедитесь, что используете локальный сервер, а не `file://`

### API не загружает данные

- Проверьте правильность endpoint URL
- Убедитесь, что API поддерживает CORS
- Проверьте требования к авторизации
- Используйте инструменты разработчика (Network tab)

### Стили не применяются

- Очистите кэш браузера (Ctrl+F5)
- Проверьте, что путь к `styles.css` корректен
- Убедитесь, что файл загружается без ошибок

## 📞 Контакты

**Academus Publishing**
- 🌐 Сайт: [academuspub.com](https://academuspub.com)
- 📞 Телефон: +7 (499) 350-54-81
- 📧 Email: info@academuspub.com

## 📝 Лицензия

© 2025 Academus Publishing. Все права защищены.

## 🛠 Технологии

- HTML5
- CSS3 (Grid, Flexbox, Custom Properties)
- Vanilla JavaScript (ES6+)
- Google Fonts
- Responsive Design
- Progressive Enhancement

## 📚 Дополнительные ресурсы

- [Документация по API Эдиторум](https://academuspub.com/en/nauka/) - посмотрите Network tab для примеров запросов
- [MDN Web Docs](https://developer.mozilla.org/) - справочник по веб-технологиям
- [Can I Use](https://caniuse.com/) - проверка поддержки браузерами

---

Разработано с ❤️ для Academus Publishing


