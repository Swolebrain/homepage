/*
  initialize electric area
*/
function initializeElectric(){
  var electric = document.getElementById("electric");
  electric.innerHTML = "";
  var maxRows = 10, maxCols = 20, vIndex = 35, mIndex = 47;
  if (window.innerWidth < window.innerHeight){
    maxRows = 15;
    maxCols = 10;
    vIndex = 31;
    mIndex = 73;
  }

  for (var r = 0; r < maxRows; r++){
    var row = document.createElement("div");
    for (var c = 0; c < maxCols; c++){
      var cell = document.createElement("div");
      cell.classList.add("cell");
      cell.id = r+"-"+c;
      cell.setAttribute("row", r);
      cell.setAttribute("col", c);
      if (r == Math.floor(vIndex/10) && c >= vIndex%10 && c <= vIndex%10+6){
        cell.classList.add("victor");
      }
      if (r == Math.floor(mIndex/10) && c >= mIndex%10 && c <= mIndex%10+6){
        cell.classList.add("moreno");
      }
      cell.innerHTML = Math.round(Math.random());
      row.appendChild(cell);
    }
    electric.appendChild(row);
  }
  writeVictor();
}

function writeVictor(){
  var victor = document.querySelectorAll(".victor");
  Array.prototype.forEach.call(victor, function(td, idx){
    td.innerHTML = "VICTOR".substr(idx, 1);
  });
  var moreno = document.querySelectorAll(".moreno");
  Array.prototype.forEach.call(moreno, function(td, idx){
    td.innerHTML = "MORENO".substr(idx, 1);
  });
}

window.onresize = initializeElectric;
window.onload = initializeElectric;

function generateRandomLetter(){
  return String.fromCharCode(Math.floor(Math.random()*59 + 63));
}

function startWave(){
  var startWord = document.querySelectorAll(".victor"),
      startDirectionX = -1, startDirectionY = -1;
  if (Math.random() < 0.5){
    startWord = document.querySelectorAll(".moreno"),
        startDirectionY = 1;
  }
  if (Math.random() < 0.5){
    startDirectionX = 1;
  }
  var startLetter = startWord[Math.floor(Math.random()*startWord.length-1)];
  if (!startLetter) return;
  var luminousR = Number(startLetter.getAttribute("row"));
  var luminousC = Number(startLetter.getAttribute("col"));
  tickWave();

  function tickWave(){
    luminousR += Math.random()>0.5?0:startDirectionY;
    luminousC += Math.random()>0.65?0:startDirectionX;
    if (luminousR < 0 || luminousC < 0 ) return;
    var elem = document.getElementById(luminousR+"-"+luminousC);
    if (!elem) return;
    elem.classList.add("luminous");
    setTimeout(function(){
      elem.classList.remove("luminous");
      elem.classList.add("dim");
    },300);
    setTimeout(tickWave, 200);
  }
}

setInterval(startWave, 200);


/*

SCROLL HANDLER

*/

document.onscroll = function(){
  var skills = document.getElementById('skills');
  var topVal = skills.getBoundingClientRect().top;
  if (topVal < document.body.scrollTop){
    var proficiencies = document.querySelectorAll('.proficiency');
    Array.prototype.forEach.call(proficiencies, function($prof){
      $prof.classList.add("animated");
    });
  }
}

/*
  FORM SUBMIT
*/
document.getElementById("form-submit").addEventListener("click", function(){
  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var msg = document.getElementById("msg").value;
  if (!name) return displayAlert("You must enter your name");
  if (!email) return displayAlert("Please enter your email");
  if (!msg) return displayAlert("Please enter your Request");
  var xhr = new XMLHttpRequest();
  xhr.open('POST', 'http://www.titanhack.com:8001/');
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onload = function(){
    console.log(this.status);
    displayAlert("Message sent successfully!");
  }
  xhr.send(JSON.stringify({name:name, email:email, message: msg}));
});

var timeout;
function displayAlert(str){
  clearTimeout(timeout);
  var feedback = document.getElementById("feedback");
  feedback.innerHTML = str;
  feedback.classList.remove("hidden");
  timeout = setTimeout(function(){
    feedback.classList.add("hidden");
  },1500);
}

/*
  Bottom Canvas
*/

var wires = new Image();
wires.src="../img/wires.png";
wires.onload = function(){
  c.height = wires.naturalHeight;
  canvasLoop();
};
var c = document.getElementById("canvas");
var ctx = c.getContext("2d");
c.width = window.innerWidth;
c.height = window.innerHeight/4;

var x = 0, y = 0;
function canvasLoop(){
  ctx.clearRect(0,0,c.width, c.height);
  for (var offset = x; offset <= window.innerWidth; offset+=wires.naturalWidth){
    ctx.drawImage(wires, offset, y);
  }
  x -= 0.1;
  if (x <= -wires.naturalWidth){
    x = 0;
  }
  window.requestAnimationFrame(canvasLoop);
}
