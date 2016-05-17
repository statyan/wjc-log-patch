function Logger() {

    this.levels = {
        info: true,
        log: true,
        warn: true,
        error: true,
    }

    this.mute = function(enable) {
        enable = !!enable;
        for(var level in this.levels) {
            this.levels[level] = enable;
        }
    }

    this.unmute = function () {
        this.mute(false)
    }
}

var logger = new Logger();
module.exports = logger;




for(var methodName in logger.levels) {
    patchConsoleMethod(methodName);
}

function patchConsoleMethod(methodName) {
    var nativeMethod = console[methodName];
    console[methodName] = function () {
        if (!logger.levels[methodName]) {
            return;
        }
        var args = [];
        args.push('[%s] [%s] ' + stringify(arguments[0]));
        args.push(getFormattedNow());
        args.push(methodName.toUpperCase());
        for(var i = 1; i < arguments.length; i++) {
            args.push(stringify(arguments[i]));
        }
        nativeMethod.apply(console, args);
    }
}

function stringify(value) {
    if (typeof value == 'object') {
        return util.inspect(value, {showHidden: false, depth: null});
    } else {
        return value;
    }
}

function getFormattedNow() {
    var now = new Date();
    return now.getFullYear() +
        '-' + pad(now.getMonth() + 1) +
        '-' + pad(now.getDate()) +
        ' ' + pad(now.getHours()) +
        ':' + pad(now.getMinutes()) +
        ':' + pad(now.getSeconds()) +
        '.' + pad(now.getMilliseconds(), true);
}

function pad(number, toThreePos) {
    if (number < 10) {
        number = '0' + number;
    }
    if (toThreePos) {
        if (number < 100) {
            number = '0' + number;
        }
    }
    return number;
}

