/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#!/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, *
  * etc. depending on your default view engine) your home page.              *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  // '/': {
  //   view: 'homepage'
  // }

  /***************************************************************************
  *                                                                          *
  * Custom routes here...                                                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the custom routes above, it   *
  * is matched against Sails route blueprints. See `config/blueprints.js`    *
  * for configuration options and examples.                                  *
  *                                                                          *
  ***************************************************************************/

  'post /activity/download': 'ActivityController.download',
  'post /activity/like': 'ActivityController.like',
  'post /activity/unlike': 'ActivityController.unlike',
  'post /activity/markwatch': 'ActivityController.markWatch',
  'post /activity/unmarkwatch': 'ActivityController.unmarkWatch',
  'post /activity/markwatched': 'ActivityController.markWatched',
  'post /activity/unmarkwatched': 'ActivityController.unmarkWatched',

  'post /collection/create': 'CollectionController.create',
  'post /collection/delete': 'CollectionController.delete',
  'post /collection/update': 'CollectionController.update',

  'post /franchise/create': 'FranchiseController.create',
  'post /franchise/delete': 'FranchiseController.delete',
  'post /franchise/update': 'FranchiseController.update',

  'get /proxy/listmovies': 'ProxyController.list_movies',
  'get /proxy/moviedetails': 'ProxyController.movie_details',
  'get /proxy/moviesuggestions': 'ProxyController.movie_suggestions',

  'post /review/create': 'ReviewController.create',
  'post /review/delete': 'ReviewController.delete',
  'post /review/update': 'ReviewController.update',

  'get /user/checkusername': 'UserController.checkUsername',
  'get /user/login': 'UserController.login',
  'post /user/register': 'UserController.register'

};
