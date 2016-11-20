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
    mqtt.subscribe('MetaWearDice/to/#');
    console.log('MQTT connected');
});

function Movement(axis, value) {
    if (value > 100) {
        mqtt.publish('MetaWearDice/from/Gyro', axis + '-right');
    } else if(value < -100) {
        mqtt.publish('MetaWearDice/from/Gyro', axis + '-left');
    }
}

var device;
var value = 100;
metawear.discover( (dev) => {
    console.log('discovered device ', dev.id);
    if ( config.device === dev.id || config.device === dev.address ) {
        device = new Device(dev);

        device.on('battery-status', (level) => {
            mqtt.publish('MetaWearDice/from/Battery',level.toString());
        });

        device.on('gyro-action', (sx,sy,sz) => {
            var x = parseInt(sx);
            var y = parseInt(sy);
            var z = parseInt(sz);

            var ax = Math.abs(x);
            var ay = Math.abs(y);
            var az = Math.abs(z);

            if(ax > ay && ax > az) {
                // x-Axis-Movement
                Movement('x', x);
            } else if(ay > ax && ay > az) {
                // y-Axis-Movement
                Movement('y', y);
            } else if(az > ay && az > ax) {
                // z-Axis-Movement
                Movement('z', z);
            }
        });

        device.init();
    }
});


