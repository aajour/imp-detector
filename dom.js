const zoneId = document.getElementById('zoneId');
const okBtn = document.getElementById('okBtn');
const clearBtn = document.getElementById('clearBtn');
const jsScript = document.getElementById('jsScript');
const zoneContainer = document.getElementById('zoneContainer');
const ImpressionMessage = document.getElementById('message');

$(function () {
  $('input[id="timeVisable"]').hide();
  $('input[id="percentTimeVisable"]').hide();
  $('input[id="percentVisable"]').hide();

  $('input[id="timeVisableCheck"]').on('click', function () {
    if ($(this).prop('checked')) {
      $('input[id="timeVisable"]').fadeIn();
      $('input[id="percentTimeVisable"]').fadeIn();
      $('input[id="percentVisable"]').val('').hide();
    }
  });
  $('input[id="percentVisableCheck"]').on('click', function () {
    if ($(this).prop('checked')) {
      $('input[id="percentVisable"]').fadeIn();
      $('input[id="timeVisable"]').val('').hide();
      $('input[id="percentTimeVisable"]').val('').hide();
    }
  });
});

okBtn.addEventListener('click', function () {
  jsScript.setAttribute('data-zone-id', zoneId.value);
  jsScript.setAttribute('src', './script.js');
});

clearBtn.addEventListener('click', function () {
  location.reload();
});
let timer = new moment.duration(1000000).timer({ start: false }, () => {});

var visibilityMonitor = VisSense(zoneContainer).monitor().start();
visibilityMonitor.on('percentagechange', (e) => {
  const criteria = $('input[name=criteria]').filter(':checked').val();

  if (criteria == 'percent') {
    if (Math.round(e._state.percentage * 100 < $('#percentVisable').val()))
      return;
    ImpressionMessage.textContent = `Impression sent`;
    ImpressionMessage.className = 'green';
  } else if (criteria == 'percentTime') {
    if (
      Math.round(e._state.percentage * 100 < $('#percentTimeVisable').val())
    ) {
      timer.stop();
      return;
    }
    timer.start();
    window.setInterval(function () {
      if (
        Math.round((1000000 - timer.getRemainingDuration()) / 1000) >=
        $('#timeVisable').val()
      ) {
        ImpressionMessage.textContent = `Impression sent`;
        ImpressionMessage.className = 'green';
        timer.stop();
      }
    }, 1000);
  }
});
