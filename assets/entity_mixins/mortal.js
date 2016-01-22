Game.EntityMixin.Mortal = (function () {
  "use strict";

  return {
    kill: function (killer) {
      var key = this.getStoreKey();
      if (key != null) {
        Game.state.entities.remove(key);
      }

      if (killer.getModel().getId() === "avatar") {
        Game.Message.send("You kill the " + this.getModel().getName() + ".");
      }
      else {
        Game.Message.send("The " + killer.getModel().getName() + " kills the " + this.getModel().getName() + ".");
      }
    },
  };
})();
