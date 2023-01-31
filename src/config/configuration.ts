export default () => ({
  app: {
    environment: process.env.NODE_DEV || 'dev',
    port: process.env.PORT || 3000,
  },
  database: {
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    auto: process.env.DB_AUTOLOAD || false,
    syncro: process.env.DB_SYNCRO || false,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expires: process.env.JWT_EXPIRES || '2d',
  },
});
