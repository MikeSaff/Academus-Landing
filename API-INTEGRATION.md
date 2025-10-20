# Руководство по интеграции API Эдиторум

Подробное руководство по интеграции API издательской системы Эдиторум для отображения книг на лендинге.

## 📋 Содержание

- [Обзор](#обзор)
- [Быстрый старт](#быстрый-старт)
- [Структура конфигурации](#структура-конфигурации)
- [Примеры интеграции](#примеры-интеграции)
- [Обработка ответов API](#обработка-ответов-api)
- [Обработка ошибок](#обработка-ошибок)
- [CORS и безопасность](#cors-и-безопасность)
- [Тестирование](#тестирование)
- [FAQ](#faq)

---

## Обзор

Лендинг Academus Publishing поддерживает динамическую загрузку книг через API Эдиторум. 
По умолчанию используются тестовые данные, но вы можете легко подключить реальный API.

### Возможности

- ✅ Автоматическая загрузка книг из API
- ✅ Кэширование для производительности
- ✅ Fallback на тестовые данные при ошибках
- ✅ Поддержка различных форматов ответов
- ✅ Обработка изображений обложек
- ✅ Адаптация под различные структуры API

---

## Быстрый старт

### Шаг 1: Получите доступ к API

Обратитесь в техподдержку Эдиторум для получения:
- URL endpoint для API
- API ключ (если требуется)
- Документацию по структуре ответов

### Шаг 2: Откройте config.js

Найдите закомментированный блок `EDITORUM_API_CONFIG`:

```javascript
/*
const EDITORUM_API_CONFIG = {
    endpoint: 'YOUR_API_ENDPOINT_HERE',
    headers: {
        'Content-Type': 'application/json',
    }
};
*/
```

### Шаг 3: Раскомментируйте и настройте

```javascript
const EDITORUM_API_CONFIG = {
    endpoint: 'https://api.editorum.ru/v1/books',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer YOUR_API_KEY_HERE'
    }
};
```

### Шаг 4: Тестируйте

```bash
# Запустите локальный сервер
python -m http.server 8000

# Откройте в браузере
# http://localhost:8000

# Проверьте консоль браузера (F12)
# Должны увидеть: "API integration: Configured"
```

---

## Структура конфигурации

### Базовая конфигурация

```javascript
const EDITORUM_API_CONFIG = {
    // Обязательное поле: URL endpoint
    endpoint: 'https://api.example.com/books',
    
    // HTTP заголовки
    headers: {
        'Content-Type': 'application/json'
    }
};
```

### Расширенная конфигурация

```javascript
const EDITORUM_API_CONFIG = {
    // API endpoint
    endpoint: 'https://api.editorum.ru/v1/books',
    
    // Заголовки с авторизацией
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer YOUR_TOKEN',
        'X-API-Key': 'YOUR_API_KEY',
        'Accept-Language': 'en'
    },
    
    // Дополнительные параметры (опционально)
    params: {
        limit: 20,
        offset: 0,
        language: 'en',
        status: 'published',
        publisher: 'academus'
    },
    
    // Настройки запроса (опционально)
    options: {
        method: 'GET',
        mode: 'cors',
        cache: 'default',
        credentials: 'same-origin'
    }
};
```

---

## Примеры интеграции

### Пример 1: Простой REST API

```javascript
// config.js
const EDITORUM_API_CONFIG = {
    endpoint: 'https://academuspub.com/api/books',
    headers: {
        'Content-Type': 'application/json'
    }
};
```

Ожидаемый ответ:
```json
[
    {
        "id": 1,
        "title": "Book Title",
        "author": "Author Name",
        "cover_url": "https://example.com/cover.jpg",
        "url": "https://example.com/book/1"
    }
]
```

### Пример 2: API с авторизацией

```javascript
// config.js
const EDITORUM_API_CONFIG = {
    endpoint: 'https://api.editorum.ru/v1/publications',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
    }
};
```

### Пример 3: API с параметрами

```javascript
// config.js
const EDITORUM_API_CONFIG = {
    endpoint: 'https://api.editorum.ru/v1/books?publisher=academus&status=published&limit=20',
    headers: {
        'Content-Type': 'application/json',
        'X-API-Key': 'your-api-key-here'
    }
};
```

### Пример 4: GraphQL API

Если API использует GraphQL, можно адаптировать:

```javascript
// config.js
const EDITORUM_API_CONFIG = {
    endpoint: 'https://api.editorum.ru/graphql',
    headers: {
        'Content-Type': 'application/json'
    },
    query: `
        query {
            books(publisher: "academus") {
                id
                title
                author
                coverUrl
                url
            }
        }
    `
};
```

И обновить `script.js`:
```javascript
// script.js - в методе loadBooks()
const response = await fetch(EDITORUM_API_CONFIG.endpoint, {
    method: 'POST',
    headers: EDITORUM_API_CONFIG.headers,
    body: JSON.stringify({
        query: EDITORUM_API_CONFIG.query
    })
});
```

---

## Обработка ответов API

### Вариант 1: Прямой массив

API возвращает массив книг:

```json
[
    { "id": 1, "title": "Book 1", ... },
    { "id": 2, "title": "Book 2", ... }
]
```

**Парсер в script.js:**
```javascript
parseAPIResponse(data) {
    return data.map(book => ({
        id: book.id,
        title: book.title,
        author: book.author,
        cover: book.cover_url,
        url: book.url
    }));
}
```

### Вариант 2: Объект с массивом

API возвращает объект:

```json
{
    "books": [...],
    "total": 50,
    "page": 1
}
```

**Парсер в script.js:**
```javascript
parseAPIResponse(data) {
    if (data.books && Array.isArray(data.books)) {
        return data.books.map(book => ({
            id: book.id,
            title: book.title,
            author: book.author,
            cover: book.cover_url,
            url: book.url
        }));
    }
    return [];
}
```

### Вариант 3: Вложенная структура

API возвращает сложную структуру:

```json
{
    "data": {
        "items": [...],
        "meta": {
            "total": 50,
            "page": 1
        }
    }
}
```

**Парсер в script.js:**
```javascript
parseAPIResponse(data) {
    const items = data?.data?.items || [];
    return items.map(book => ({
        id: book.id,
        title: book.title,
        author: book.author,
        cover: book.coverImage || book.thumbnail,
        url: book.link || book.url
    }));
}
```

### Вариант 4: Различные названия полей

Если API использует другие названия:

```json
{
    "publications": [
        {
            "publicationId": 1,
            "name": "Book Title",
            "authors": ["Author 1", "Author 2"],
            "imageUrl": "...",
            "detailsUrl": "..."
        }
    ]
}
```

**Парсер в script.js:**
```javascript
parseAPIResponse(data) {
    const pubs = data.publications || [];
    return pubs.map(pub => ({
        id: pub.publicationId,
        title: pub.name,
        author: pub.authors.join(', '),
        cover: pub.imageUrl,
        url: pub.detailsUrl
    }));
}
```

---

## Обработка ошибок

### Автоматический fallback

Лендинг автоматически использует тестовые данные при ошибках API:

```javascript
// script.js - уже реализовано
try {
    const response = await fetch(EDITORUM_API_CONFIG.endpoint, {
        headers: EDITORUM_API_CONFIG.headers
    });
    
    if (!response.ok) {
        throw new Error('API request failed');
    }
    
    const data = await response.json();
    this.books = this.parseAPIResponse(data);
} catch (error) {
    console.error('Error loading books:', error);
    console.log('Using mock data instead');
    this.books = this.getMockBooks(); // Fallback
}
```

### Логирование

Проверьте консоль браузера для отладки:

```javascript
// Успешная загрузка
console.log('Books loaded from API:', books.length);

// Ошибка
console.error('Error loading books:', error);
console.log('Using mock data instead');
```

### Типичные ошибки

**404 Not Found**
```
Error: API request failed
Причина: Неверный endpoint URL
Решение: Проверьте URL в config.js
```

**401 Unauthorized**
```
Error: API request failed
Причина: Неверный API ключ или токен
Решение: Проверьте авторизацию в headers
```

**CORS Error**
```
Error: CORS policy blocked
Причина: API не разрешает запросы с вашего домена
Решение: Настройте CORS на сервере или используйте прокси
```

---

## CORS и безопасность

### Проблема CORS

Если видите ошибку:
```
Access to fetch at '...' from origin '...' has been blocked by CORS policy
```

### Решение 1: Настройка CORS на сервере

Попросите администратора API добавить заголовки:
```
Access-Control-Allow-Origin: https://yoursite.com
Access-Control-Allow-Methods: GET, POST, OPTIONS
Access-Control-Allow-Headers: Content-Type, Authorization
```

### Решение 2: Прокси-сервер

Создайте серверный endpoint, который делает запрос к API:

```javascript
// backend/proxy.js (Node.js пример)
const express = require('express');
const fetch = require('node-fetch');
const app = express();

app.get('/api/books', async (req, res) => {
    try {
        const response = await fetch('https://api.editorum.ru/v1/books', {
            headers: {
                'Authorization': 'Bearer YOUR_API_KEY'
            }
        });
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch books' });
    }
});

app.listen(3000);
```

Обновите config.js:
```javascript
const EDITORUM_API_CONFIG = {
    endpoint: '/api/books', // Относительный путь
    headers: {
        'Content-Type': 'application/json'
    }
};
```

### Безопасность API ключей

⚠️ **Важно:** Не храните API ключи в frontend коде!

**Плохо:**
```javascript
// config.js - виден всем!
const EDITORUM_API_CONFIG = {
    headers: {
        'Authorization': 'Bearer secret-key-12345'
    }
};
```

**Хорошо:**
```javascript
// Используйте серверный прокси
// API ключ хранится на сервере, недоступен клиентам
```

---

## Тестирование

### 1. Проверка endpoint

```bash
# curl
curl -X GET "https://api.editorum.ru/v1/books" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN"

# или через Postman
```

### 2. Проверка CORS

```javascript
// В консоли браузера
fetch('https://api.editorum.ru/v1/books')
  .then(r => r.json())
  .then(d => console.log(d))
  .catch(e => console.error(e));
```

### 3. Мониторинг запросов

1. Откройте DevTools (F12)
2. Перейдите на вкладку Network
3. Обновите страницу
4. Найдите запрос к API
5. Проверьте:
   - Status code (должен быть 200)
   - Response (структуру данных)
   - Headers (CORS заголовки)

### 4. Проверка парсинга

Добавьте временное логирование:

```javascript
// script.js - в методе parseAPIResponse
parseAPIResponse(data) {
    console.log('Raw API response:', data);
    
    const parsed = data.map(book => ({
        id: book.id,
        title: book.title,
        author: book.author,
        cover: book.cover_url,
        url: book.url
    }));
    
    console.log('Parsed books:', parsed);
    return parsed;
}
```

---

## FAQ

### Как узнать структуру ответа API?

1. Откройте https://academuspub.com/en/nauka/
2. Откройте DevTools (F12) → Network
3. Обновите страницу
4. Найдите запросы к API
5. Изучите Response

### Можно ли использовать несколько API?

Да! Модифицируйте `loadBooks()`:

```javascript
async loadBooks() {
    const [api1Books, api2Books] = await Promise.all([
        this.fetchFromAPI1(),
        this.fetchFromAPI2()
    ]);
    this.books = [...api1Books, ...api2Books];
    this.renderBooks();
}
```

### Как добавить пагинацию?

```javascript
// config.js
const EDITORUM_API_CONFIG = {
    endpoint: 'https://api.editorum.ru/v1/books',
    params: {
        page: 1,
        limit: 20
    }
};

// script.js - добавьте метод
async loadMoreBooks() {
    currentPage++;
    const url = `${EDITORUM_API_CONFIG.endpoint}?page=${currentPage}&limit=20`;
    // ... fetch and append
}
```

### Как обновлять книги в реальном времени?

```javascript
// Обновление каждые 5 минут
setInterval(() => {
    carousel.loadBooks();
}, 5 * 60 * 1000);
```

### Как добавить фильтры?

```javascript
// config.js
const EDITORUM_API_CONFIG = {
    endpoint: 'https://api.editorum.ru/v1/books',
    filters: {
        category: 'science',
        language: 'en',
        year: 2024
    }
};
```

---

## Поддержка

Если возникли проблемы с интеграцией API:

1. **Проверьте консоль браузера** - там будут логи ошибок
2. **Проверьте Network tab** - увидите фактические запросы
3. **Обратитесь в поддержку Эдиторум** - info@academuspub.com
4. **Проверьте документацию API** - если доступна

---

**Последнее обновление:** 17 октября 2025

**Контакты для вопросов:**
- Email: info@academuspub.com
- Телефон: +7 (499) 350-54-81


