import ee from 'event-emitter'

var MyClass = function () { /* .. */ };
ee(MyClass.prototype); // All instances of MyClass will expose event-emitter interface

var emitter = new MyClass();

export default emitter
