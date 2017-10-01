
function ZonedInstant(zone, milliseconds, nanoseconds) {
    Object.defineProperties(this, {
        'zone': { 'get': () => zone },
        'milliseconds': { 'get': () => milliseconds },
        'nanoseconds': { 'get': () => nanoseconds }
    });
}
ZonedInstant.prototype.toString = function () {
    // TBD: this is wrong, it should emit the local datetime, with offset, and zone in brackets.
    //return this.instant.toString() + '[' + this.zone + ']';
};

ZonedInstant.prototype.inspect = ZonedInstant.prototype.toString;

export default ZonedInstant;