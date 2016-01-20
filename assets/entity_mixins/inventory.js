Game.EntityMixin.Inventory = (function () {
  "use strict";
  
  return {
    _meta: {
      init: function (attr) {
        this.attr.Inventory = attr.Inventory || {};
      },
    },

    gain: function (it) {
      this.attr.Inventory[it.getStoreKey()] = 1;
    },
    lose: function (it) {
      delete this.attr.Inventory[it.getStoreKey()];
    },

    getItems: function () {
      var accum = [];
      for (var k in this.attr.Inventory) {
        if (!this.attr.Inventory.hasOwnProperty(k)) continue;
        accum.push(Game.state.entities.get(k));
      }
      return accum;
    },
  };
})();
