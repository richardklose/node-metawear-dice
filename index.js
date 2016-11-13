var metawear = require('node-metawear');
var config = require('./config.json');
var initDevice = require('./lib/initDevice');

metawear.discover( (device) => {
    console.log('discovered device ', device.id);
    for (var i in config.devices) {
        if ( config.devices[i] === device.id || config.devices[i] === device.address )
        initDevice(device);
    }
});