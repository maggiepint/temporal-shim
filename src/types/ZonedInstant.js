function ZonedInstant(instant, zone) {
    Object.defineProperties(this, {
        'instant': { 'get': () => instant },
        'zone': { 'get': () => zone }
    });
}
ZonedInstant.prototype.toString = function () {
    // TBD: this is wrong, it should emit the local datetime, with offset, and zone in brackets.
    return this.instant.toString() + '[' + this.zone + ']';
};

ZonedInstant.prototype.inspect = ZonedInstant.prototype.toString;

export default ZonedInstant;