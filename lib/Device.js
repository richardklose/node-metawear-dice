'use strict';

var inherits = require('util').inherits;
var EventEmitter = require('events').EventEmitter;

function Device(device) {
    this.device = device;
    device.on('disconnect', () => {
        console.log('device disconnected');
    });

    device.connectAndSetup((err) => {
        if (err) {
            console.error(err);
        } else {
            console.log('device connected');
        }
        this.getBattery((level) => {
            console.log("Battery:", level);
        })
    });
}

inherits(Device, EventEmitter);

Device.prototype.getBattery = function(callback) {
    this.device.readBatteryLevel((error, batteryLevel) => {
        if (batteryLevel < 5) {
            console.log('WARNING: BATTERY LEVEL UNDER 5%! PLEASE REPLACE BATTERY');
        } else if (batteryLevel <20) {
            console.log('WARNING: BATTERY LEVEL UNDER 20%!');
        }
        this.emit('battery-status', batteryLevel);
        callback(batteryLevel);
    });
};

module.exports = Device;