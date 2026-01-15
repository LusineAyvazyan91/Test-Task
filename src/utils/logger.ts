const isDevelopment = __DEV__;

export const logger = {
  error: (message: string, error?: unknown) => {
    if (isDevelopment) {
      console.error(message, error);
    } else {
      // In production, you could send to a logging service like Sentry
      // Example: Sentry.captureException(error, { extra: { message } });
    }
  },
  warn: (message: string, data?: unknown) => {
    if (isDevelopment) {
      console.warn(message, data);
    }
  },
  info: (message: string, data?: unknown) => {
    if (isDevelopment) {
      console.info(message, data);
    }
  },
};
