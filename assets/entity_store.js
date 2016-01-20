Game.EntityStore = (function () {
  "use strict";

  function Store(attr) {
    this.avatar = 0;
    this.last = 0;
    this.all = {};

    for (var i in attr) {
      this.add(new Game.Entity(attr[i]));
    }
  }
  Store.prototype.toJSON = function () {
    var out = {};
    for (var key in this.all) {
      if (!this.all.hasOwnProperty(key)) continue;
      out[key] = this.get(key).attr;
    }
    return out;
  }

  Store.prototype.add = function (e) {
    if (e.attr.storeKey == null) {
      e.attr.storeKey = ++this.last;
    }
    else {
      this.last = Math.max(e.attr.storeKey, this.last);
    }

    this.all[e.attr.storeKey] = e;

    if (e.getModel().getId() === "avatar") {
      this.avatar = e.attr.storeKey;
    }

    return e.attr.storeKey;
  };
  Store.prototype.get = function (n) {
    return this.all[n];
  };
  Store.prototype.remove = function (n) {
    delete this.all[n];
  };

  Store.prototype.any = function (f) {
    for (var key in this.all) {
      if (!this.all.hasOwnProperty(key)) continue;

      if (f(this.all[key])) {
        return this.all[key];
      }
    }
  };

  Store.prototype.spam = function () {
    for (var key in this.all) {
      if (!this.all.hasOwnProperty(key)) continue;
      var res = this.all[key].hear.apply(this.all[key], arguments);
      if (res != null) return res;
    }
  };

  Store.prototype.getAvatar = function () {
    return this.get(this.avatar);
  };

  return Store;
})();
