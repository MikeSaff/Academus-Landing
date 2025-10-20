# Руководство по развертыванию Academus Publishing Landing

Подробное руководство по развертыванию лендинга на различных платформах.

## 📋 Содержание

- [Подготовка к развертыванию](#подготовка-к-развертыванию)
- [Netlify](#netlify)
- [Vercel](#vercel)
- [GitHub Pages](#github-pages)
- [Традиционный хостинг](#традиционный-хостинг)
- [Docker](#docker)
- [Настройка домена](#настройка-домена)
- [SSL сертификат](#ssl-сертификат)
- [Оптимизация производительности](#оптимизация-производительности)

---

## Подготовка к развертыванию

### 1. Проверьте файлы

Убедитесь, что все файлы на месте:
```
✓ index.html
✓ styles.css
✓ script.js
✓ config.js
✓ README.md
```

### 2. Настройте API (опционально)

Если у вас есть доступ к API Эдиторум, настройте `config.js`:

```javascript
const EDITORUM_API_CONFIG = {
    endpoint: 'https://your-api-endpoint.com/books',
    headers: {
        'Content-Type': 'application/json',
        // Добавьте авторизацию если нужно
    }
};
```

### 3. Протестируйте локально

```bash
# Python
python -m http.server 8000

# Node.js
npx http-server -p 8000

# PHP
php -S localhost:8000
```

Откройте: `http://localhost:8000`

---

## Netlify

### Метод 1: Drag & Drop (Самый простой)

1. Перейдите на [netlify.com](https://www.netlify.com/)
2. Зарегистрируйтесь или войдите
3. Перетащите папку проекта в область "Drop"
4. Готово! Ваш сайт будет доступен по URL вида `https://random-name.netlify.app`

### Метод 2: CLI

```bash
# Установите Netlify CLI
npm install -g netlify-cli

# Войдите в аккаунт
netlify login

# Разверните сайт
netlify deploy

# Для production
netlify deploy --prod
```

### Метод 3: Git интеграция

1. Загрузите код в GitHub/GitLab/Bitbucket
2. В Netlify: New site from Git
3. Выберите репозиторий
4. Build settings оставьте пустыми (статический сайт)
5. Deploy site

### Настройки Netlify

Создайте файл `netlify.toml`:

```toml
[build]
  publish = "."

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "no-referrer-when-downgrade"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

---

## Vercel

### Метод 1: CLI

```bash
# Установите Vercel CLI
npm i -g vercel

# Разверните
vercel

# Для production
vercel --prod
```

### Метод 2: Web интерфейс

1. Перейдите на [vercel.com](https://vercel.com/)
2. Import Git Repository
3. Выберите ваш репозиторий
4. Deploy

### Настройки Vercel

Создайте файл `vercel.json`:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "*.html",
      "use": "@vercel/static"
    },
    {
      "src": "*.css",
      "use": "@vercel/static"
    },
    {
      "src": "*.js",
      "use": "@vercel/static"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/$1"
    }
  ]
}
```

---

## GitHub Pages

### Шаг 1: Создайте репозиторий

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/username/academus-landing.git
git push -u origin main
```

### Шаг 2: Настройте GitHub Pages

1. Перейдите в Settings → Pages
2. Source: выберите ветку `main`
3. Folder: `/ (root)`
4. Save

Сайт будет доступен по адресу:
```
https://username.github.io/academus-landing/
```

### Пользовательский домен

1. В корне проекта создайте файл `CNAME`:
   ```
   academuspub.com
   ```
2. В настройках домена добавьте A-записи:
   ```
   185.199.108.153
   185.199.109.153
   185.199.110.153
   185.199.111.153
   ```

---

## Традиционный хостинг

### FTP/SFTP загрузка

1. **Подключитесь к хостингу:**
   ```bash
   # Через FileZilla или командную строку
   sftp user@your-server.com
   ```

2. **Загрузите файлы:**
   - Загрузите все файлы в директорию `public_html` или `www`
   - Убедитесь, что `index.html` в корне

3. **Проверьте права доступа:**
   ```bash
   chmod 644 *.html *.css *.js
   chmod 755 .
   ```

### cPanel

1. Войдите в cPanel
2. File Manager → public_html
3. Upload → выберите все файлы
4. Готово!

### Настройка .htaccess (для Apache)

Создайте файл `.htaccess`:

```apache
# Включить сжатие
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/html text/css text/javascript application/javascript
</IfModule>

# Кэширование
<IfModule mod_expires.c>
    ExpiresActive On
    ExpiresByType text/css "access plus 1 year"
    ExpiresByType application/javascript "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
</IfModule>

# HTTPS редирект
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
```

---

## Docker

### Dockerfile

Создайте `Dockerfile`:

```dockerfile
FROM nginx:alpine

# Копируем файлы
COPY . /usr/share/nginx/html

# Настройка nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Открываем порт
EXPOSE 80

# Запуск
CMD ["nginx", "-g", "daemon off;"]
```

### nginx.conf

```nginx
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Кэширование статики
    location ~* \.(css|js|jpg|jpeg|png|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

### Сборка и запуск

```bash
# Сборка
docker build -t academus-landing .

# Запуск
docker run -d -p 80:80 academus-landing

# С docker-compose
docker-compose up -d
```

### docker-compose.yml

```yaml
version: '3.8'

services:
  web:
    build: .
    ports:
      - "80:80"
    restart: unless-stopped
```

---

## Настройка домена

### DNS записи

#### A-запись (для root домена)
```
Тип: A
Имя: @
Значение: IP_адрес_сервера
TTL: 3600
```

#### CNAME (для www)
```
Тип: CNAME
Имя: www
Значение: academuspub.com
TTL: 3600
```

### Проверка DNS

```bash
# Linux/Mac
nslookup academuspub.com
dig academuspub.com

# Windows
nslookup academuspub.com
```

---

## SSL сертификат

### Let's Encrypt (бесплатный)

#### Netlify/Vercel
- SSL включается автоматически ✓

#### cPanel
1. Перейдите в SSL/TLS Status
2. Run AutoSSL

#### Certbot (ручная установка)
```bash
# Установка
sudo apt-get update
sudo apt-get install certbot python3-certbot-nginx

# Получение сертификата
sudo certbot --nginx -d academuspub.com -d www.academuspub.com

# Автопродление
sudo certbot renew --dry-run
```

---

## Оптимизация производительности

### 1. Минификация файлов

```bash
# Установите minify
npm install -g minify

# Минифицируйте CSS
minify styles.css > styles.min.css

# Минифицируйте JS
minify script.js > script.min.js
```

Обновите пути в `index.html`:
```html
<link rel="stylesheet" href="styles.min.css">
<script src="script.min.js"></script>
```

### 2. Оптимизация изображений

```bash
# Установите imagemin
npm install -g imagemin-cli

# Оптимизируйте изображения
imagemin images/* --out-dir=images/optimized
```

### 3. CDN для библиотек

Если используете библиотеки, подключайте через CDN:
```html
<!-- Google Fonts через CDN -->
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
```

### 4. Preload критичных ресурсов

```html
<link rel="preload" href="styles.css" as="style">
<link rel="preload" href="script.js" as="script">
```

### 5. Lazy loading

Уже реализовано в `script.js` для изображений!

---

## Проверка после развертывания

### Чек-лист

- [ ] Сайт открывается по URL
- [ ] Все секции отображаются корректно
- [ ] Карусель книг работает
- [ ] Мобильная версия выглядит хорошо
- [ ] Все ссылки работают
- [ ] Контакты кликабельны
- [ ] HTTPS работает (замок в браузере)
- [ ] Нет ошибок в консоли браузера

### Инструменты тестирования

1. **Google PageSpeed Insights**
   - https://pagespeed.web.dev/

2. **GTmetrix**
   - https://gtmetrix.com/

3. **WebPageTest**
   - https://www.webpagetest.org/

4. **Mobile-Friendly Test**
   - https://search.google.com/test/mobile-friendly

---

## Поддержка и обновления

### Обновление контента

1. Внесите изменения в файлы
2. Загрузите на хостинг (FTP/Git push)
3. Очистите кэш CDN (если используется)
4. Проверьте изменения

### Мониторинг

Рекомендуемые сервисы:
- **Uptime Robot** - мониторинг доступности
- **Google Analytics** - аналитика посещений
- **Yandex Metrika** - российская альтернатива

---

## Помощь и поддержка

Если возникли проблемы:

1. Проверьте консоль браузера (F12)
2. Посмотрите логи сервера
3. Проверьте DNS записи
4. Убедитесь, что все файлы загружены

**Контакты:**
- Email: info@academuspub.com
- Телефон: +7 (499) 350-54-81

---

**Последнее обновление:** 17 октября 2025


