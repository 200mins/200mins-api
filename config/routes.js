module.exports.routes = {

    'POST /activity/download': 'Activity.postDownload',
    'POST /activity/play': 'Activity.postPlay',
    'POST /activity/movie-like': 'Activity.postMovieLike',
    'POST /activity/movie-watch-later': 'Activity.postMovieWatchLater',
    'POST /activity/movie-watched': 'Activity.postMovieWatched',

    'GET /movie/status': 'Movie.getStatus',

    'GET /proxy/list_movies': 'Proxy.getListMovies',
    'GET /proxy/movie_details': 'Proxy.getMovieDetails',

    'POST /user': 'User.register',
    'GET /user/:username/movie-like': 'User.getMovieLike',
    'GET /user/:username/movie-watch-later': 'User.getMovieWatchLater',
    'GET /user/:username/movie-watched': 'User.getMovieWatched',
    'GET /user/:username/session': 'User.getSession'

};