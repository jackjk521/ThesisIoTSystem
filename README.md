
## Steps for laravel/reactjs setup  

#### git clone https://github.com/jackjk521/thesisiot
#### mv .env.example .env 
#### composer install
#### php artisan key:generate
#### php artisan ui react
#### npm install
#### npm run watch

## Steps for starting up the mongodb server:
#### Edit the .env file > DB_ACCESS = (mongodb connection URL)

## To run the application
#### Open 3 split terminal:
#### nodemon resources\js\server.js  
#### npm run watch
#### php artisan serve


## Files to look at:

## userRoutes.js under resources/js/routes
#### acts as a controller and api.php in laravel setup
## server.js under the root folder
#### mongodb connection and collection creation
## LoginRegister.js under resources/js/components
#### sliding login and registration page
## Protected.js under resources/js/components
#### dashboard for verified users
## passport.js under resources/js
#### contains the login on passportjs and strategy for authentication 
## userModel.js under app/Models
#### contains the userSchema


composer fixes:
update/install --ignore-platform-reqs 