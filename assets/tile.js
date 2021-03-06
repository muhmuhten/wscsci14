Game.Tile = (function () {
  "use strict";

  function Tile(attr) {
    Game.Symbol.call(this, attr);
    this.id = attr.id;
    this.walkable = attr.walkable;
    this.seethrough = attr.seethrough;
  }
  Tile.extend(Game.Symbol);

  Tile.prototype.getId = function () {
    return this.id;
  };
  Tile.prototype.canWalk = function () {
    return this.walkable;
  };
  Tile.prototype.canSee = function () {
    return this.seethrough;
  };

  Tile.db = {};
  Tile.register = function (t) {
    this.db[t.getId()] = t;
  };

  Tile.register(new Tile({
    id: "empty",
    chr: '#',
    fg: "white"
  }));
  Tile.register(new Tile({
    id: "floor",
    chr: '.',
    walkable: true,
    seethrough: true
  }));
  Tile.register(new Tile({
    id: "wall",
    chr: '#',
    fg: "gold"
  }));
  Tile.register(new Tile({
    id: "exit",
    chr: '<',
    fg: "blue",
    walkable: true
  }));

  Tile.register(new Tile({
    id: "crystal",
    chr: '#',
    fg: "cyan",
    seethrough: true
  }));

  return Tile;
})();
