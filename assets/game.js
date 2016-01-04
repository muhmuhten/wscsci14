console.log("hello console");

var Game = {
  init: function () {
    console.log("WSRL Live Initialization");
    Game.DISPLAYS.main.o = new ROT.Display(Game.DISPLAYS.main);
  },
  getDisplay: function (displayName) {
    return Game.DISPLAYS[displayName].o;
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
