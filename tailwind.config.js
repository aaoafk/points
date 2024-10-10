module.exports = {
  content: [
    './app/views/**/*.html.erb',
    './app/helpers/**/*.rb',
    './app/assets/stylesheets/**/*.css',
    './app/javascript/**/*.js'
  ],
  theme: {
    extend: {
      colors: {
        'game-blue': '#4EAEFF',
        'game-yellow': '#FFD800',
        'game-green': '#44FF44',
        'game-red': '#FF5555',
        'game-purple': '#B14EFF',
      },
      fontFamily: {
        'honk': ['Honk', 'cursive'],
        'bungee': ['"Bungee Spice"', 'cursive'],
      },
    },
  },
  plugins: [],
}
