Game.EntityMixin.ColourChanging = (function () {
  "use strict";

  return {
    render: function (disp, x,y) {
      this.getModel().fg = ROT.Color.toHex(
          ROT.Color.randomize(
            ROT.Color.fromString(this.getModel().fg),
            [10,10,10]));
      this.getModel().render(disp, x,y);
    },
  };
})();
