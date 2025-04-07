# 📘 Landmark API Documentation

Базовый URL: `http://localhost:3000/landmarks`

## 🔹 GET /landmarks

Получить список всех достопримечательностей.

**Пример:**

```http
GET /landmarks
```

**Ответ:**

```json
[
  {
    "id": "1",
    "name": "Кёльнский собор",
    "description": "Готический собор в Германии",
    "photoUrl": "https://example.com/image.jpg",
    "location": "Кёльн, Германия",
    "latitude": 50.9413,
    "longitude": 6.9583,
    "rating": 5,
    "status": "в планах",
    "dateAdded": "2025-04-07T12:34:56.000Z"
  }
]
```

## 🔹 GET /landmarks/:id

Получить достопримечательность по ID.

```http
GET /landmarks/1
```

## 🔹 POST /landmarks

Создать новую достопримечательность.

**Тело запроса:**

```json
{
  "name": "Новая точка",
  "description": "Краткое описание",
  "photoUrl": "https://...",
  "location": "Город, страна",
  "latitude": 12.34,
  "longitude": 56.78,
  "rating": 4,
  "status": "в планах",
  "dateAdded": "2025-04-07T00:00:00.000Z"
}
```

## 🔹 PUT /landmarks/:id

Обновить существующую достопримечательность.

```http
PUT /landmarks/1
```

(Тело запроса аналогично POST)

## 🔹 DELETE /landmarks/:id

Удалить достопримечательность по ID.

```http
DELETE /landmarks/1
```

---

## ✅ Поля объекта Landmark

| Поле          | Тип            | Обязателен | Описание                   |
| ------------- | -------------- | ---------- | -------------------------- |
| `name`        | `string`       | ✅         | Название                   |
| `description` | `string`       | ✅         | Описание                   |
| `photoUrl`    | `string`       | ✅         | Ссылка на фото             |
| `location`    | `string`       | ✅         | Местоположение             |
| `latitude`    | `number`       | ✅         | Широта                     |
| `longitude`   | `number`       | ✅         | Долгота                    |
| `rating`      | `number` (1-5) | ✅         | Рейтинг                    |
| `status`      | `string`       | ✅         | `в планах` или `осмотрена` |
| `dateAdded`   | `string` (ISO) | ✅         | Дата добавления            |

---

## 🚀 Как запустить проект

1. Установите зависимости:

```bash
npm install
```

2. Запустите фронтенд и JSON-сервер для моков API:

```bash
npm run dev
```

- Фронтенд будет доступен на `http://localhost:5173`
- REST API будет доступен на `http://localhost:3000/landmarks`

---

## 🛠️ Стек технологий

- **React** + **TypeScript** — фронтенд
- **Vite** — сборщик проекта
- **Gravity UI** — UI-компоненты от Yandex
- **json-server** — мок-сервер для API
- **SCSS-модули** — стилизация компонентов
