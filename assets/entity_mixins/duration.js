Game.EntityMixin.Duration = (function () {
  "use strict";

  return {
    _meta: {
      init: function (attr) {
        this.attr.Duration = attr.Duration || 0;
      },
      events: {
        schedule: function (s) {
          s.when = s.when || Infinity;
          s.when = Math.min(s.when, this.getDelay());
        },

        elapse: function (d) {
          this.elapse(d);
        },
      },
    },

    getDelay: function () { return this.attr.Duration; },
    setDelay: function (d) { this.attr.Duration = d },

    elapse: function (d) {
      this.setDelay(this.getDelay() - d);

      while (this.getDelay() <= 0) {
        var res = this.act();
        if (res != null) return res;
      }
    },
    delay: function(d) {
      this.elapse(-d);
    },
  };
})();
