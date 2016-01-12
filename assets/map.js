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
    return Game.Tile.db[(this.attr.tiles[x] || [])[y] || "wall"];
  };

  Map.prototype.chooseTile = function (f, tries) {
    tries = tries || 200;

    var x, y;
    do {
      x = ROT.RNG.getUniformInt(0, this.getWidth()-1);
      y = ROT.RNG.getUniformInt(0, this.getHeight()-1);

      if (!f || f(this.getTile(x,y))) break;
    } while (--tries);

    return [x,y];
  };
  Map.prototype.chooseWalkableTile = function (tries) {
    return this.chooseTile(function (t) {
      return t.canWalk();
    }, tries);
  };

  Map.prototype.render = function (disp) {
    var dispX = disp.getOptions().width;
    var dispY = disp.getOptions().height;
    
    var avatar = Game.state.entities.getAvatar();
    var xoff = avatar.getX() - (dispX/2) |0;
    var yoff = avatar.getY() - (dispY/2) |0;

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
