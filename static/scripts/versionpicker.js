// Current Version stuff
const currentVersion = window.location.pathname.replace(/\//g, '');

const currentVersionEl = document.getElementById('current-version');
currentVersionEl.textContent = 'Current Version: ' + currentVersion;

// Picker popout control
const popoutButton = document.querySelector('.current-version');

popoutButton.onclick = function() {
	popoutButton.parentNode.classList.toggle('shift-up');
}

// Version list population
const versionContainer = document.getElementById('versions-list');

var request = new XMLHttpRequest();
request.open('GET', '/versions.json', true);

request.onload = function() {
  if (request.status >= 200 && request.status < 400) {
    // Success!
	var versions = JSON.parse(request.responseText);
	
	versions.forEach(function (version) {
		var el = document.createElement('li');
		var link = document.createElement('a');
		
		link.textContent = version.tag;
		el.appendChild(link);
		
		el.classList.add('version');
		link.setAttribute('href', '/' + version.versionName);
		
		if (version.versionName == currentVersion) {
			link.classList.add('current');
		}
		
		versionContainer.appendChild(el);
	});

  } else {
    // We reached our target server, but it returned an error

  }
};

request.onerror = function() {
  // There was a connection error of some sort
};

request.send();
