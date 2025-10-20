# 🚀 Развертывание на GitHub Pages

## Автоматический способ (РЕКОМЕНДУЕТСЯ)

### Шаг 1: Запустите скрипт
Дважды кликните на файл `setup-github.bat`

### Шаг 2: Создайте репозиторий на GitHub
Когда скрипт попросит, откройте:
👉 https://github.com/new

Заполните:
- **Repository name**: `Academus-Landing`
- **Description**: `Landing page for Academus Publishing`
- **Visibility**: ✅ Public (для бесплатного GitHub Pages)
- ❌ НЕ добавляйте README, .gitignore или license

Нажмите **"Create repository"**

### Шаг 3: Вернитесь к скрипту
Нажмите любую клавишу для продолжения

### Шаг 4: Авторизация (если потребуется)
Если Git попросит авторизацию:
- Откроется браузер для входа в GitHub
- Или введите ваш Personal Access Token

**Получить токен:**
1. https://github.com/settings/tokens
2. "Generate new token (classic)"
3. Выберите срок действия
4. Отметьте: `repo` (полный доступ)
5. Нажмите "Generate token"
6. Скопируйте токен (он больше не отобразится!)
7. Используйте как пароль при git push

### Шаг 5: Включите GitHub Pages
После успешной загрузки, откройте:
👉 https://github.com/MikeSaff/Academus-Landing/settings/pages

Настройте:
1. **Source**: Deploy from a branch
2. **Branch**: `main`
3. **Folder**: `/ (root)`
4. Нажмите **Save**

### ✅ Готово!
Сайт будет доступен по адресу:
🌐 **https://mikesaff.github.io/Academus-Landing/**

⏱ Первое развертывание может занять 2-5 минут

---

## Ручной способ

### 1. Инициализация Git
```bash
cd C:\Projects\Academus-Landing
git init
git add .
git commit -m "Initial commit: Academus Publishing landing page"
```

### 2. Создание репозитория
- Перейдите на https://github.com/new
- Создайте репозиторий `Academus-Landing` (Public)

### 3. Загрузка кода
```bash
git remote add origin https://github.com/MikeSaff/Academus-Landing.git
git branch -M main
git push -u origin main
```

### 4. Настройка GitHub Pages
- Откройте Settings → Pages
- Выберите Source: Deploy from a branch
- Branch: main, Folder: / (root)
- Save

---

## 🔧 Настройка Git (если еще не настроен)

```bash
# Укажите ваше имя
git config --global user.name "MikeSaff"

# Укажите ваш email GitHub
git config --global user.email "your-email@example.com"
```

---

## 📝 Обновление сайта (после изменений)

```bash
git add .
git commit -m "Описание изменений"
git push
```

Сайт автоматически обновится через 1-2 минуты.

---

## ⚠️ Возможные проблемы

### Проблема: "remote origin already exists"
```bash
git remote remove origin
git remote add origin https://github.com/MikeSaff/Academus-Landing.git
```

### Проблема: "Authentication failed"
Используйте Personal Access Token вместо пароля:
1. https://github.com/settings/tokens → Generate new token
2. Выберите `repo` scope
3. Используйте токен как пароль

### Проблема: "Git not found"
Установите Git: https://git-scm.com/download/win

---

## 🎉 После развертывания

Ваш сайт будет доступен по адресу:
**https://mikesaff.github.io/Academus-Landing/**

Поделитесь этой ссылкой с кем угодно! 🌍

---

## 📊 Проверка статуса развертывания

Откройте:
https://github.com/MikeSaff/Academus-Landing/actions

Здесь вы увидите процесс развертывания (GitHub Actions).
Зеленая галочка ✅ = сайт успешно опубликован!

---

## 🌐 Кастомный домен (опционально)

Если у вас есть свой домен:
1. Settings → Pages → Custom domain
2. Введите ваш домен (например: academuspub.com)
3. Настройте DNS записи у регистратора домена
4. ✅ Enforce HTTPS

Подробнее: https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site

