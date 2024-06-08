# Food_Supply_Server

## Installation:

1. Clone the repository.
2. Install dependencies using `npm install`.
3. Rename `.env.example` to `.env`.
4. Run the server using `npm run dev`.

## Configuration:

- Environment Variables:
  - `PORT`: Port number the server listens on. Default: 3000
  - `MONGODB_URI`: URI for MongoDB database.
  - `JWT_ACCESS_SECRET`: Secret key for JWT access token generation.
  - `JWT_refresh_SECRET`: Secret key for JWT refresh token generation.
  - `DEFAULT_PASS`: Password.
  - `BCRYPT_SALT_ROUNDS`: To generate JWT token.

## Usage:

- API Endpoints:

  - POST `/api/v1/auth/login`

    - Description: Authenticates user and returns a JWT token.
    - Request:
      ```json
      {
        "userId": "1234",
        "password": "password"
      }
      ```
    - Response:
      ```json
      {
        "success": true,
        "message": "User registered successfully"
      }
      ```

## Dependencies:

- `bcrypt`: Library for hashing passwords.
- `cors`: Express middleware for enabling CORS.
- `dotenv`: Loads environment variables from .env file.
- `express`: Web framework for Node.js.
- `jsonwebtoken`: Library for generating and verifying JWT tokens.
- `mongodb`: MongoDB driver for Node.js.
- `mongoose`: Data model.
- `nodemon`: Utility for automatically restarting the server during development.
