var eggRotate,
    audio = new Audio("assets/audio/flood.mp3");
    stopEggControl = { called: false };
    eggWidthDefault = 400,
    eggWidth = 0,
    direction = 'up',
    egg = document.getElementById('egg'),
    inhabitant = document.getElementById('inhabitant'),
    selectedInhabitantId = null,
    inhabitantIds = [
      'chicken', 'chicken', 'chicken', 'chicken', 'chicken', 'chicken', 'chicken',
      'spray', 'spray',
      'creepy'
    ];

var getRandomInt = function(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var addChicken = function() {
  rotation = getRandomInt(1, 360);
  document.body.innerHTML +=
    '<img ' +
      'src="assets/images/' + 'chicken_a' + '.png" ' +
      'style="position: fixed; ' +
      'top: ' + getRandomInt(1, 100) + '%; ' +
      'left: ' + getRandomInt(1, 100) + '%; ' +
      '-ms-transform: rotate(' + rotation + 'deg); ' +
      '-webkit-transform: rotate(' + rotation + 'deg); ' +
      'transform: rotate(' + rotation + 'deg); ' +
      'z-index: 100;"' +
     '/>';
};

var chickenFlood = function() {
  audio.play();
  setTimeout(function(){
    setInterval(addChicken, 50);
  }, 1500);
};

var center = function() {
  if (selectedInhabitantId == 'spray' || selectedInhabitantId == 'creepy') {
    chickenFlood();
  };
  window.scrollTo(0, 120);
};

var stopEggRotate = function(){
  clearInterval(eggRotate);
  egg.style.width = eggWidthDefault;
  inhabitant.style.display = 'block';
  egg.style.background = 'transparent';
  setTimeout(center, 500);
};

var startEggRotate = function(){
  eggRotate = setInterval(function () {
    if (direction == 'up') {
      if (eggWidth < eggWidthDefault) eggWidth += 1;
      if (eggWidth == eggWidthDefault) {
        direction = 'down';
        if (stopEggControl.called) stopEggRotate();
      }
    } else if (direction == 'down') {
      if (eggWidth > 0) eggWidth -= 1;
      if (eggWidth == 0) {
        direction = 'up';
      }
    }
    egg.style.width = eggWidth + 'px';
  }, 1);
};

var pickInhabitantById = function() {
  selectedInhabitantId = inhabitantIds[Math.floor(Math.random() * inhabitantIds.length)];
  document.getElementById(selectedInhabitantId).style.display = 'block';
};

var start = function(){
  pickInhabitantById();
  stopEggControl.called = false;
  startEggRotate();
};

var stop = function(){
  stopEggControl.called = true;
};
