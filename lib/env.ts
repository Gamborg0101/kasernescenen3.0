import { z } from 'zod';

z.string().parse('');

const envSchema = z.object({
  DATABASE_URL: z.string().min(1),
  UPSTASH_REDIS_REST_URL: z.url(),
  UPSTASH_REDIS_REST_TOKEN: z.string().min(1),
  AUTH_SECRET: z.string().min(1),
  AUTH_GOOGLE_ID: z.string().min(1),
  AUTH_GOOGLE_SECRET: z.string().min(1),
});

const env = envSchema.parse(process.env);

export default env;
