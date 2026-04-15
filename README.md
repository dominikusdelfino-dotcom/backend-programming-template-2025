# Backend Programming Template (2025)

## Development Setup

1. Fork and clone this repository to your local computer.
2. Open the project using VS Code.
3. Install the recommended VS Code extensions: `ESLint` and `Prettier`.
4. Copy and rename `.env.example` to `.env`. Open `.env` and change the database connection string.
5. Run `npm install` to install the project dependencies.
6. Run `npm run dev` to start the dev server.
7. Test the endpoints in the API client app.

## Add New API Endpoints

1. Create a new database schema in `./src/models`.
2. Create a new folder in `./src/api/components` (if needed). Remember to separate your codes to repositories, services, controllers, and routes.
3. Add the new route in `./src/api/routes.js`.
4. Test your new endpoints in the API client app.

## Gacha API Endpoints

### 1. Main Endpoint: Play Gacha
Melakukan undian gacha (Maksimal 5x sehari per user).
- URL: `/api/gacha`
- Method: `POST`
- Body (`application/json`):
  ```json
  { "user_id": "<user_object_id_disini>" }

### 2. Bonus: Get User Gacha History
Melihat riwayat gacha user beserta hadiahnya.
- URL: `/api/gacha/history?user_id=<user_object_id_disini>`
- Method: `GET`
- Body (`application/json`):
  ```json
  { "user_id": "<user_object_id_disini>" }

### 3. Bonus: Get Remaining Prize Quotas
Melihat sisa kuota masing-masing hadiah dalam 1 periode undian.
- URL: `/api/gacha/quotas`
- Method: `GET`
- Body (`application/json`):
  ```json
  { "user_id": "<user_object_id_disini>" }

### 4. Bonus: Get Winners List
Melihat daftar pemenang (nama user disamarkan).
- URL: `/api/gacha/winners`
- Method: `GET`
- Body (`application/json`):
  ```json
  { "user_id": "<user_object_id_disini>" }