import CivilDate from './types/CivilDate';
import CivilTime from './types/CivilTime';
import CivilDateTime from './types/CivilDateTime';
import Instant from './types/Instant';
import ZonedInstant from './types/ZonedInstant';

CivilDate.prototype.atTime = function (hour, minute, second, milliseconds, nanoseconds) {
    return new CivilDateTime(this, new CivilTime(hour, minute, second, milliseconds, nanoseconds));
};

CivilTime.prototype.atDate = function (year, month, day) {
    return new CivilDateTime(new CivilDate(year, month, day), this);
};

// TBD: Do we need something like these?
CivilDate.prototype.combine = function (time) { return new CivilDateTime(this, time); };
CivilTime.prototype.combine = function (date) { return new CivilDateTime(date, this); };





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


// top-level module definition
let temporal = {
    createCivilDate: (year, month, day) => new CivilDate(year, month, day),
    createCivilTime: (hour, minute, second, milliseconds, nanoseconds) => new CivilTime(hour, minute, second, milliseconds, nanoseconds),
    createCivilDateTime: (year, month, day, hour, minute, second, milliseconds, nanoseconds) =>
        new CivilDateTime(new CivilDate(year, month, day), new CivilTime(hour, minute, second, milliseconds, nanoseconds)),
    createInstant: (milliseconds, nanoseconds) => new Instant(milliseconds, nanoseconds)
};


export default temporal;