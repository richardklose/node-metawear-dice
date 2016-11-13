module.exports = (device) => {

    device.on('disconnect', () => {
        console.log('device disconnected');
    });

    device.connectAndSetup( (err) => {
        if (err) {
            console.error(err);
        } else {
            console.log('device connected');
        }
    });
};