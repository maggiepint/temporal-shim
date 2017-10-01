import { pointToISO } from '../formatting';
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

CivilDateTime.prototype.toString = function() {
    return pointToISO(Date.UTC(this.year, this.month -1, this.day, this.hour, this.minute, this.second, this.millisecond), this.nanosecond);
};

CivilDateTime.prototype.inspect = CivilDateTime.prototype.toString;

export default CivilDateTime;