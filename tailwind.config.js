/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["*"],
  theme: {
    extend: {
      fontFamily:{
        comic: ['Comic Sans MS', 'cursive']
        },
    },
  },
  plugins: [
    require('tailwindcss-animated'),
  ],
}

