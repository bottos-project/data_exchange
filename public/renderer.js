<<<<<<< HEAD
const node_uuid = require('node-uuid')
const eventName = require('../src/utils/EventName')

global.electron = require('electron')
global.uuid = node_uuid.v1().replace(/-/g,'');
global.eventName = eventName
=======
global.electron = require('electron')
>>>>>>> 987e290a1a15fccda791f29484116e8f83355471
