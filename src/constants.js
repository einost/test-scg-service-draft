module.exports = {
  HOST: process.env.HOST,
  PORT: process.env.PORT,
  DB_URL: process.env.DB_URL,
  SECRET_KEY: process.env.SECRET_KEY,
  TOKEN_EXPIRE: process.env.TOKEN_EXPIRE,
  REFRESH_TOKEN_EXPIRE: process.env.REFRESH_TOKEN_EXPIRE,
  MAIL: {
    FROM: '"test-scg-service" <noreply@test-scg-servce.co.th>'
  }
}
