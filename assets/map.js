Game.Map = (function () {
  "use strict";

  function Map(attr) {
    this.attr = this.attr || {};
    this.attr.tiles = attr.tiles;
    this.width = attr.tiles.length;
    this.height = attr.tiles[0].length;
  }

  Map.prototype.getWidth = function () {
    return this.width;
  };
  Map.prototype.getHeight = function () {
    return this.height;
  };

  Map.prototype.getTile = function (x,y) {
    return Game.Tile.db[this.attr.tiles[x][y] || "empty"];
  };

  Map.prototype.render = function (disp) {
    for (var x = this.getWidth()-1; x >= 0; x--) {
      for (var y = this.getWidth()-1; y >= 0; y--) {
        this.getTile(x,y).render(disp, x,y);
      }
    }
  };

  return Map;
})();
