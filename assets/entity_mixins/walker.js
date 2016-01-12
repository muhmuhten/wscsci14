Game.EntityMixin.Walker = (function () {
  "use strict";
  
  return {
    _meta: {
      init: function () {
      },
    },

    walk: function (x,y) {
      var newX = this.getX() + x;
      var newY = this.getY() + y;

      if (!Game.state.map.getTile(newX, newY).canWalk()) {
        return {what: "wall"};
      }

      // XXX still stupid inefficient, violates encapsulation
      for (var key in Game.state.entities.all) {
        if (!Game.state.entities.all.hasOwnProperty(key)) continue;

        var e = Game.state.entities.all[key];
        if (e.getX() === newX && e.getY() === newY) {
          return {what: "entity", info: e};
        }
      }

      this.move(x,y);
      this.hear("move", newX, newY);
    },
  };
})();
