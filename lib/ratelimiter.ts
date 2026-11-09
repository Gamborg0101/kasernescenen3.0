import 'server-only';
import { Ratelimit } from '@upstash/ratelimit';
import { redis } from './redis';

export const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, '10 s'),
  analytics: true,
  timeout: 5000,
});


export default async function ratelimitCheck(key: string): Promise<boolean> {

  try {
    const rateLimited = await ratelimit.limit(key);
    if (rateLimited.reason === 'timeout') console.error("Ratelimit timed out")
    return rateLimited.success;
  }
  catch (e) {
    console.error("Ratelimit unavailable", e);
    return true;
  }
}

