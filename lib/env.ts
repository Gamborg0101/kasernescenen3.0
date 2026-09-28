import { z } from 'zod';

console.log(process.env.AUTH_SECRET);

const envSchema = z.object({
  DATABASE_URL: z.string(),
  UPSTASH_REDIS_REST_URL: z.url(),
  UPSTASH_REDIS_REST_TOKEN: z.string(),
});

const envSchemaLocal = z.object({
  AUTH_SECRET: z.string(),
  AUTH_GOOGLE_ID: z.string(),
  AUTH_GOOGLE_SECRET: z.string(),
});

const envLocal = envSchemaLocal.parse(process.env.local);
const env = envSchema.parse(process.env);

console.log(process.env.local);

export { env, envLocal };
