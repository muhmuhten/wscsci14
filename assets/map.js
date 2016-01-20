Game.Map = (function () {
  "use strict";

  function Map(attr) {
    this.attr = this.attr || {};
    this.attr.tiles = attr.tiles;
    this.attr.known = attr.known || {};
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
    return Game.Tile.db[(this.attr.tiles[x] || [])[y] || "empty"];
  };

  Map.prototype.setKnown = function (x,y, c) {
    this.attr.known[x] = this.attr.known[x] || {};
    this.attr.known[x][y] = c;
  }
  Map.prototype.getKnown = function (x,y) {
    return this.attr.known[x] && this.attr.known[x][y];
  }

  Map.prototype.chooseTile = function (f, tries) {
    tries = tries || 200;

    var x, y;
    do {
      x = ROT.RNG.getUniformInt(0, this.getWidth()-1);
      y = ROT.RNG.getUniformInt(0, this.getHeight()-1);

      if (!f || f(this.getTile(x,y), x, y)) break;
    } while (--tries);

    return {x: x, y: y};
  };
  Map.prototype.chooseWalkableTile = function (tries) {
    var lookup = {};
    Game.state.entities.spam("locate", lookup);

    return this.chooseTile(function (t, x,y) {
      return t.canWalk() && !(lookup[x] || {})[y];
    }, tries);
  };

  Map.prototype.render = function (disp) {
    var dispX = disp.getOptions().width;
    var dispY = disp.getOptions().height;

    var avatar = Game.state.entities.getAvatar();
    var youX = avatar.intX();
    var youY = avatar.intY();

    var offX = youX - dispX/2;
    this.offX = this.offX || offX;
    while (this.offX > offX + 8) this.offX -= 4;
    while (this.offX < offX - 8) this.offX += 4;
    offX = this.offX |= 0;

    var offY = youY - dispY/2;
    this.offY = this.offY || offY;
    while (this.offY > offY + 8) this.offY -= 4;
    while (this.offY < offY - 8) this.offY += 4;
    offY = this.offY |= 0;

    for (var vx = 0; vx < dispX; vx++) {
      for (var vy = 0; vy < dispY; vy++) {
        var x = vx + offX;
        var y = vy + offY;
        var k = this.getKnown(x,y);
        if (!k) continue;
        new Game.Symbol({chr: k}).render(disp, vx,vy);
      }
    }

    var lookup = {};
    Game.state.entities.spam("locate", lookup);

    var map = this;
    var fov = new ROT.FOV.PreciseShadowcasting(function (x,y) {
      return map.getTile(x,y).canSee() || (x == youX && y == youY);
    });
    fov.compute(youX, youY, 90, function (x,y,r) {
      var vx = x - offX, vy = y - offY;
      var sym = map.getTile(x,y);
      map.setKnown(x,y, sym.getChr());
      sym.render(disp, vx,vy);

      if (lookup[x] && lookup[x][y]) {
        lookup[x][y].sort(function (a,b) {
          return a.getPriority() - b.getPriority();
        });
        var ent = lookup[x][y][0];
        var vx = ent.getX() - offX, vy = ent.getY() - offY;
        if (lookup[x][y].length > 1) {
          ent.getModel().render(disp, vx,vy, null, lookup[x][y][1].getFg());
        }
        else {
          ent.getModel().render(disp, vx,vy);
        }
      }
    });
  };

  return Map;
})();
