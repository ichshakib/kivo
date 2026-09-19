import { createApp } from './app';
import { ENV } from './config/env';

const app = createApp();

app.listen(ENV.PORT, () => {
  console.log(`🚀 Kivo API server running on http://localhost:${ENV.PORT}`);
  console.log(`🔑 Google Auth Endpoint: http://localhost:${ENV.PORT}/api/auth/google`);
  console.log(`🩺 Health Check: http://localhost:${ENV.PORT}/api/health`);
});
