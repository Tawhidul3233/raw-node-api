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

// update data
lib.update = (dir, file, data, callback) => {
  // file open for writing
  fs.open(lib.basedir + dir + '/' + file + '.json', 'r+', (err, fileDiscriptor) => {
    if (!err && fileDiscriptor) {
      // conver data to string
      const stringData = JSON.stringify(data);

      // for make blank file
      fs.ftruncate(fileDiscriptor, (err2) => {
        if (!err2) {
          fs.writeFile(fileDiscriptor, stringData, (err3) => {
            if (!err3) {
              fs.close(fileDiscriptor, (err4) => {
                if (!err4) {
                  callback(false)
                } else {
                  callback(err4)
                }
              })
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

// delete data from server
lib.delete = (dir, file, callback) => {
  // unlink file
  fs.unlink(lib.basedir + dir + '/' + file + '.json', (err) => {
    if (!err) {
      callback(false)
    } else {
      callback(err)
    }
  })
}

module.exports = lib;
