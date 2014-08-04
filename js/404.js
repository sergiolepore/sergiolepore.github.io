$(document).ready(function() {
  if (window.HTMLAudioElement) {
    var snd = new Audio('');
    var loop = new SeamlessLoop();
    var canMp3 = false;
    var canOgg = false;
    var $eye = $('#eye');
    var eyeTalkCfg = {
      intervalFn: null,
      loopTime: 10, //ms
      totalTime: 4500, //ms
      startPos1: 22,
      endPos1: 42,
      startPos2: 27,
      endPos2: 57,
      inverted: false
    };
    var totIterations = parseInt(eyeTalkCfg.totalTime / eyeTalkCfg.loopTime, 10);
    var currIteration = 0;
    var easingValue1;
    var easingValue2;

    if(snd.canPlayType('audio/ogg')) {
      canOgg = true;
    }
    else if(snd.canPlayType('audio/mp3')) {
      canMp3 = true;
    }

    if (canMp3 || canOgg) {
      if (canMp3) {
        loop.addUri("/sounds/background.mp3", 28085, "sound1");
        loop.addUri("/sounds/background.mp3", 28085, "sound2");
        snd = new Audio('/sounds/error.mp3');
      } else if (canOgg) {
        loop.addUri("/sounds/background.ogg", 28085, "sound1");
        loop.addUri("/sounds/background.ogg", 28085, "sound2");
        snd = new Audio('/sounds/error.ogg');
      }

      function soundsLoaded() {
        var n = 1;
        loop.start("sound" + n);
        n++;
        loop.update("sound" + n, false);
      }

      loop.callback(soundsLoaded);

      function easeInOutSine(currentIteration, startValue, changeInValue, totalIterations) {
        return changeInValue / 2 * (1 - Math.cos(Math.PI * currentIteration / totalIterations)) + startValue;
      }

      function talk() {
        var sp1;
        var sp2;
        var ep1;
        var ep2;

        if (currIteration > totIterations) {
          currIteration = 0;
          eyeTalkCfg.inverted = !eyeTalkCfg.inverted;
        }

        if (!eyeTalkCfg.inverted) {
          sp1 = eyeTalkCfg.startPos1;
          ep1 = eyeTalkCfg.endPos1-sp1;
          sp2 = eyeTalkCfg.startPos2;
          ep2 = eyeTalkCfg.endPos2-sp2;
        } else {
          sp1 = eyeTalkCfg.endPos1;
          ep1 = (sp1-eyeTalkCfg.startPos1)*-1;
          sp2 = eyeTalkCfg.endPos2;
          ep2 = (sp2-eyeTalkCfg.startPos2)*-1;
        }

        animateEye(currIteration, totIterations, sp1, ep1, sp2, ep2);
        currIteration++;
      }

      function animateEye(it, totIt, startPos1, endPos1, startPos2, endPos2) {
        easingValue1 = easeInOutSine(it, startPos1, endPos1, totIt);
        easingValue2 = easeInOutSine(it, startPos2, endPos2, totIt);

        changeEyeCss(easingValue1, easingValue2);
      }

      function changeEyeCss(value1, value2) {
        $eye.css({
          background: "radial-gradient(#FFFeee 0%, #FFF000 5%, #FF0000 8%, #870000 %value1%, #290000 %value2%, #290707 37%, #3D0A0A 42%, #270C0C 47%, #1E0C0C 100%)".replace(/%value1/, value1).replace(/%value2/, value2)
        }).css({
          background: "-ms-radial-gradient(#FFFeee 0%, #FFF000 5%, #FF0000 8%, #870000 %value1%, #290000 %value2%, #290707 37%, #3D0A0A 42%, #270C0C 47%, #1E0C0C 100%)".replace(/%value1/, value1).replace(/%value2/, value2)
        }).css({
          background: "-webkt-radial-gradient(#FFFeee 0%, #FFF000 5%, #FF0000 8%, #870000 %value1%, #290000 %value2%, #290707 37%, #3D0A0A 42%, #270C0C 47%, #1E0C0C 100%)".replace(/%value1/, value1).replace(/%value2/, value2)
        }).css({
          background: "-moz-radial-gradient(#FFFeee 0%, #FFF000 5%, #FF0000 8%, #870000 %value1%, #290000 %value2%, #290707 37%, #3D0A0A 42%, #270C0C 47%, #1E0C0C 100%)".replace(/%value1/, value1).replace(/%value2/, value2)
        }).css({
          background: "-o-radial-gradient(#FFFeee 0%, #FFF000 5%, #FF0000 8%, #870000 %value1%, #290000 %value2%, #290707 37%, #3D0A0A 42%, #270C0C 47%, #1E0C0C 100%)".replace(/%value1/, value1).replace(/%value2/, value2)
        });
      }

      setTimeout(function() {
        snd.play();

        if ($('html').hasClass('desktop')) {
          eyeTalkCfg.intervalFn = setInterval(talk, eyeTalkCfg.loopTime);
          setTimeout(function() {
            clearInterval(eyeTalkCfg.intervalFn);
          }, 11500);
        }
      }, 1000);
    }
  }
});