module.exports = function (req, res, next) {

    var findUserNeedle = { id: req.body.user };

    User.findOne(findUserNeedle).exec(function (err, foundUser) {

        if (err) {

            return sails.config.environment === 'development' ? res.serverError(err) : res.serverError();

        } else {

            if (foundUser.type !== 'staff') {

                return res.forbidden('You must be a 200mins staff to perform this action.');

            } else {

                return next();

            }

        }

    });

}