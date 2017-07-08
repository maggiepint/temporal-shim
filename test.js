'use strict';

let temporal = require('./temporal');


let d = temporal.createDate(2017, 12, 31);
let t = temporal.createTime(23, 59, 59, 123, 456789);

let dt1 = temporal.createDateTime(2017, 12, 31, 23, 59, 59, 123, 456789);
let dt2 = d.atTime(23, 59, 59, 123, 456789);
let dt3 = t.atDate(2017, 12, 31);

let dt4 = d.combine(t);
let dt5 = t.combine(d);


let dto = temporal.createDateTime(2017, 12, 31, 23, 59, 59, 123, 456789)
                  .withOffset('+05:30');

// let dto2 = temporal.createDateTime(2017, 12, 31, 23, 59, 59, 123, 456789)
//                    .withZone('America/New_York');

let utc = temporal.createDateTime(2017, 12, 31, 23, 59, 59, 123, 456789)
                  .withUTCZone();

let local = temporal.createDateTime(2017, 12, 31, 23, 59, 59, 123, 456789)
                  .withSystemZone();



console.log(d);
console.log(t);
console.log(dt1);
console.log(dt2);
console.log(dt3);
console.log(dt4);
console.log(dt5);
console.log(dto);
console.log(utc);
console.log(local);

