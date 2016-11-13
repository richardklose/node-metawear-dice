var metawear = require('node-metawear');
var config = require('./config.json');
var Device = require('./lib/Device');
var device;

metawear.discover( (dev) => {
    console.log('discovered device ', dev.id);
    if ( config.device === dev.id || config.device === dev.address ) {
        device = new Device(dev);
    }
});