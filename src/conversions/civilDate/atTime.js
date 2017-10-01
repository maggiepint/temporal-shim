import CivilDate from '../types/CivilDate';
import CivilTime from '../types/CivilTime';
import CivilDateTime from '../types/CivilDateTime';

CivilDate.prototype.atTime = function (hour, minute, second, milliseconds, nanoseconds) {
    return new CivilDateTime(this, new CivilTime(hour, minute, second, milliseconds, nanoseconds));
};