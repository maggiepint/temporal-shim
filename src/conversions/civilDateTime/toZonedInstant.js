import CivilDateTime from '../types/CivilDateTime';
import ZonedInstant from '../types/ZonedInstant';

CivilDateTime.prototype.withUTCZone = function () {
    let m = Date.UTC(this.year, this.month-1, this.day, this.hour, this.minute, this.second, this.milliseconds);
    return new ZonedInstant('UTC', m, this.nanoseconds);
};

CivilDateTime.prototype.withOffset = function (offset) {
    let o = offsetStringToMinutes(offset) * 60 * 1000;
    let m = Date.UTC(this.year, this.month-1, this.day, this.hour, this.minute, this.second, this.milliseconds);
    return new ZonedInstant(offset, m, this.nanoseconds);
};

CivilDateTime.prototype.withSystemZone = function () {
    let m = new Date(this.year, this.month-1, this.day, this.hour, this.minute, this.second, this.milliseconds).valueOf();
    return new ZonedInstant('SYSTEM', m, this.nanoseconds);
};

CivilDateTime.prototype.withZone = function (zone) {
    //todo (needs time zone database)
    throw 'Not Implemented';
};