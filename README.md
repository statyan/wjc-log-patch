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
- packageName - dot-separated string (usually your domain in reversed order + package name). For example: com.google.myPackage;
- packagesFileDir - [not required] path to folder where packages.js file will be created (By default - the Gruntfile.js folder);
- watchSourceDirs - string or array of strings. Each string is a relative path to packagesFileDir. Each watched directory will populate its sources to packages.js
- ignored - anymatch-compatible expression matching files or paths

Assuming we have project structure:
```
root_dir/src/lib/MyClass1.js
root_dir/src/lib/MyClass2.js
```
Grunt task setup:
```
packagerify: {
    default: {
        options: {
            packageName: 'com.example.pack',
            watchSourceDirs: ['src'],
        }
    }
}
```

packages.js injects in the global namespace this files and they could be accessed in next way:
```
var MyClass1 = com.example.pack.lib.MyClass1

var MyClass2 = com.example.pack.lib.MyClass2
```
 For ES6:
```
class MyDescendantClass extends com.example.pack.lib.MyClass2 {
    ...
}
```

No 'require('.........')' needed!

### First step
`npm install packagerify`

### Second step
- setup grunt config as showed earlier<br><br>
OR<br><br>
- use Packagerify class directly (this will also start file watcher):
```
var Packagerify = require('packagerify');
var packagerify = new Packagerify({
    packageName: 'com.example.packagename',
    packagesFileDir: '',
    watchSourceDirs: ['src']
});
```

##Whats new

v0.0.9:
- add "ignored" option

v0.0.8:
- add grunt task "packagerify"

