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
    if (e.store == null) {
      e.store = this.next++;
      this.all[e.store] = e;
    }

    if (e.getModel().getId() === "avatar") {
      this.avatar = e.store;
    }

    return e.store;
  };
  Store.prototype.get = function (n) {
    return this.all[n];
  };

  Store.prototype.any = function (f) {
    for (var key in this.all) {
      if (!this.all.hasOwnProperty(key)) continue;

      if (f(this.all[key])) {
        return true;
      }
    }
    return false;
  };

  Store.prototype.each = function (f) {
    for (var key in this.all) {
      if (!this.all.hasOwnProperty(key)) continue;
      f(this.all[key]);
    }
  };

  Store.prototype.getAvatar = function () {
    return this.get(this.avatar);
  };

  return Store;
})();
