Game.EntityMixin.UpGoerFive = (function () {
  "use strict";

  var rand = ROT.RNG.getUniform.bind(ROT.RNG);

  return {
    act: function () {
      var a = Game.state.entities.getAvatar();

      var dx = a.getX() - this.getX();
      var dy = a.getY() - this.getY();

      var x = 0, y = 0;

      if (rand() < 0.5) x = dx / Math.abs(dx);
      if (rand() < 0.5) y = dx / Math.abs(dy);
      if (rand() < 0.5) x = rand() < 0.5 ? 1 : -1;
      if (rand() < 0.5) y = rand() < 0.5 ? 1 : -1;

      this.walk(x, y);
      this.delay(10);
    },
  };
})();
