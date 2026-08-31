import { defineConfig } from 'i18next-cli';

export default defineConfig({
  locales: ['pl', 'en', 'ua'],
  extract: {
    input: 'src/**/*.{js,jsx,ts,tsx}',
    output: 'src/locales/{{language}}/{{namespace}}.json',
  },
});
