Game.Tile = (function () {
  "use strict";

  function Tile(attr) {
    Game.Symbol.call(this, attr);
    this.id = attr.id;
  }
  Tile.extend(Game.Symbol);

  Tile.prototype.getId = function () {
    return this.id;
  };

  Tile.db = {};
  Tile.register = function (t) {
    this.db[t.getId()] = t;
  };

  Tile.register(new Tile({
    id: "empty",
    chr: ' '
  }));
  Tile.register(new Tile({
    id: "floor",
    chr: '.'
  }));
  Tile.register(new Tile({
    id: "wall",
    chr: '#',
    fg: "gold"
  }));

  return Tile;
})();
