Game.Tile = (function () {
  "use strict";

  function Tile(attr) {
    Game.Symbol.call(this, attr);
    this.id = attr.id;
    this.walkable = attr.walkable;
  }
  Tile.extend(Game.Symbol);

  Tile.prototype.getId = function () {
    return this.id;
  };
  Tile.prototype.canWalk = function () {
    return this.walkable;
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
    chr: '.',
    walkable: true
  }));
  Tile.register(new Tile({
    id: "wall",
    chr: '#',
    fg: "gold"
  }));

  Tile.register(new Tile({
    id: "crystal",
    chr: '#'
  }));
  Tile.db.crystal.getFg = function () {
    return ROT.Color.toHex(ROT.Color.randomize([100,100,100], [100,100,100]));
  };

  return Tile;
})();
