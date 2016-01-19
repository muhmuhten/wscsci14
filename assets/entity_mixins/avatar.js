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
  };
})();
