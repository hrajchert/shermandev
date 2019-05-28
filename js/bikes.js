// const SELECTED_COLOR = '#6f5501';
var SELECTED_COLOR = '#f7cc3f';
var UNSELECTED_COLOR = '#FF0000';
var UNSELECTED_RADIUS = 15000;
var HOVER_RADIUS = 20000;
var SELECTED_RADIUS = 25000;
function initMap() {
    var BOUNDS = {
        north: 54.4,
        south: 36.5,
        west: -3.5,
        east: 14.08,
    };
    var center = { lat: 48.479458, lng: 8.010064 };
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 7,
        center: center,
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
    }); // Strangely enough, restriction is not added to the types
    var infowindow = new google.maps.InfoWindow({});
    google.maps.event.addListener(map, "click", function () { return infowindow.close(); });
    var focusedMarker = null;
    function focusOn(placeName) {
        if (focusedMarker) {
            if (focusedMarker === selectedMarker) {
                focusedMarker.circle.setOptions({ radius: SELECTED_RADIUS });
            }
            else {
                focusedMarker.circle.setOptions({ radius: UNSELECTED_RADIUS });
            }
        }
        var marker = markers[placeName];
        if (marker) {
            map.panTo(marker.circle.getBounds().getCenter());
            marker.circle.setOptions({ radius: HOVER_RADIUS });
            focusedMarker = marker;
        }
    }
    var selectedMarker = null;
    function selectMarker(placeName) {
        focusOn(placeName);
        if (selectedMarker) {
            selectedMarker.circle.setOptions({ strokeColor: UNSELECTED_COLOR, fillColor: UNSELECTED_COLOR, radius: UNSELECTED_RADIUS });
            selectedMarker.elm.classList.remove('selected');
        }
        var marker = markers[placeName];
        if (marker) {
            marker.circle.setOptions({ strokeColor: SELECTED_COLOR, fillColor: SELECTED_COLOR, radius: SELECTED_RADIUS });
            selectedMarker = marker;
            selectedMarker.elm.classList.add('selected');
        }
    }
    function addMarker(place, placeID, lat, lng, stay, elm) {
        var circle = new google.maps.Circle({
            strokeColor: UNSELECTED_COLOR,
            strokeOpacity: 1,
            strokeWeight: 1,
            fillColor: UNSELECTED_COLOR,
            fillOpacity: 0.6,
            map: map,
            center: { lat: lat, lng: lng },
            radius: UNSELECTED_RADIUS,
        });
        markers[place] = { circle: circle, elm: elm };
        circle.addListener('click', function () {
            var contentString = "<div id=\"content\">\n\t\t\t\t<div id=\"siteNotice\">\n\t\t\t\t</div>\n\t\t\t\t<h4 id=\"firstHeading\" class=\"firstHeading f5\">" + place + "</h4>\n\t\t\t\t<div id=\"bodyContent\">\n\t\t\t\t<p>" + stay + "</p>\n\t\t\t\t</div>\n\t\t\t\t</div>";
            infowindow.setContent(contentString);
            infowindow.setPosition({ lat: lat, lng: lng });
            infowindow.open(map, circle);
        });
    }
    var locationCardHolder = document.querySelector('#location-card-holder');
    var rightButton = document.querySelector('#scroll-right-button');
    rightButton.onclick = function () {
        console.log(locationCardHolder);
        locationCardHolder.scrollLeft += 200;
    };
    var leftButton = document.querySelector('#scroll-left-button');
    leftButton.onclick = function () {
        console.log(locationCardHolder);
        locationCardHolder.scrollLeft -= 200;
    };
    var threshold = 0.5;
    var observer = new IntersectionObserver(function (entries, observer) {
        // Grab the first element comes into view
        var entry = entries.filter(function (e) { return e.intersectionRatio >= threshold; }).slice(-1)[0];
        if (entry) {
            var place = entry.target.querySelector('h2').innerText;
            focusOn(place);
        }
    }, {
        root: locationCardHolder,
        threshold: threshold
    });
    var markers = {};
    document
        .querySelectorAll('.location-card')
        .forEach(function (elm) {
        var place = elm.querySelector('h2').innerText;
        places.filter(function (p) { return p[0] === place; })
            .forEach(function (p) { return addMarker(p[0], p[2], p[3], p[4], p[1], elm); });
        elm.onclick = function () { return selectMarker(place); };
        // elm.onmouseenter = () => focusOn(place);
        observer.observe(elm);
    });
    selectMarker('Barcelona');
    focusOn('Barcelona');
}
