module.exports.routes = {

    'POST /activity/:imdbID/download': 'Activity.postDownload',
    'POST /activity/:imdbID/movie-like': 'Activity.postMovieLike',
    'POST /activity/:imdbID/movie-watch-later': 'Activity.postMovieWatchLater',
    'POST /activity/:imdbID/movie-watched': 'Activity.postMovieWatched',
    'POST /activity/:imdbID/play': 'Activity.postPlay',

    'GET /movie/:imdbID/status': 'Movie.getStatus',

    'GET /proxy/list_movies': 'Proxy.getListMovies',
    'GET /proxy/movie_details': 'Proxy.getMovieDetails',

    'POST /user': 'User.create',
    'GET /user/:username/movie-like': 'User.getMovieLike',
    'GET /user/:username/movie-watch-later': 'User.getMovieWatchLater',
    'GET /user/:username/movie-watched': 'User.getMovieWatched',
    'GET /user/:username/session': 'User.getSession'

};