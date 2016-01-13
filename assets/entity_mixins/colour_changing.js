Game.EntityMixin.ColourChanging = (function () {
  "use strict";

  return {
    render: function () {
      var model = this.getModel();
      model.fg = ROT.Color.toHex(
          ROT.Color.randomize(
            ROT.Color.fromString(this.getModel().fg),
            [10,10,10]));
      model.render.apply(model, arguments);
    },
  };
})();
