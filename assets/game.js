console.log("hello console");

var Game = {
  init: function () {
    console.log("WSRL Live Initialization");
    this.DISPLAYS.main.o = new ROT.Display(this.DISPLAYS.main);
    this.renderMain();
  },
  getDisplay: function (displayName) {
    return this.DISPLAYS[displayName].o;
  },
  renderMain: function () {
    for (var i = 0; i < 5; i++) {
      this.DISPLAYS.main.o.drawText(2,3+i, "TADA!!!");
    }
  },
  DISPLAYS: {
    main: {
      width: 80,
      height: 24,
      o: null
    },
  },
};

window.onload = function() {
  console.log("starting WSRL - window loaded");
  // Check if rot.js can work on this browser
  if (!ROT.isSupported()) {
    alert("The rot.js library isn't supported by your browser.");
    return;
  }

  // Initialize the game
  Game.init();

  // Add the containers to our HTML page
  document.getElementById('wsrl-main-display').appendChild(Game.getDisplay('main').getContainer());
};
