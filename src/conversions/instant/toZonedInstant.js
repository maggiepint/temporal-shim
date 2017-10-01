import Instant from '../types/Instant';
import ZonedInstant from '../types/ZonedInstant';

Instant.prototype.withUTCZone = function () {
    return new ZonedInstant(this, 'UTC');
};

Instant.prototype.withOffset = function (offset) {
    return new ZonedInstant(this, offset);
};

Instant.prototype.withSystemZone = function () {
    return new ZonedInstant(this, 'SYSTEM');
};

Instant.prototype.withZone = function (zone) {
    //todo (needs time zone database)
    throw 'Not Implemented';
};