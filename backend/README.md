# Constructor Backend - WebSocket Server

FastAPI сервер для совместного редактирования макетов через WebSocket.

## Установка

```bash
pip install -r requirements.txt
```

## Запуск

```bash
python main.py
```

Или через uvicorn:

```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

Сервер будет доступен по адресу `ws://localhost:8000`

## API

### WebSocket Endpoint

`ws://localhost:8000/ws/rooms/{room_id}?name={user_name}`

Подключение к комнате редактирования.

### HTTP Endpoints

- `GET /` - Информация о сервере
- `GET /rooms/{room_id}/info` - Информация о комнате

## Типы сообщений

### От клиента к серверу:

- `sync_state` - Синхронизация полного состояния проекта
- `update_block` - Обновление блока
- `add_block` - Добавление блока
- `delete_block` - Удаление блока
- `move_block` - Перемещение блока
- `update_theme` - Обновление темы
- `update_header` - Обновление заголовка
- `update_footer` - Обновление футера
- `cursor_update` - Обновление позиции курсора

### От сервера к клиенту:

- `join` - Пользователь подключился
- `leave` - Пользователь отключился
- `sync_state` - Синхронизация состояния проекта
- `users_list` - Список пользователей в комнате
- Все типы сообщений от клиента (ретранслируются другим пользователям)


