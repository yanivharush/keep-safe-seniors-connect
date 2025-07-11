
import { CapacitorConfig } from '@capacitor/core';

const config: CapacitorConfig = {
  appId: 'app.lovable.d9286c4874dc41a38f1c1da9e30cd554',
  appName: 'לבריאות',
  webDir: 'dist',
  server: {
    url: 'https://d9286c48-74dc-41a3-8f1c-1da9e30cd554.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#3b82f6',
      showSpinner: false
    }
  }
};

export default config;
