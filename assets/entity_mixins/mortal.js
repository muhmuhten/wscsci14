Game.EntityMixin.Mortal = (function () {
  "use strict";

  return {
    kill: function (killer) {
      var key = this.getStoreKey();
      if (key != null) {
        Game.state.entities.remove(key);
      }

      if (killer.getModel().getId() === "avatar") {
        Game.Message.send("You kill it.");
      }
      else {
        Game.Message.send("It dies.");
      }
    },
  };
})();
