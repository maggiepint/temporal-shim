'use strict';

let temporal = require('../src/temporal');
let assert = require('assert');

describe('CivilDate', () => {
    describe('create', () => {
        it('should create a civil date', () => {
            let civilDate = temporal.createCivilDate(2017, 12, 31);
            assert.equal(civilDate.year, 2017);
            assert.equal(civilDate.month, 12);
            assert.equal(civilDate.day, 31);
        });
        it('should not allow unspecified fields', () => {
            assert.throws(() => { temporal.createCivilDate(2017, 12); }, Error);
            assert.throws(() => { temporal.createCivilDate(2017); }, Error);
        });

    });
});

describe('CivilTime', ()=> {
    describe('create', ()=> {
        it('should create civil time', () => {
            let civilTime = temporal.createCivilTime(13,34,12,123,456789);
            assert.equal(civilTime.hour, 13);
            assert.equal(civilTime.minute, 34);
            assert.equal(civilTime.second, 12);
            assert.equal(civilTime.millisecond, 123);
            assert.equal(civilTime.nanosecond, 456789);
        });
        it('should error with incomplete data', () =>{
            assert.throws(() => { temporal.createCivilTime(); }, Error);
            assert.throws(() => { temporal.createCivilTime(10); }, Error);
        });
    });
});



// let dt1 = temporal.createDateTime(2017, 12, 31, 23, 59, 59, 123, 456789);
// let dt2 = d.atTime(23, 59, 59, 123, 456789);
// let dt3 = t.atDate(2017, 12, 31);

// let dt4 = d.combine(t);
// let dt5 = t.combine(d);


// let dto = temporal.createDateTime(2017, 12, 31, 23, 59, 59, 123, 456789)
//                   .withOffset('+05:30');

// // let dto2 = temporal.createDateTime(2017, 12, 31, 23, 59, 59, 123, 456789)
// //                    .withZone('America/New_York');

// let utc = temporal.createDateTime(2017, 12, 31, 23, 59, 59, 123, 456789)
//                   .withUTCZone();

// let local = temporal.createDateTime(2017, 12, 31, 23, 59, 59, 123, 456789)
//                   .withSystemZone();



// console.log(d);
// console.log(t);
// console.log(dt1);
// console.log(dt2);
// console.log(dt3);
// console.log(dt4);
// console.log(dt5);
// console.log(dto);
// console.log(utc);
// console.log(local);

