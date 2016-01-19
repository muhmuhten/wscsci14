Game.Mixin = (function () {
  "use strict";

  function Mixin(attr) {
    this._events = {};
  }

  Mixin.prototype.mixins = function (mixins, attr) {
    for (var i in mixins) {
      if (!mixins.hasOwnProperty(i)) continue;
      this.mixin(mixins[i], attr);
    }
  }

  Mixin.prototype.mixin = function (mix, attr) {
    for (var key in mix) {
      if (!mix.hasOwnProperty(key)) continue;
      if (key === "_meta") continue;
      this[key] = mix[key];
    }

    if (mix._meta) {
      if (mix._meta.init) {
        mix._meta.init.call(this, attr);
      }

      if (mix._meta.events) {
        var events = mix._meta.events;
        for (var evk in events) {
          if (!events.hasOwnProperty(evk)) continue;
          this.listen(evk, events[evk]);
        }
      }
    }
  };

  Mixin.prototype.listen = function (ty, f) {
    this._events[ty] = this._events[ty] || [];
    this._events[ty].push(f);
  };
  Mixin.prototype.hear = function (ty) {
    var args = Array.prototype.slice.call(arguments, 1);
    if (this._events[ty]) {
      for (var key in this._events[ty]) {
        if (!this._events[ty].hasOwnProperty(key)) continue;
        var res = this._events[ty][key].apply(this, args);
        if (res != null) return res;
      }
    }
  };

  return Mixin;
})();
