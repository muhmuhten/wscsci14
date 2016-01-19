Game.EntityMixin.Solid = (function () {
  "use strict";

  return {
    _meta: {
      events: {
        collision: function (x, y) {
          if (this.getX() == x && this.getY() == y) {
            return this;
          }
        },
      },
    },

    getX: function () { return this.attr.Position.x; },
    setX: function (x) { this.attr.Position.x = x; },
    getY: function () { return this.attr.Position.y; },
    setY: function (y) { this.attr.Position.y = y; },
    setPos: function (x,y) {
      if (x != null) this.setX(x);
      if (y != null) this.setY(y);
    },
    move: function (x,y) {
      this.setX(this.getX() + x);
      this.setY(this.getY() + y);
    },
  };
})();
