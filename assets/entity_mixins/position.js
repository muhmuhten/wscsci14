Game.EntityMixin.Position = (function () {
  "use strict";

  return {
    _meta: {
      init: function (attr) {
        this.attr.Position = attr.Position || {};
        this.attr.Position.x = attr.Position.x || 0;
        this.attr.Position.y = attr.Position.y || 0;
      },
      events: {
        locate: function (lookup) {
          var x = this.getX();
          lookup[x] = lookup[x] || {};
          lookup[x][this.getY()] = this;
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
