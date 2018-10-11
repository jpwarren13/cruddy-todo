const fs = require('fs');
const path = require('path');
const _ = require('underscore');
const counter = require('./counter');
const promise = require('bluebird');

var readFile = promise.promisify(fs.readFile);

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
    //console.log('inside create id:', id);
    fs.writeFile(path.join(__dirname, 'data', id ), text, (err) =>{
      if (err) {
        throw ('error in create TODO');
      } else {
        callback(null, {id, text});
      }
    });
  });
};

exports.readAll = (callback) => {
  fs.readdir(path.join(__dirname, 'data'), 'utf8', (err, files) => {
    if (err) {
      callback(err, null);
    } else {
      const messages = files.map((file) => {
        return readFile(path.join(__dirname, 'data', file), 'utf8').then(data => {
          return {id: file, text: data.toString()};
        });
      });
      promise.all(messages).then((messages) => callback(null, messages));
    }
  }
);
};
  //   console.log(files);
  //   return files;
  // }).then(function(result) {
  //   _.each(result, (id) => {
  //     // console.log(id);
  //     // data.push({ id, text: result });
  //     readFile(path.join(__dirname, 'data', id), 'utf8').then( (text) => {
  //       console.log('text :', text);
  //       data.push({ id, text});
  //       console.log('data :', data);
  //     });
  //   });
  // }).then(function() {
  //   console.log('whats data here?', data);
  //   callback(null, data);
  // });
      //create a new promise for each file
  //     _.each(files, (id) => {
  //       data.push({ id, text: id });
  //     });
  //     callback(null, data);
  //   }   
  // });

exports.readOne = (id, callback) => {
  //var text = items[id];
  fs.readFile(path.join(__dirname, 'data', id), function(err, data) {
    if (err) {
      callback(err, null);
    } else {
      console.log(data.toString());
      callback(null, { id, text: data.toString() });
    }
  });
};

exports.update = (id, text, callback) => {
  fs.readFile(path.join(__dirname, 'data', id ), (err) => {
    if (err) {
      callback(err, null);
    } else {
      fs.writeFile(path.join(__dirname, 'data', id ), text, (err) =>{
        if (err) {
          callback(err, null);
        } else {
          callback(null, {id, text});
        }
      });
    }
  });

};
  

exports.delete = (id, callback) => {
  fs.unlink(path.join(__dirname, 'data', id ), (err) => {
    if (err) {
      callback(err, null);
    } else {
      console.log('Got it!');
    }
  });
  // var item = items[id];
  // delete items[id];
  // if (!item) {
  //   // report an error if item not found
  //   callback(new Error(`No item with id: ${id}`));
  // } else {
  //   callback();
  // }
};

// Config+Initialization code -- DO NOT MODIFY /////////////////////////////////

exports.dataDir = path.join(__dirname, 'data');

exports.initialize = () => {
  if (!fs.existsSync(exports.dataDir)) {
    fs.mkdirSync(exports.dataDir);
  }
};
