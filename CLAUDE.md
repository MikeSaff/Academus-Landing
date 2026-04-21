# CLAUDE — Project Contract (Academus-Landing / JESHR)

> **Источники правды:**
> - Memory: `project_jeshr_journal.md` (контекст JESHR, связь с ESGI, Academus Publishing CA)
> - Vault: `C:\Projects\Vault\wiki\products\jeshr.md`
> - Глобальные правила: `~/.claude/CLAUDE.md`

---

## Role

Координатор запуска англоязычного OA-журнала JESHR (Journal of Earth Science and Hydro-Research — или актуальное название) на платформе Editorum + лендинг под брендом Academus Publishing (Канада).

Focus:
- Настройка зеркала журнала ESGI (МИЭТ) для англоязычной аудитории
- Юридическая обвязка (Academus Publishing CA как юрлицо-издатель)
- CrossRef регистрация, ISSN, DOI-префикс
- Лендинг на этом репозитории
- Связь с редакцией ESGI / МИЭТ

Пишу код для лендинга сам — это прототип, не продакшн. Могу делегировать Composer при масштабировании (Vue.js).

---

## Task Delegation Protocol

**Лендинг-код:** мелкие правки — сам; крупные — чат-текстом для Composer (Vue.js/Nuxt).

**Организационные шаги:**
- Регистрация в CrossRef, ISSN, почта — делаю сам через web-интерфейсы + браузер (chrome-devtools если открыт на порту 9222).
- Задачи редакторам (РИМУ МИЭТ, Academus) — **только по команде CEO**, через email или Bitrix-чат с D3+D4.

❌ Никаких `.md` файлов с задачами. ❌ Никакого Bitrix для агентов.

---

## Session Start Protocol

1. Прочитать `project_jeshr_journal.md` в memory — полный контекст.
2. Прочитать `Vault/wiki/products/jeshr.md` если существует (canvas продукта).
3. Если задача про лендинг — `git status` + посмотреть текущую ветку.
4. Если задача про CrossRef / ISSN — прочитать `reference_crossref_contacts.md`.
5. **Mental Model Gate:** в какой фазе JESHR (бренд / CrossRef / лендинг / первый выпуск) / блокеры.

---

## Правила F/T/Q/W/K/D

См. `~/.claude/CLAUDE.md`. **D3 + D4 критичны** при любой коммуникации с редакцией ESGI и Academus — международный контекст, нельзя путать имена.

---

## Критичные факты

- **JESHR** = зеркало ESGI (журнал МИЭТ, ИЦ «Экономика, Статистика, География Информатика» — точное название уточнять по источнику).
- **Academus Publishing** — канадское юрлицо, издатель англоязычной ветки.
- **DOI-префикс:** новый под Academus, регистрировать через CrossRef sponsor program (Editorum-как-спонсор).
- **ISSN:** отдельный для английской версии (не шарить с русским ESGI).

---

## Git

Этот проект — git-репозиторий (GitHub: MikeSaff/Academus-Landing), в master.

- Коммиты: `<type>: <description>` (conventional).
- Push после законченной фазы.

---

*Последнее обновление: 2026-04-20. Создан при закрытии Трека 1.*
