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

    kill: function () {
      Game.Message.send("You die...");
      Game.initMode("lose");
    },
  };
})();
