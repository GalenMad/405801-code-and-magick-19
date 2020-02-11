'use strict';

var firstNames = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var lastNames = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var coatColors = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var eyesColors = ['black', 'red', 'blue', 'yellow', 'green'];
var wizardsCount = 4;
var randomWizards = [];
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
var similarListElement = document.querySelector('.setup-similar-list');

function getRandomInteger(max) {
  return Math.floor(Math.random() * (max + 1));
}

function getRandomValue(array) {
  var max = getRandomInteger(array.length - 1);
  return array[getRandomInteger(max)];
}

function addRandomWizards(iterationCount) {
  for (var i = iterationCount; i > 0; --i) {
    var wizard = {
      name: getRandomValue(firstNames) + ' ' + getRandomValue(lastNames),
      coatColor: getRandomValue(coatColors),
      eyesColor: getRandomValue(eyesColors)
    };
    randomWizards.push(wizard);
  }
}

function renderSimilarWizards() {
  var similarWizardScope = document.createDocumentFragment();
  for (var i = 0; i < randomWizards.length; i++) {
    var wizardElement = similarWizardTemplate.cloneNode(true);
    wizardElement.querySelector('.setup-similar-label').textContent = randomWizards[i].name;
    wizardElement.querySelector('.wizard-coat').setAttribute('fill', randomWizards[i].coatColor);
    wizardElement.querySelector('.wizard-eyes').setAttribute('fill', randomWizards[i].eyesColor);
    similarWizardScope.appendChild(wizardElement);
  }
  similarListElement.appendChild(similarWizardScope);
}

addRandomWizards(wizardsCount);
renderSimilarWizards();

document.querySelector('.setup').classList.remove('hidden');
document.querySelector('.setup-similar').classList.remove('hidden');
