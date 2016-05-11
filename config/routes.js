module.exports.routes = {

    'POST   /activity/:imdbID/movie-download':          'Activity.postMovieDownload',
    'POST   /activity/:imdbID/movie-like':              'Activity.postMovieLike',
    'POST   /activity/:imdbID/movie-mark-watch-later':  'Activity.postMovieMarkWatchLater',
    'POST   /activity/:imdbID/movie-mark-watched':      'Activity.postMovieMarkWatched',
    'POST   /activity/:imdbID/movie-play':              'Activity.postMoviePlay',

    'GET    /movie/:imdbID/user-activity':              'Movie.getUserActivity',

    'GET    /proxy/list_movies':                        'Proxy.getListMovies',
    'GET    /proxy/movie_details':                      'Proxy.getMovieDetails',

    'POST   /user':                                     'User.create',
    'GET    /user/:username':                           'User.getByUsername',
    'GET    /user/:username/movie-download':            'User.getMovieDownload',
    'GET    /user/:username/movie-like':                'User.getMovieLike',
    'GET    /user/:username/movie-mark-watch-later':    'User.getMovieMarkWatchLater',
    'GET    /user/:username/movie-mark-watched':        'User.getMovieMarkWatched',
    'GET    /user/:username/movie-play':                'User.getMoviePlay',
    'GET    /user/:username/session':                   'User.getSession'

};