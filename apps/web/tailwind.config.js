/** @type {import('tailwindcss').Config} */
const flowbite = require('flowbite-react/tailwind');
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}', flowbite.content()],
  theme: {
    fontFamily: {
      body: ['Poppins', 'sans-serif', 'system-ui'],
      sans: ['Poppins', 'sans-serif', 'system-ui'],
    },
    extend: {},
  },
  plugins: [flowbite.plugin()],
};
