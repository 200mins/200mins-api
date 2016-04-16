module.exports = {

    isObjectEmpty: function (obj) {

        for (var key in obj) {
            return false;
        }

        return true;

    },

    objectToQueryString: function (obj) {

        if (!UtilityService.isObjectEmpty(obj)) {

            var str = '?';

            for (var key in obj) {

                str += key + '=' + obj[key] + '&';

            }

            return str.slice(0, -1);

        } else {

            return null;

        }

    }

}