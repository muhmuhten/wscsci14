Game.EntityMixin.Avatar = (function () {
  "use strict";

  return {
    act: function () {
      if (this.nextAction) {
        this.nextAction = this.nextAction();
      }
      else {
        this.setDelay(0);
      }
    },

    kill: function (killer) {
      Game.Message.send("The " + killer.getModel().getName() + " kills you!");
      Game.Message.send("You die...");
      Game.initMode("lose");
    },
  };
})();
