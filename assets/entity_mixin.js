Game.EntityMixin = (function () {
  "use strict";

  return {
    Walker: {
      _meta: {},
      walk: function (x,y) {
        var newX = this.getX() + x;
        var newY = this.getY() + y;

        // XXX check properties instead of name
        if (Game.state.map.getTile(newX, newY).getId() !== "floor") {
          return true;
        }

        this.move(x,y);
      },
    },
  };
})();
