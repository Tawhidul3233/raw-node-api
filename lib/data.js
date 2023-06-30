const fs = require('fs');
const path = require('path');

const lib = {};

// base directory of the data folder
lib.basedir = path.join(__dirname, '/../.data/');


// write for data
lib.create = (dir, file, data, callback) => {
  fs.open(lib.basedir+dir+'/'+file+'.json', 'wx', (err, fileDiscriptor) => {
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
}

module.exports = lib;
