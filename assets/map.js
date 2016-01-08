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
    return this.attr.tiles[x][y] || Game.Tiles.empty;
  };

  return Map;
})();
