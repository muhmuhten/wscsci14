Game.Map = (function () {
  "use strict";

  function Map(attr) {
    if (this.attr == null) this.attr = {};
    this.attr.tiles = attr.tiles;
    this.attr.width = attr.tiles.length;
    this.attr.height = attr.tiles[0].length;
  }

  Map.prototype.getWidth = function () {
    return this.attr.width;
  };
  Map.prototype.getHeight = function () {
    return this.attr.height;
  };

  Map.prototype.getTile = function (x,y) {
    return this.attr.tiles[x][y] || Game.Tile.empty;
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
