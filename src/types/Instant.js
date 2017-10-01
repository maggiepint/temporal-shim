import { pad, pointToISO } from '../formatting';

function Instant (milliseconds, nanoseconds) {
    Object.defineProperties(this, {
        'milliseconds': { 'get': () => milliseconds },
        'nanoseconds': { 'get': () => nanoseconds || 0 }
    });
}

Instant.prototype.toString = function () {
    return pointToISO(this.milliseconds, this.nanoseconds) + 'Z';
};

Instant.prototype.inspect = Instant.prototype.toString;

export default Instant;