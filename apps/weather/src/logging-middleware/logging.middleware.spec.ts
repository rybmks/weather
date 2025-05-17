import { LoggingMiddleware } from './logging.middleware';

describe('LoggingMiddlewareMiddleware', () => {
  it('should be defined', () => {
    expect(new LoggingMiddleware()).toBeDefined();
  });
});
