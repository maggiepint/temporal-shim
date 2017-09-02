'use strict';

// Internal Constructors
function CivilDate(year, month, day) {
    if(!(year && month && day)) {
        throw new Error('CivilDate expects year, month and day');
    }
    Object.defineProperties(this, {
        'year': { 'get': () => year },
        'month': { 'get': () => month },
        'day': { 'get': () => day }
    });
}

function CivilTime(hour, minute, second, millisecond, nanosecond) {
    if(!(hour && minute)) {
        throw new Error('CivilTime expects hour and minute');
    }
    Object.defineProperties(this, {
        'hour': { 'get': () => hour },
        'minute': { 'get': () => minute },
        'second': { 'get': () => second || 0 },
        'millisecond': { 'get': () => millisecond || 0 },
        'nanosecond': { 'get': () => nanosecond || 0 }
    });
}

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

function Instant (milliseconds, nanoseconds) {
    Object.defineProperties(this, {
        'milliseconds': { 'get': () => milliseconds },
        'nanoseconds': { 'get': () => nanoseconds || 0 }
    });
}

function ZonedInstant(instant, zone) {
    Object.defineProperties(this, {
        'instant': { 'get': () => instant },
        'zone': { 'get': () => zone }
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

function pad(n, width, z) {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

CivilDate.prototype.atTime = function (hour, minute, second, milliseconds, nanoseconds) {
    return new CivilDateTime(this, new CivilTime(hour, minute, second, milliseconds, nanoseconds));
};

CivilTime.prototype.atDate = function (year, month, day) {
    return new CivilDateTime(new CivilDate(year, month, day), this);
};

// TBD: Do we need something like these?
CivilDate.prototype.combine = function (time) { return new CivilDateTime(this, time); };
CivilTime.prototype.combine = function (date) { return new CivilDateTime(date, this); };

CivilDate.prototype.toString = function () {
    return pad(this.year, 4) + '-' + pad(this.month, 2) + '-' + pad(this.day, 2);
};

CivilTime.prototype.toString = function () {
    return pad(this.hour, 2) + ':' + pad(this.minute, 2) + ':' + pad(this.second, 2) + '.' + pad(this.milliseconds, 3) + pad(this.nanoseconds, 6);
};

CivilDateTime.prototype.toString = function () {
    return this.date.toString() + 'T' + this.time.toString();
};

Instant.prototype.toString = function () {
    return new Date(this.milliseconds).toISOString().slice(0,-1) + pad(this.nanoseconds, 6) + 'Z';
};

ZonedInstant.prototype.toString = function () {
    // TBD: this is wrong, it should emit the local datetime, with offset, and zone in brackets.
    return this.instant.toString() + '[' + this.zone + ']';
};

CivilDate.prototype.inspect = CivilDate.prototype.toString;
CivilTime.prototype.inspect = CivilTime.prototype.toString;
CivilDateTime.prototype.inspect = CivilDateTime.prototype.toString;
Instant.prototype.inspect = Instant.prototype.toString;
ZonedInstant.prototype.inspect = ZonedInstant.prototype.toString;



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


// internal functions for shim implementation only

let offsetRegex = /([+-])(\d{2}):(\d{2})/;

function offsetStringToMinutes(s){
    let matches = offsetRegex.exec(s);
    let sign = +(matches[1] + '1');
    let hours = +(matches[2]);
    let minutes = +(matches[3]);
    return sign * ((hours * 60) + minutes);
}


// export this module
module.exports = temporal;