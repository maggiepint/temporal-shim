import { offsetStringToMinutes } from '../formatting';
function CivilDateTime (year, month, day, hour, minute, second, millisecond, nanosecond) {
    if(!(year && month && day && hour && minute )) {
        throw new Error('CivilDateTime expects year, month, day, hour, and minute');
    }
    Object.defineProperties(this, {
        'year': { 'get': () => year },
        'month': { 'get': () => month },
        'day': { 'get': () => day },
        'hour': { 'get': () => hour },
        'minute': { 'get': () => minute },
        'second': { 'get': () => second },
        'millisecond': { 'get': () => millisecond },
        'nanosecond': { 'get': () => nanosecond }
    });
}


CivilDateTime.prototype.withUTCZone = function () {
    let d = this.date;
    let t = this.time;
    let m = Date.UTC(d.year, d.month-1, d.day, t.hour, t.minute, t.second, t.milliseconds);
    let instant = new Instant(m, t.nanoseconds);
    return new ZonedInstant(instant, 'UTC');
};

CivilDateTime.prototype.withOffset = function (offset) {
    let o = offsetStringToMinutes(offset) * 60 * 1000;
    let d = this.date;
    let t = this.time;
    let m = Date.UTC(d.year, d.month-1, d.day, t.hour, t.minute, t.second, t.milliseconds);
    let instant = new Instant(m + o, t.nanoseconds);
    return new ZonedInstant(instant, offset);
};

CivilDateTime.prototype.withSystemZone = function () {
    let d = this.date;
    let t = this.time;
    let m = new Date(d.year, d.month-1, d.day, t.hour, t.minute, t.second, t.milliseconds).valueOf();
    let instant = new Instant(m, t.nanoseconds);
    return new ZonedInstant(instant, 'SYSTEM');
};

CivilDateTime.prototype.withZone = function (zone) {
    //todo (needs time zone database)
    throw 'Not Implemented';
};

CivilDateTime.prototype.inspect = CivilDateTime.prototype.toString;

export default CivilDateTime;