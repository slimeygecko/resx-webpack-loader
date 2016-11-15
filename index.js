/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Mike Woodward @slimeygecko
*/
var jsonfromresx = require('jsonfromresx');

module.exports = function(content) {
    var callback = this.async();
    // if(!callback) return someSyncOperation(content);

    jsonfromresx.convert(this.resourcePath, null, {}, function(result, err) {
        if(err) return callback(err);
        callback(null, result);
    });
};
