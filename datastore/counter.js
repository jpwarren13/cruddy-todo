const fs = require('fs');
const path = require('path');
const sprintf = require('sprintf-js').sprintf;

var counter = 0;

// Private helper functions ////////////////////////////////////////////////////

// Zero padded numbers can only be represented as strings.
// If you don't know what a zero-padded number is, read the
// Wikipedia entry on Leading Zeros and check out some of code links:
// https://www.google.com/search?q=what+is+a+zero+padded+number%3F

const zeroPaddedNumber = (num) => {
  return sprintf('%05d', num);
};

const readCounter = (callback) => {
  fs.readFile(exports.counterFile, (err, fileData) => {
    if (err) {
      callback(null, 0);
    } else {
      callback(null, Number(fileData));
    }
  });
};

const writeCounter = (count, callback) => {
  var counterString = zeroPaddedNumber(count);
  fs.writeFile(exports.counterFile, counterString, (err) => {
    if (err) {
      throw ('error writing counter');
    } else {
      callback(null, counterString);
    }
  });
};

// Public API - Fix this function //////////////////////////////////////////////

exports.getNextUniqueId = (cb) => {
  readCounter(function(err, data) {
    if (err) {                                                                                                                                                                                                                               
      //console.log('read err : ', err);
      cb(err, null);
    } else {
        //return (counter = data + 1);
      writeCounter(++data, function(err, data) {
        if (err) {
         // console.log('write err : ', err);
          cb(err, null);
        } else {
         // console.log('writeCounter: ', data);
          cb(null, data);
            //return zeroPaddedNumber(counter);
        }
      });
    }
  });
};
// exports.getNextUniqueId = (callBack) => {
//   readCounter((err, data) => {
//     if (err) {
//       console.log(err);
//     } else {
//       writeCounter(++data, callBack);
//     }
//   });
// };

                                        
// Configuration -- DO NOT MODIFY //////////////////////////////////////////////

exports.counterFile = path.join(__dirname, 'counter.txt');
