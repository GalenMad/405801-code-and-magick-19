'use strict';

window.renderStatistics = function (ctx, names, times) {

  function getRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function generateUserColor(currentName) {
    if (currentName === 'Вы') {
      return 'rgba(255, 0, 0, 1)';
    } else {
      return 'hsl(221, ' + getRandomInteger(10, 100) + '%, ' + getRandomInteger(30, 70) + '%)';
    }
  }

  function getMaxOfArray (numArray) {
    var maxNumber = numArray[0];
    for (var i = 1; i < numArray.length; i++) {
      if (maxNumber <= numArray[i]) {
        maxNumber = numArray[i];
      }
    }
    return Math.round(maxNumber);
  }

  function renderRectangles(numArray) {
    var renderPoint = 135;
    var coefficient = 145 / getMaxOfArray(numArray);

    for (var i = 0; i < numArray.length; i++) {
      var currentRecord = '' + Math.round(numArray[i]);
      var currentName = names[i];
      var rectangleHeight = -(coefficient * numArray[i]);
      var recordPosition = (240 + rectangleHeight - 20);
      ctx.fillStyle = 'black';
      ctx.fillText(currentRecord, renderPoint, recordPosition);
      ctx.fillText(currentName, renderPoint, 250);
      ctx.fillStyle = generateUserColor(currentName);
      ctx.fillRect(renderPoint, 240, 40, rectangleHeight);
      renderPoint += 90;
    }
  }

  ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
  ctx.fillRect(110, 20, 420, 270);
  ctx.fillStyle = 'white';
  ctx.strokeRect(100, 10, 420, 270);
  ctx.fillRect(100, 10, 420, 270);
  ctx.fillStyle = 'black';
  ctx.font = '16px PT Mono';
  ctx.textBaseline = 'hanging';
  ctx.fillText('Ура, вы победили!', 120, 30);
  ctx.fillText('Список результатов:', 120, 50);
  renderRectangles(times);
};
