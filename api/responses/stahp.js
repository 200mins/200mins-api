module.exports = function (message) {

    var res = this.res;

    res.set('Content-Type', 'text/plain');

    return res.send(403, message);

};