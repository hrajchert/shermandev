declare const places: Array<[string, string, string, number, number]>;

interface BikeMarker {
	elm: HTMLDivElement;
	circle: google.maps.Circle;
}

const SELECTED_COLOR = '#6f5501';
// const SELECTED_COLOR = '#f7cc3f';

const UNSELECTED_COLOR = '#FF0000';

const UNSELECTED_RADIUS = 15000;
const HOVER_RADIUS = 20000;
const SELECTED_RADIUS = 25000;

function initMap () {
	var BOUNDS = {
		north: 54.4,
		south: 36.5,
		west: -3.5,
		east: 14.08,
	};
	const center = {lat: 48.479458, lng: 8.010064};
	const map = new google.maps.Map(document.getElementById('map'), {
		zoom: 7,
		center,
		restriction: {
			latLngBounds: BOUNDS,
			strictBounds: false,
		},
		zoomControl: false,
		mapTypeControl: false,
		scaleControl: false,
		streetViewControl: false,
		rotateControl: false,
		fullscreenControl: true
	} as any); // Strangely enough, restriction is not added to the types

	const infowindow = new google.maps.InfoWindow({});

	google.maps.event.addListener(map, "click", () => infowindow.close());


	let focusedMarker: BikeMarker | null = null;

	function focusOn (placeName: string) {
		if (focusedMarker) {
			const strokeColor = (focusedMarker.circle as any).fillColor;
			if (focusedMarker === selectedMarker) {
				focusedMarker.circle.setOptions({strokeColor, radius: SELECTED_RADIUS})
			} else {
				focusedMarker.circle.setOptions({strokeColor, radius: UNSELECTED_RADIUS})
			}
		}

		const marker = markers[placeName];
		if (marker) {
			map.panTo(marker.circle.getBounds().getCenter());
			marker.circle.setOptions({strokeColor: SELECTED_COLOR, radius: HOVER_RADIUS});
			focusedMarker = marker;
		}
	}

	let selectedMarker: BikeMarker | null = null;
	function selectMarker (placeName: string) {
		if (selectedMarker) {
			selectedMarker.circle.setOptions({fillColor: UNSELECTED_COLOR, radius: UNSELECTED_RADIUS});
			selectedMarker.elm.classList.remove('selected');
		}
		const marker = markers[placeName];
		if (marker) {
			marker.circle.setOptions({fillColor: SELECTED_COLOR, radius: SELECTED_RADIUS });
			selectedMarker = marker;
			selectedMarker.elm.classList.add('selected');
		}
	}

	function addMarker (place: string, placeID: string, lat: number, lng: number, stay: string, elm) {
		const circle = new google.maps.Circle({
			strokeColor: UNSELECTED_COLOR,
			strokeOpacity: 1,
			strokeWeight: 1,
			fillColor: UNSELECTED_COLOR,
			fillOpacity: 0.6,
			map: map,
			center: {lat, lng},
			radius: UNSELECTED_RADIUS,
		  });

		  markers[place] = {circle, elm};

		  circle.addListener('click', function() {
			const contentString =
				`<div id="content">
				<div id="siteNotice">
				</div>
				<h4 id="firstHeading" class="firstHeading f5">${place}</h4>
				<div id="bodyContent">
				<p>${stay}</p>
				</div>
				</div>`;
			infowindow.setContent(contentString);
			infowindow.setPosition({lat, lng});
			infowindow.open(map, circle);
		});

	}

	const markers: Record<string, BikeMarker> = {};
	document
		.querySelectorAll('.location-card')
		.forEach((elm: HTMLDivElement) => {
			const place = elm.querySelector('h2').innerText;

			places.filter(p => p[0] === place)
				.forEach(p => addMarker(p[0], p[2], p[3], p[4], p[1], elm));

			elm.onclick = () => selectMarker(place);

			elm.onmouseenter = () => focusOn(place);
		});

	selectMarker('Barcelona');
	focusOn('Barcelona');
}

