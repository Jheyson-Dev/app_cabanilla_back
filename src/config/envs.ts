import 'dotenv/config';

import * as joi from 'joi';

interface EnvVars {
  PORT: number;
  JWT_SECRET: string;
}

const envsSchema = joi
  .object({
    PORT: joi.number().required(),
    JWT_SECRET: joi.string().required(),
  })
  .unknown(true);

const { value, error } = envsSchema.validate(process.env, {
  abortEarly: false,
});

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const envVars: EnvVars = value;

export const envs = {
  PORT: envVars.PORT,
  JWT_SECRET: envVars.JWT_SECRET,
};
