Game.EntityMixin.Solid = (function () {
  "use strict";

  return {
    _meta: {
      events: {
        collision: function (e, x, y) {
          if (e.getX() === this.getX() && e.getY() === this.getY()) return;

          var dist = Math.pow(x-this.getX(), 2) + Math.pow(y-this.getY(), 2);
          if (dist < 1) {
            this.hear("touch", e);
            return this;
          }
        },
      },
    },
  };
})();
