# backend

Aplikacja serwerowa zarządzająca zadaniami użytkowników w bazie danych. REST API udostępniające endpointy do obsługi operacji CRUD.

## Stos technologiczny

- [mongodb](https://www.mongodb.com/)
- [node.js](https://nodejs.org/en/)
- [express.js](https://expressjs.com/)
- [mongoose.js](https://mongoosejs.com/)
- [typescript](https://www.typescriptlang.org/)

## Obsługa endpointów

Legenda:
- `deviceId` - unikalne ID urządzenia, dla którego zapisywane są zadania, napis
- `taskId` - unikalne ID zadania, napis

Parametry zadania:
- `title` - tytuł zadania (napis, wymagane)
- `details` - treść zadania (napis, opcjonalne)
- `progressStatus` - informacja o tym, czy zadanie jest w trakcie wykonywania (wartość logiczna, wymagane)
- `priority` - priorytet zadania (napis, wymagane)
- `deadlineDate` - termin wykonania zadania (data, opcjonalne)

Dostępne endpointy:

- Zapytanie metodą *GET* na adres `/api/devices/:deviceId/tasks` zwraca listę zadań dla urządzenia o podanym `deviceId`.
- Zapytanie metodą *GET* na adres `/api/devices/:deviceId/tasks/:taskId` zwraca dane zadania o podanym `taskId` dla urządzenia o podanym `deviceId`.
- Zapytanie metodą *POST* na adres `/api/devices/:deviceId/tasks` tworzy zadanie o parametrach podanych w ciele zapytania dla urządzenia o podanym `deviceId`.
- Zapytanie metodą *PATCH* na adres `/api/devices/:deviceId/tasks/:taskId` aktualizuje parametry zadania, wartościami przekazanymi w ciele zapytania, dla urządzenia o podanym `deviceId`.
- Zapytanie metodą *PATCH* na adres `/api/devices/:deviceId/tasks/:taskId/finished` aktualizuje parametr `progressStatus` zadania o podanym `taskId` dla urządzenia o podanym `deviceId` wartością przekazaną pod kluczem `isFinished` w ciele zapytania.
- Zapytanie metodą *DELETE* na adres `/api/devices/:deviceId/tasks/:taskId` usuwa zadanie o podanym `taskId` z urządzenia o podanym `deviceId`.

## Przygotowanie środowiska deweloperskiego

1. Instalacja *node.js* na komputerze
2. Wykonanie polecenia `npm install -g concurrently` w dowolnym katalogu, jako administrator
3. Wykonanie polecenia `npm install` w głównym katalogu aplikacji backendowej
4. Skopiowanie pliku `src/config/config.example.ts` do tego samego katalogu, nadając mu nazwę `config.ts` (oba pliki powinny być w tym samym katalogu)
5. W nowo utworzonym pliku `src/config/config.ts` podmiana `<password>` na klucz dostępu do bazy danych, przekazany innym kanałem

## Uruchamianie 

Wykonanie polecenia `npm run watch` w tym katalogu.
