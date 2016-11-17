var metawear = require('node-metawear');
var config = require('./config.json');
var Device = require('./lib/Device');
var mqttoptions
try {
    mqttoptions = require('./config/mqtt.json')
} catch(e) {
    mqttoptions = require('./config/mqtt.default.json')
}
var mqtt = require('mqtt').connect(mqttoptions);

mqtt.on('connect', () => {
    console.log('MQTT connected');
});

var device;

metawear.discover( (dev) => {
    console.log('discovered device ', dev.id);
    if ( config.device === dev.id || config.device === dev.address ) {
        device = new Device(dev);

        device.on('battery-status', (level) => {
            mqtt.publish('MetaWearDice/Battery',level.toString());
        });
    }
});
