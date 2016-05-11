module.exports = function (req, res, next) {

    // Validate request

    if (!req.params.hasOwnProperty('username')) {

        return res.badRequest('username');

    } else {

        // Find user

        var findUserNeedle = {username: req.params.username};

        User.findOne(findUserNeedle).exec(function (err, foundUser) {

            if (err) {

                return res.serverError(err);

            } else if (!foundUser) {

                return res.dunno('User doesn\'t exist.');

            } else {

                req.userID = foundUser.id;

                next();

            }

        });

    }

};