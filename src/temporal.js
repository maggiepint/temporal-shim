import CivilDate from './types/CivilDate';
import CivilTime from './types/CivilTime';
import CivilDateTime from './types/CivilDateTime';
import Instant from './types/Instant';
import ZonedInstant from './types/ZonedInstant';





// top-level module definition
let temporal = {
    createCivilDate: (year, month, day) => new CivilDate(year, month, day),
    createCivilTime: (hour, minute, second, milliseconds, nanoseconds) => new CivilTime(hour, minute, second, milliseconds, nanoseconds),
    createCivilDateTime: (year, month, day, hour, minute, second, milliseconds, nanoseconds) =>
        new CivilDateTime(new CivilDate(year, month, day), new CivilTime(hour, minute, second, milliseconds, nanoseconds)),
    createInstant: (milliseconds, nanoseconds) => new Instant(milliseconds, nanoseconds)
};


export default temporal;