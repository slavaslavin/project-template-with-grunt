/**
 * Created by Alexej Schwarz on 24.10.17.
 */

$(function () {
	"use strict";

	var selector = "#geoLocation",
		getNextStore = function () {
			console.log("getNextStore");
		},
		getLocationCoords = function () {
			if ($(selector).length > 0) {

				if (navigator.geolocation) {
					navigator.geolocation.getCurrentPosition(
						function (position) {
							$(selector)
							.attr("data-latitude", position.coords.latitude)
							.attr("data-longitude", position.coords.longitude);
						},
						function () {
							console.log("navigator.geolocation.getCurrentPosition error")
						}
					);
				}
			}
		},
		setLocationCookie= function(name) {
			var count = 0,
				curentCoords = {},
				t = setInterval(function() {
					curentCoords = {
						latitude: $(selector).attr("data-latitude"),
						longitude: $(selector).attr("data-longitude")
					};
					count ++;
					if(count > 20 || !!curentCoords.latitude && !!curentCoords.longitude) {
						clearInterval(t);
						var val = "latitude" + curentCoords.latitude + "longitude" + curentCoords.longitude;
						if(window.custom.getCookie(name) !== val) window.custom.setCookie(name, val);
						getNextStore();
					}
				}, 10);
		};

	// getLocationCoords();
	// setLocationCookie("lastCoords");
	// window.custom.setCookie("lastCoords", "latitude40.123longitude9.9453085") // zu Testzwecken
});