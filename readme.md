# app-config-lite

A simple library for loading application settings from the environment or a configuration file.


```js
const Configuration = require('app-config-lite');

const config = Configuration.init('app-name');

config.set('transient-setting', 'value');

const setting = config.get('transient-setting');

```

## Installation

```bash
$ npm install --save app-config-lite
```

## Usage

Initialize app-config-lite in your application's start up file.
```js
const Configuration = require('app-config-lite');

const config = Configuration.init('app-name');
```

Once initialized, app-config-lite behaves as a singleton.  A reference to your configuration can be access via
```js
config.instance();
```

By default, a configuration file is generated in the home directory of the user running the application:
    ~/.config/<app-name>/config.json

app-config-lite has a simple get/set interface.
```js
config.get('path.to.target.property');

config.set('path.to.target.property', 'property_value');
```

## Behavior

### GET

Calling `config.get('path.to.target.property')` will

1. check the environment for a `PATH_TO_TARGET_PROPERTY` variable.
2. if no environment variable exists, it checks the `config.json` file generated during initalization:

```json
{
  "path":{
    "to": {
      "target": {
        "property": "value"
      }
    }
  }
}
```

### SET
Calling `config.set('transientVariable')` will create a setting that is available for the life of the application.  The value is not saved when the application exits.



## Tests

```bash
$ npm install
$ npm test
```

## License

  [MIT](LICENSE)