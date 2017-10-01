import CivilTime from '../types/CivilTime';
import CivilDate from '../types/CivilDate';
import CivilDateTime from '../types/CivilDateTime';

CivilTime.prototype.atDate = function (year, month, day) {
    return new CivilDateTime(new CivilDate(year, month, day), this);
};
