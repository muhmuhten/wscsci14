Game.EntityMixin = (function () {
  "use strict";

  return {
    Walker: {
      _meta: {
        init: function () {
        },
      },

      walk: function (x,y) {
        var newX = this.getX() + x;
        var newY = this.getY() + y;

        // XXX check properties instead of name
        if (Game.state.map.getTile(newX, newY).getId() !== "floor") {
          return true;
        }

        this.move(x,y);
        this.hear("move", newX, newY);
      },
    },

    Chronicle: {
      _meta: {
        init: function (attr) {
          this.attr.turnsCtr = attr.turnsCtr || 0;
          this.listen("move", function () {
            this.trackTurn();
          });
        },
      },

      getTurns: function () {
        return this.attr.turnsCtr;
      },
      trackTurn: function () {
        this.attr.turnsCtr++;
      },
    },
  };
})();
