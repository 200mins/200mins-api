module.exports = function (req, res, next) {

    var findUserNeedle = {id: req.body.user};

    User.findOne(findUserNeedle).exec(function (err, foundUser) {

        if (err) {

            return res.serverError(err);

        } else {

            if (typeof foundUser === 'undefined') {

                return res.kick('Please login again.');

            } else if (foundUser.type !== 'staff') {

                return res.stahp('You must be a 200mins staff to perform this action.');

            } else {

                return next();

            }

        }

    });

};