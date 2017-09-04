import { pad } from '../formatting';

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

CivilTime.prototype.toString = function () {
    return pad(this.hour, 2) + ':' + pad(this.minute, 2) + ':' + pad(this.second, 2) + '.' + pad(this.milliseconds, 3) + pad(this.nanoseconds, 6);
};

CivilTime.prototype.inspect = CivilTime.prototype.toString;

export default CivilTime;