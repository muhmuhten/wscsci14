Game.EntityStore = (function () {
  "use strict";

  function Store(attr) {
    this.avatar = 0;
    this.next = 0;
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
    if (e.storeKey == null) {
      e.storeKey = this.next++;
      this.all[e.storeKey] = e;
    }

    if (e.getModel().getId() === "avatar") {
      this.avatar = e.storeKey;
    }

    return e.storeKey;
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
