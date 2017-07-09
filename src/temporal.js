'use strict';

// Internal Constructors
function PlainDate(year, month, day) {
    Object.defineProperties(this, {
        'year': { 'get': () => year },
        'month': { 'get': () => month },
        'day': { 'get': () => day }
    });
}

function PlainTime(hour, minute, second, millis, nanos) {
    Object.defineProperties(this, {
        'hour': { 'get': () => hour },
        'minute': { 'get': () => minute },
        'second': { 'get': () => second || 0 },
        'millis': { 'get': () => millis || 0 },
        'nanos': { 'get': () => nanos || 0 }
    });
}

function PlainDateTime (date, time) {
    Object.defineProperties(this, {
        'date': { 'get': () => date },
        'time': { 'get': () => time },
        'year': { 'get': () => date.year },
        'month': { 'get': () => date.month },
        'day': { 'get': () => date.day },
        'hour': { 'get': () => time.hour },
        'minute': { 'get': () => time.minute },
        'second': { 'get': () => time.second },
        'millis': { 'get': () => time.millis },
        'nanos': { 'get': () => time.nanos }
    });
}

function Instant (millis, nanos) {
    Object.defineProperties(this, {
        'millis': { 'get': () => millis },
        'nanos': { 'get': () => nanos || 0 }
    });
}

function ZonedInstant(instant, zone) {
    Object.defineProperties(this, {
        'instant': { 'get': () => instant },
        'zone': { 'get': () => zone }
    });
}

PlainDateTime.prototype.withUTCZone = function () {
    let d = this.date;
    let t = this.time;
    let m = Date.UTC(d.year, d.month-1, d.day, t.hour, t.minute, t.second, t.millis);
    let instant = new Instant(m, t.nanos);
    return new ZonedInstant(instant, 'UTC');
};

PlainDateTime.prototype.withOffset = function (offset) {
    let o = offsetStringToMinutes(offset) * 60 * 1000;
    let d = this.date;
    let t = this.time;
    let m = Date.UTC(d.year, d.month-1, d.day, t.hour, t.minute, t.second, t.millis);
    let instant = new Instant(m + o, t.nanos);
    return new ZonedInstant(instant, offset);
};

PlainDateTime.prototype.withSystemZone = function () {
    let d = this.date;
    let t = this.time;
    let m = new Date(d.year, d.month-1, d.day, t.hour, t.minute, t.second, t.millis).valueOf();
    let instant = new Instant(m, t.nanos);
    return new ZonedInstant(instant, 'SYSTEM');
};

PlainDateTime.prototype.withZone = function (zone) {
    //todo (needs time zone database)
    throw 'Not Implemented';
};

function pad(n, width, z) {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

PlainDate.prototype.atTime = function (hour, minute, second, millis, nanos) {
    return new PlainDateTime(this, new PlainTime(hour, minute, second, millis, nanos));
}

PlainTime.prototype.atDate = function (year, month, day) {
    return new PlainDateTime(new PlainDate(year, month, day), this);
}

// TBD: Do we need something like these?
PlainDate.prototype.combine = function (time) { return new PlainDateTime(this, time); };
PlainTime.prototype.combine = function (date) { return new PlainDateTime(date, this); };

PlainDate.prototype.toString = function () {
    return pad(this.year, 4) + '-' + pad(this.month, 2) + '-' + pad(this.day, 2);
};

PlainTime.prototype.toString = function () {
    return pad(this.hour, 2) + ':' + pad(this.minute, 2) + ':' + pad(this.second, 2) + '.' + pad(this.millis, 3) + pad(this.nanos, 6);
};

PlainDateTime.prototype.toString = function () {
    return this.date.toString() + 'T' + this.time.toString();
};

Instant.prototype.toString = function () {
    return new Date(this.millis).toISOString().slice(0,-1) + pad(this.nanos, 6) + 'Z';
};

ZonedInstant.prototype.toString = function () {
    // TBD: this is wrong, it should emit the local datetime, with offset, and zone in brackets.
    return this.instant.toString() + '[' + this.zone + ']';
};

PlainDate.prototype.inspect = PlainDate.prototype.toString;
PlainTime.prototype.inspect = PlainTime.prototype.toString;
PlainDateTime.prototype.inspect = PlainDateTime.prototype.toString;
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
    createDate: (year, month, day) => new PlainDate(year, month, day),
    createTime: (hour, minute, second, millis, nanos) => new PlainTime(hour, minute, second, millis, nanos),
    createDateTime: (year, month, day, hour, minute, second, millis, nanos) =>
        new PlainDateTime(new PlainDate(year, month, day), new PlainTime(hour, minute, second, millis, nanos)),
    createInstant: (millis, nanos) => new Instant(millis, nanos)
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