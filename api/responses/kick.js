module.exports = function (message) {

    var res = this.res;

    return res.send(401, message);

};