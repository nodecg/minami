// Current Version stuff
const currentVersion = window.location.pathname.split('/')[1];

const currentVersionEl = document.getElementById('current-version');
currentVersionEl.textContent = 'Current Version: ' + currentVersion;

// Picker popout control
const popoutButton = document.querySelector('.current-version');

popoutButton.onclick = function() {
	popoutButton.parentNode.classList.toggle('shift-up');
}

// Version list population
const versionContainer = document.getElementById('versions-list');

fetch('/versions.json')
	.then(response => {
		if (response.status !== 200) {
			console.log('Failed to fetch version list. Status code: ' + response.status);
			return;
		}

		response.json().then(versions => {
			versions.forEach(version => {
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
		});
	})
	.catch(err => {
		console.log('Failed to fetch version list. Error: %s', err);
	});
