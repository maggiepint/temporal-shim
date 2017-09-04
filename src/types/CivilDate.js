import { pad } from '../formatting';

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

CivilDate.prototype.toString = function () {
    return pad(this.year, 4) + '-' + pad(this.month, 2) + '-' + pad(this.day, 2);
};

CivilDate.prototype.inspect = CivilDate.prototype.toString;

export default CivilDate;