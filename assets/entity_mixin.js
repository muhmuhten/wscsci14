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
        if (Game.state.map.getTile(newX, newY).canWalk()) {
          this.move(x,y);
          this.hear("move", newX, newY);
        }
      },
    },

    ColourChanging: {
      _meta: {
        init: function (attr) {
          this.listen("move", function () {
            this.getModel().fg = ROT.Color.toHex(
                ROT.Color.randomize(
                  ROT.Color.fromString(this.getModel().fg),
                  [20,20,20]));
          });
        },
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
