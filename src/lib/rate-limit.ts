export class RateLimiterError extends Error {
  public retryAfter: number

  constructor(message: string, retryAfter: number) {
    super(message)
    this.retryAfter = retryAfter
  }
}

interface RateLimiterOptions {
  maxRequests: number
  interval: number
}

export class RateLimiter {
  private requests: number[] = []
  private interval: number
  private maxRequests: number

  constructor(options: RateLimiterOptions) {
    this.interval = options.interval
    this.maxRequests = options.maxRequests
  }

  public async limit(): Promise<void> {
    const now = Date.now()
    this.requests = this.requests.filter(
      (timestamp) => timestamp > now - this.interval
    )
    if (this.requests.length >= this.maxRequests) {
      /* @ts-expect-error */
      const timeToWait = this.interval - (now - this.requests[0])
      throw new RateLimiterError(
        `Rate limit exceeded. Try again later.`,
        timeToWait
      )
    }
    this.requests.push(now)
  }
}
