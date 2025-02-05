import { defineConfig } from 'cypress';

export default defineConfig({
  component: {
    devServer: {
      framework: 'next',
      bundler: 'webpack',
    },
    specPattern: '**/*.{spec,test}.{js,ts,jsx,tsx}',
    supportFile: 'cypress/support/component.tsx',
  },
});
