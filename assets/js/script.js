var eggRotate,
    audio,
    customizer = document.getElementById("customizer"),
    stopEggControl = { called: false },
    eggWidthDefault = 400,
    eggWidth = 0,
    direction = 'up',
    egg = document.getElementById('egg'),
    inhabitant = document.getElementById('inhabitant'),
    selectedInhabitantId = null,
    inhabitantIds = [
      'chicken', 'chicken', 'chicken', 'chicken',
      'chicken', 'chicken', 'chicken', 'chicken',
      'spray',
      'creepy'
    ];

var getUrlVars = function() {
  var vars = {};
  var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
    vars[key] = value;
  });
  return vars;
}

var isStatic = function(){
  return getUrlVars()['static'] == 'true';
}

var setInhabitantIdByUrl = function() {
  var inh = ['chicken', 'foos', 'heart', 'spray', 'creepy', 'ljackson', 'owl',
             'surf', 'harry', 'cochanovius', 'theatre', 'deer', 'thai', 'tank'];
  var predefinedInhabitantId = getUrlVars()['inhabitant'];
  if (!!predefinedInhabitantId && inh.indexOf(predefinedInhabitantId) != -1)
    selectedInhabitantId = predefinedInhabitantId;
}

customize = function(){
  name = this.value.toLowerCase();
  switch (name) {
    case 'aga':
      var possible = ['owl', 'owl', 'heart'];
      var customized = possible[Math.floor(Math.random() * possible.length)]
      break;
    case 'bator':
      var customized = 'surf';
      break;
    case 'gosia':
      var customized = 'harry';
      break;
    case 'mama':
      var customized = 'cochanovius';
      break;
    case 'michal':
      var customized = 'theatre';
      break;
    case 'monika':
      var customized = 'deer';
      break;
    case 'jasiek':
      var customized = 'ljackson';
      break;
    case 'kkps':
      var customized = 'foos';
      break;
    case 'raczadam':
      var customized = 'thai';
      break;
    case 'tata':
      var customized = 'tank';
      break;
    default:
      var customized = null;
  }
  if (!selectedInhabitantId) selectedInhabitantId = customized;
}

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

var showInhabitant = function(){
  document.getElementById(selectedInhabitantId).style.display = 'block';
};

var pickInhabitantById = function() {
  if (!selectedInhabitantId) selectedInhabitantId = inhabitantIds[Math.floor(Math.random() * inhabitantIds.length)];
  if (selectedInhabitantId == 'spray' || selectedInhabitantId == 'creepy') audio = new Audio("assets/audio/flood.mp3");
  showInhabitant();
};

var start = function(){
  stopEggControl.called = false;
  startEggRotate();
};

var stop = function(){
  pickInhabitantById();
  stopEggControl.called = true;
};
