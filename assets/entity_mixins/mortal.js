Game.EntityMixin.Mortal = (function () {
  "use strict";

  return {
    kill: function (killer) {
      if (this.storeKey) {
        Game.state.entities.remove(this.storeKey);
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
