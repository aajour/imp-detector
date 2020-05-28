const zoneId = document.getElementById('zoneId');
const okBtn = document.getElementById('okBtn');
const clearBtn = document.getElementById('clearBtn');
const jsScript = document.getElementById('jsScript');

okBtn.addEventListener('click', function () {
  jsScript.setAttribute('data-zone-id', zoneId.value);
  jsScript.setAttribute('src', './script.js');
});

clearBtn.addEventListener('click', function () {
  location.reload();
});
