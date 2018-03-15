const node_uuid = require('node-uuid')
const eventName = require('../src/utils/EventName')

global.electron = require('electron')
global.uuid = node_uuid.v1().replace(/-/g,'');
global.eventName = eventName;