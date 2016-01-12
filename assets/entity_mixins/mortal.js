Game.EntityMixin.Mortal = (function () {
  "use strict";

  return {
    _meta: {
      init: function (attr) {
        this.listen("time", function () {
        });
      },
    },

    isDead: function () {
      return false;
    },

    kill: function () {
      Game.Message.send("It dies.");
      if (this.storeKey) {
        Game.state.entities.remove(this.storeKey);
      }
    },
  };
})();
