# wjc-log-patch

Patches console logging method to add some useful functions to standard logger.

- adds timestamp to all log messages
- adds message log level mark
- gives an opportunity to mute any log level or all of them

Available log levels are info, log, warn, error.

Extremly useful for tests. Include 'wjc-log-patch' at the top of the first test spec and call `require('wjc-log-patch').mute()` to suppress your code log messages so you console test report would not be breaked logs of your code.

### Usage example

```
var logger = require('wjc-log-patch');

// mute INFO level
logger.levels.info = false;

// mute all log levels
logger.mute()

// unmute ERROR level
logger.levels.error = true;

// unmute all levels
logger.unmute()


```
##Whats new

v0.0.2:
- Fixed converting object to strings to display in log

