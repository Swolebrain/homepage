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
    td.innerHTML = "Victor".substr(idx, 1);
  });
  var moreno = document.querySelectorAll(".moreno");
  Array.prototype.forEach.call(moreno, function(td, idx){
    td.innerHTML = "Moreno".substr(idx, 1);
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
    var lit = document.querySelectorAll(".luminous");
    Array.prototype.forEach.call(lit, function(e){
      e.classList.add("dim");
    });
    luminousR += Math.random()>0.5?0:startDirectionY;
    luminousC += Math.random()>0.65?0:startDirectionX;
    if (luminousR < 0 || luminousC < 0 ) return;
    var elem = document.getElementById(luminousR+"-"+luminousC);
    if (!elem) return;
    elem.classList.add("luminous");
    setTimeout(tickWave, 200);
  }
}

setInterval(startWave, 300);


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
