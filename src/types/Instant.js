import { pad } from '../formatting';

function Instant (milliseconds, nanoseconds) {
    Object.defineProperties(this, {
        'milliseconds': { 'get': () => milliseconds },
        'nanoseconds': { 'get': () => nanoseconds || 0 }
    });
}

Instant.prototype.toString = function () {
    return new Date(this.milliseconds).toISOString().slice(0,-1) + pad(this.nanoseconds, 6) + 'Z';
};

Instant.prototype.inspect = Instant.prototype.toString;

export default Instant;