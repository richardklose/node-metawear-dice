'use strict';

var accelerometer = require('./accelerometer');
var battery = require('./battery');

function Device(device) {
    device.on('disconnect', () => {
        console.log('device disconnected');
    });

    device.connectAndSetup((err) => {
        if (err) {
            console.error(err);
        } else {
            console.log('device connected');
        }
    });
}

module.exports = Device;