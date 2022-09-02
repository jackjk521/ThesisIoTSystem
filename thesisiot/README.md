Steps to set up the website

Install Docker and Docker extension in VSCODE
add the docker bin in your Environment PATH variable
Run docker-compose up on "docker-compose.yaml" on the gortas folder


Steps for laravel setup

git clone (link of the github repo)
mv .env.example .env
composer install
php artisan key:generate
php artisan migrate
composer require laravel/ui
php artisan ui react
npm install
npm run watch

Steps for starting up the mongodb server:
Edit the .env file 
serving the server.js
nodemon server.js



Files to look at:

userRoutes.js under routes folder
server.js under the root folder
LoginRegister.js under components