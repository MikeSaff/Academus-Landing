# Как загрузить проект на GitHub

## Шаг 1: Установите Git
Скачайте с https://git-scm.com/download/win

## Шаг 2: Создайте репозиторий на GitHub
1. Зайдите на https://github.com
2. Нажмите "+" → "New repository"
3. Назовите репозиторий (например, "Academus-Landing")
4. НЕ добавляйте README, .gitignore или лицензию
5. Нажмите "Create repository"

## Шаг 3: Загрузите проект
Откройте PowerShell в папке проекта и выполните:

```powershell
# Инициализируйте Git репозиторий
git init

# Добавьте все файлы
git add .

# Создайте первый коммит
git commit -m "Initial commit: Academus Publishing landing page"

# Добавьте удаленный репозиторий (замените YOUR-USERNAME и YOUR-REPO)
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO.git

# Загрузите код на GitHub
git branch -M main
git push -u origin main
```

## Шаг 4: Поделитесь доступом
- Публичный репозиторий: просто дайте ссылку
- Приватный: Settings → Collaborators → Add people

## Готово!
Теперь другие могут:
- Склонировать проект: `git clone https://github.com/YOUR-USERNAME/YOUR-REPO.git`
- Редактировать и отправлять изменения

