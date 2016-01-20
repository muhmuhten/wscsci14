Game.EntityMixin.Item = (function () {
  "use strict";

  return {
    _meta: {
      events: {
        loot: function (dst, by) {
          var d2x = Math.pow(by.getX()-this.getX(), 2)
          var d2y = Math.pow(by.getY()-this.getY(), 2)
          var dist2 = d2x + d2y;

          if (dist2 < 4) {
            dst.push(this);
          }
        },

        pickup: function (to) {
          this.setPos("none", "none");
          to.give(this);
        },
      },
    },

    pickup: function (to) {
      this.setPos("none", "none");
      to.gain(this);
    },
    
    drop: function (by) {
      by.lose(this);
      this.setPos(by.getX(), by.getY());
    },

    getPriority: function () {
      return 1;
    },
  };
})();
