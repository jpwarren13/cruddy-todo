const fs = require('fs');
const path = require('path');
const _ = require('underscore');
const counter = require('./counter');

var items = {};

// Public API - Fix these CRUD functions ///////////////////////////////////////
// fs.writeFile(exports.counterFile, counterString, (err) => {
//   if (err) {
//     throw ('error writing counter');
//   } else {
//     callback(null, counterString);
//   }
// });
exports.create = (text, callback) => {
  counter.getNextUniqueId(function(err, id) {
  //items[id] = text;
  //callback(null, { id, text });
    console.log('inside create id:', id);
    fs.writeFile(path.join(__dirname, 'data', id), text, (err) =>{
      if (err) {
        throw ('error in create TODO');
      } else {
        callback(null, {id, text});
      }
    });
  });
};

exports.readAll = (callback) => {
  var data = [];
  fs.readdir(path.join(__dirname, 'data'), 'utf8', function (err, files) {
    if (err) {
      console.log(err);
    } else {
      _.each(files, (id) => {
        data.push({ id, text: id });
      });
      callback(null, data);
    }   
  });
};

exports.readOne = (id, callback) => {
  //var text = items[id];
  fs.readFile(path.join(__dirname, 'data', id), function(err, data) {
    if (err) {
      console.log(err);
    } else {
      console.log(data);
      callback(null, { id, text: data.toString() });
    }
  });
};

exports.update = (id, text, callback) => {
  var item = items[id];
  if (!item) {
    callback(new Error(`No item with id: ${id}`));
  } else {
    items[id] = text;
    callback(null, { id, text });
  }
};

exports.delete = (id, callback) => {
  var item = items[id];
  delete items[id];
  if (!item) {
    // report an error if item not found
    callback(new Error(`No item with id: ${id}`));
  } else {
    callback();
  }
};

// Config+Initialization code -- DO NOT MODIFY /////////////////////////////////

exports.dataDir = path.join(__dirname, 'data');

exports.initialize = () => {
  if (!fs.existsSync(exports.dataDir)) {
    fs.mkdirSync(exports.dataDir);
  }
};
