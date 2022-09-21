
Steps for laravel setup

git clone (link of the github repo)
mv .env.example .env
composer install
php artisan key:generate
php artisan ui:auth
php artisan migrate
composer require laravel/ui
php artisan ui react
npm install
npm run watch

Steps for starting up the mongodb server:
Edit the .env file 

Serving the server.js
nodemon server.js


 Open 3 terminal:
 nodemon resources\js\server.js  
 npm run watch
 php artisan serve


Files to look at:

userRoutes.js under routes folder
server.js under the root folder
LoginRegister.js under components