'use strict';

(function () {

  var ESC_KEY = 'Escape';
  var ENTER_KEY = 'Enter';

  var firstNames = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var lastNames = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var coatColors = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var eyesColors = ['black', 'red', 'blue', 'yellow', 'green'];
  var fireballColors = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
  var wizardsCount = 4;

  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
  var similarListElement = document.querySelector('.setup-similar-list');

  var setupWindow = document.querySelector('.setup');
  var setupOpenButton = document.querySelector('.setup-open');
  var setupOpenButtonIcon = document.querySelector('.setup-open-icon');
  var setupCloseButton = setupWindow.querySelector('.setup-close');
  var setupNameInput = setupWindow.querySelector('.setup-user-name');

  var setupPlayer = setupWindow.querySelector('.setup-player');
  var playerWizardCoat = setupPlayer.querySelector('.wizard-coat');
  var playerWizardEyes = setupPlayer.querySelector('.wizard-eyes');
  var playerWizardFireball = setupPlayer.querySelector('.setup-fireball-wrap');

  var playerCoatIndex = coatColors.indexOf(setupPlayer.querySelector('input[name="coat-color"]').value);
  var playerEyesIndex = eyesColors.indexOf(setupPlayer.querySelector('input[name="eyes-color"]').value);
  var playerFireballIndex = fireballColors.indexOf(setupPlayer.querySelector('input[name="fireball-color"]').value);

  function getRandomInteger(max) {
    return Math.floor(Math.random() * (max + 1));
  }

  function getRandomValue(array) {
    var max = getRandomInteger(array.length - 1);
    return array[getRandomInteger(max)];
  }

  function generateRandomWizards(iterationCount) {
    var randomWizards = [];
    for (var i = iterationCount; i > 0; --i) {
      var wizard = {
        name: getRandomValue(firstNames) + ' ' + getRandomValue(lastNames),
        coatColor: getRandomValue(coatColors),
        eyesColor: getRandomValue(eyesColors)
      };
      randomWizards.push(wizard);
    }
    return randomWizards;
  }

  function renderSimilarWizards(wizards) {
    var similarWizardScope = document.createDocumentFragment();
    for (var i = 0; i < wizards.length; i++) {
      var wizardElement = similarWizardTemplate.cloneNode(true);
      wizardElement.querySelector('.setup-similar-label').textContent = wizards[i].name;
      wizardElement.querySelector('.wizard-coat').setAttribute('fill', wizards[i].coatColor);
      wizardElement.querySelector('.wizard-eyes').setAttribute('fill', wizards[i].eyesColor);
      similarWizardScope.appendChild(wizardElement);
    }
    similarListElement.appendChild(similarWizardScope);
  }

  renderSimilarWizards(generateRandomWizards(wizardsCount));

  function onSetupOpenButtonEnterPress(evt) {
    if (evt.key === ENTER_KEY) {
      openSetup();
    }
  }

  function onSetupCloseButtonEnterPress(evt) {
    if (evt.key === ENTER_KEY) {
      closeSetup();
    }
  }

  function onSetupWindowEscapePress(evt) {
    if (evt.key === ESC_KEY && !evt.target.matches('input')) {
      closeSetup();
    }
  }

  function openSetup() {
    setupWindow.classList.remove('hidden');

    setupOpenButton.removeEventListener('keydown', onSetupOpenButtonEnterPress);
    setupOpenButton.removeEventListener('click', openSetup);

    document.addEventListener('keydown', onSetupWindowEscapePress);
    setupCloseButton.addEventListener('keydown', onSetupCloseButtonEnterPress);
    setupCloseButton.addEventListener('click', closeSetup);
  }

  function closeSetup() {
    setupWindow.classList.add('hidden');

    document.removeEventListener('keydown', onSetupWindowEscapePress);
    setupCloseButton.removeEventListener('keydown', onSetupCloseButtonEnterPress);
    setupCloseButton.removeEventListener('click', closeSetup);

    setupOpenButton.addEventListener('keydown', onSetupOpenButtonEnterPress);
    setupOpenButton.addEventListener('click', openSetup);
  }

  setupOpenButton.addEventListener('keydown', onSetupOpenButtonEnterPress);
  setupOpenButton.addEventListener('click', openSetup);
  setupPlayer.addEventListener('click', function (evt) {
    if (evt.target === playerWizardCoat) {
      playerCoatIndex = playerCoatIndex < (coatColors.length - 1) ? playerCoatIndex + 1 : 0;
      playerWizardCoat.style = 'fill: ' + coatColors[playerCoatIndex];
      setupPlayer.querySelector('input[name="coat-color"]').value = coatColors[playerCoatIndex];
    } else if (evt.target === playerWizardEyes) {
      playerEyesIndex = playerEyesIndex < (eyesColors.length - 1) ? playerEyesIndex + 1 : 0;
      playerWizardEyes.style = 'fill: ' + eyesColors[playerEyesIndex];
      setupPlayer.querySelector('input[name="eyes-color"]').value = eyesColors[playerEyesIndex];
    } else if (evt.target === playerWizardFireball || evt.target === playerWizardFireball.children[0]) {
      playerFireballIndex = playerFireballIndex < (fireballColors.length - 1) ? playerFireballIndex + 1 : 0;
      playerWizardFireball.style = 'background: ' + fireballColors[playerFireballIndex];
      setupPlayer.querySelector('input[name="fireball-color"]').value = fireballColors[playerFireballIndex];
    }
  });

  document.querySelector('.setup-similar').classList.remove('hidden');
  document.querySelector('.setup-wizard-form').setAttribute('action', 'https://js.dump.academy/code-and-magick');
  setupNameInput.setAttribute('minlength', '2');
  setupNameInput.setAttribute('maxlength', '25');
  setupOpenButtonIcon.setAttribute('tabindex', '0');
  setupCloseButton.setAttribute('tabindex', '0');
})();
