export default () => ({
  server: {
    port: parseInt(process.env.SERVER_PORT, 10) || 4000,
  },
  database: {
    type: process.env.DB_TYPE,
    port: process.env.DB_PORT,
    writeHost: process.env.DB_PROD_WRITE_HOST,
    readHost: process.env.DB_PROD_READ_HOST,
    password: process.env.DB_PASSWORD,
    readPassword: process.env.DB_READ_ONLY_PASSWORD,
    username: process.env.DB_USERNAME,
    readUsername: process.env.DB_READ_ONLY_USERNAME,
    db: process.env.DB_DB,
  },
  redis: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  },
  jwt: {
    secret: process.env.AUTH_JWT_SECRET,
  },
});
