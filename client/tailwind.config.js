/** @type {import('tailwindcss').Config} */
const flowbite = require("flowbite");//flowbite config
export default {
  content: [
    "./index.html",
    
    "./src/**/*.{js,ts,jsx,tsx}",
      "./node_modules/flowbite-react/**/*.js",
    "node_modules/flowbite/**/*.js", // flowbite config
  ],
  theme: {
    extend: {},
    
  },
  plugins: [
  require("flowbite/plugin") // flowbite config
  ],
}


