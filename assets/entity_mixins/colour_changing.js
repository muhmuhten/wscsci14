Game.EntityMixin.ColourChanging = (function () {
  "use strict";

  return {
    render: function () {
      var model = this.getModel();
      model.fg = ROT.Color.toHex(
          ROT.Color.randomize([200,200,200], [75,75,75]));
      model.render.apply(model, arguments);
    },
  };
})();
