var YAML = require('yamljs'),
paths    = YAML.load('./paths.yml');

var lib = {

  getDir: function (dir, item) {
    var _dir = null;
    if (item) {
       switch (typeof dir) {
        case "string":
          switch (typeof item) {
            case "string":
              _dir = paths[dir] + paths[item];

              break;
            case "object":
              _dir = [];

              for (var i = 0; i < item.length; i++) {
                _dir.push(paths[dir] + paths[item[i]]);
              }

              break;
            default:
              break;
          }

          break;
        case "object":
          switch (typeof item) {
            case "string":
               _dir = [];

              for (var j = 0; j < dir.length; j++) {
                _dir.push(paths[dir[j]] + paths[item]);
              }

              break;
            case "object":
              _dir = [];

              for (var k = 0; k < dir.length; k++) {

                for (var l = 0; l < item.length; l++) {
                  _dir.push(paths[dir[k]] + paths[item[l]]);
                }

              }

              break;
            default:
              break;
          }
          break;
        default:
          break;
      }
    } else {
      return paths[dir];
    }

    return _dir;
  },

  getKarmaDir: function () {
    return paths.karma.dir;
  },

  getKarmaUnit: function () {
    return this.getKarmaDir() + paths.karma.unit;
  },

  getKarmaSrc: function () {
    return this.getKarmaDir() + paths.karma.src;
  },

  getFiles: function (dir, ext) {
    var _dir = null;
    if (ext.indexOf('/') > -1) {
      switch (typeof dir) {
        case "string":
          _dir  = dir + ext;
          break;
        case "object":
          for (var i = 0; i < dir.length; i++) {
            _dir = [];
            _dir.push(dir[i] + ext);
          }
          break;
        default:
          break;
      }

    } else {
      var point = "";
      switch (typeof dir) {
        case "string":
          if (ext.indexOf('/') === 0 && ext.indexOf('.') > -1) {
            point = ".";
          }
          _dir = dir + "/**/*" + point + ext;
          break;
        case "object":
          for (var j = 0; j < dir.length; j++) {
            _dir = [];
            if (ext.indexOf('/') === 0 && ext.indexOf('.') > -1) {
              point = ".";
            }
            _dir.push(dir[j] + "/**/*" + point + ext);
          }
          break;
        default:
          break;
      }
    }
    return _dir;
  },
  // [src, build], ['client', 'server'], js
  getLang: function (dir, item, ext) {
    console.log('dir', this.getFiles(this.getDir(dir, item), ext));
    return this.getFiles(this.getDir(dir, item), ext);
  },

  getOther: function () {
    return paths.others;
  }
};

module.exports =  lib;
