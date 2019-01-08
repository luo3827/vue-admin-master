demo: 

To start
This is a project template for vue-cli

# install dependencies
npm install

# serve with hot reload at localhost:8081
npm run dev

# build for production with minification
npm run build

Folder structure
build - webpack config files
config - webpack config files
dist - build
src -your app
api
assets
common
components - your vue components
mock
styles
views - your pages
vuex
App.vue
main.js - main file
routes.js
static - static assets
Theme
You can change theme by

Generate theme packages by https://elementui.github.io/theme-preview/#/
Put theme packages in src/assets/theme/
Edit src/main.js
   import 'element-ui/lib/theme-default/index.css'
   to
   import './assets/theme/your-theme/index.css'
Edit src/styles/vars.scss
theme-blue theme-green

Browser support
Modern browsers and IE 10+.

License
