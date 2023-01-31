import * as joi from 'joi';

export const configurationSchema = joi.object({
  NODE_DEV: joi.string().required().default('dev'),
  PORT: joi.number().required().default(3000),
  DB_HOST: joi.string().required(),
  DB_NAME: joi.string().required(),
  DB_USER: joi.string().required(),
  DB_PASSWORD: joi.string().required(),
  DB_PORT: joi.number().default(5432),
  DB_AUTOLOAD: joi.boolean().default(false),
  DB_SYNCRO: joi.boolean().default(false),
  JWT_SECRET: joi.string().required(),
  JWT_EXPIRES: joi.string().required().default('2d'),
});
