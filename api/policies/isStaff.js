module.exports = function (req, res, next) {

    var needle = { id: req.body.user };

    User.findOne(needle).exec(function (err, user) {

        if (err) {

            return sails.config.environment === 'development' ? res.serverError(err) : res.serverError();

        } else {

            if (user.type !== 'staff') {

                return res.forbidden('You must be a 200mins staff to perform this action.');

            } else {

                return next();

            }

        }

    });

}