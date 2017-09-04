export function pad(n, width, z) {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
  }

  
// internal functions for shim implementation only

let offsetRegex = /([+-])(\d{2}):(\d{2})/;

export function offsetStringToMinutes(s){
    let matches = offsetRegex.exec(s);
    let sign = +(matches[1] + '1');
    let hours = +(matches[2]);
    let minutes = +(matches[3]);
    return sign * ((hours * 60) + minutes);
}