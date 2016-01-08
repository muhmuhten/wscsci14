Game.Tile = (function () {
  "use strict";

  function Tile(attr) {
    Game.Symbol.call(this, attr);
    if (this.attr == null) this.attr = {};
  }
  Tile.extend(Game.Symbol);

  Tile.empty = new Tile({name: "empty", chr: ' '});
  Tile.floor = new Tile({name: "floor", chr: '.'});
  Tile.wall = new Tile({name: "wall", chr: '#'});

  return Tile;
})();
