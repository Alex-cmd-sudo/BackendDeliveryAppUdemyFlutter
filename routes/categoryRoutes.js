const categoriesController = require('../controllers/categoriesController');
const passport = require('passport');

module.exports = (app) => {
    
    app.post('/api/categories/create', passport.authenticate('jwt', { session: false}), categoriesController.create);

}