const fs = require('fs');
const path = require('path');

const lib = {};

// base directory of the data folder
lib.basedir = path.join(__dirname, '/../.data/');

// write data from server
lib.create = (dir, file, data, callback) => {
  fs.open(lib.basedir + dir + '/' + file + '.json', 'wx', (err, fileDiscriptor) => {
    if (!err && fileDiscriptor) {
      // convart js object to string / json
      const stringData = JSON.stringify(data);

      // writeFile
      fs.writeFile(fileDiscriptor, stringData, (err2) => {
        if (!err2) {
          fs.close(fileDiscriptor, (err3) => {
            if (!err3) {
              callback(false)
            } else {
              callback(err3)
            }
          })
        } else {
          callback(err2)
        }
      })
    } else {
      callback(err)
    }
  })
};

// read data from server
lib.read = (dir, file, callback) => {
  fs.readFile(lib.basedir + dir + '/' + file + '.json', 'utf8', (err, data) => {
    callback(err, data)
  });
};

module.exports = lib;
