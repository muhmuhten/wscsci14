Game.Map = (function () {
  "use strict";

  function Map(attr) {
    this.attr = this.attr || {};
    this.attr.tiles = attr.tiles;
    this.attr.cameraX = attr.cameraX || 0;
    this.attr.cameraY = attr.cameraY || 0;
    this.width = attr.tiles.length;
    this.height = attr.tiles[0].length;
  }

  Map.prototype.getWidth = function () {
    return this.width;
  };
  Map.prototype.getHeight = function () {
    return this.height;
  };
  Map.prototype.getCameraX = function () {
    return this.attr.cameraX;
  };
  Map.prototype.getCameraY = function () {
    return this.attr.cameraY;
  };
  Map.prototype.moveCamera = function (x,y) {
    this.attr.cameraX += x;
    this.attr.cameraY += y;
  };

  Map.prototype.getTile = function (x,y) {
    return Game.Tile.db[(this.attr.tiles[x] || [])[y] || "wall"];
  };

  Map.prototype.render = function (disp) {
    var dispX = disp.getOptions().width;
    var dispY = disp.getOptions().height;
    var xoff = this.getCameraX() - (dispX/2)|0;
    var yoff = this.getCameraY() - (dispY/2)|0;

    for (var x = 0; x < dispX; x++) {
      for (var y = 0; y < dispY; y++) {
        this.getTile(xoff+x, yoff+y).render(disp, x,y);
      }
    }

    Game.state.entities.each(function (ent) {
      ent.getModel().render(disp, ent.getX() - xoff, ent.getY() - yoff);
    });
  };

  return Map;
})();
