const _ = require('lodash');
const EventEmitter = require('events').EventEmitter;
const ConfigResolver = require('./configResolver');

let instance = null;
class Config extends EventEmitter {
  constructor(appName, configName = null) {
    super();
    if (!instance) {
      instance = this;
    }
    this.data = {};
    this.configResolver = new ConfigResolver(appName, configName);
    return instance;
  }

  get(path) {
    const envPath = path.toUpperCase().split('.').join('_');

    const value = _.get(process.env, envPath);
    if (value) {
      this.emit('info', `Configuration value for ${envPath} overridden by environment.`);
      return value;
    }

    return _.get(this.data, path);
  }

  set(path, value) {
    return _.set(this.data, path, value);
  }

  load(configPath) {
    try {
      this.data = this.configResolver.resolveConfig(configPath);
      this.emit('loaded', this.data.self_path);
    } catch (err) {
      this.emit('error', err.message);
    }
  }
}

module.exports = {
  init: (appName, configPath = null) => new Config(appName, configPath),
  instance: () => instance,
};