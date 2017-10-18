/**
 * Created by Alexej Schwarz on 13.10.17.
 */

$(document).ready(function () {
	"use strict";
/*
	Slick-Slider-Plugin - http://kenwheeler.github.io/slick
	<div data-control-class="stage" class="slider single-item"...

	alle Elemente mit der Klasse "slider" werden als Slick-Slider initialisert
    data-control-class steuert die Slick-Plugin-Parameter
 */

	var sliderClass= "slider_js",
		$sliders = $("[class^='" + sliderClass + "']");

	if ($sliders.length > 0) {

		var elClass,
			slideTime = 300,
			sliderParam = {
				"default" : {
					infinite: true,
					slidesToShow: 3,
					slidesToScroll: 1,
					dots: false,

					responsive: [
						{
							breakpoint: 1024,
							settings: {
								slidesToShow: 3,
								slidesToScroll: 1,
								infinite: true,
								dots: false
							}
						},
						{
							breakpoint: 992,
							settings: {
								slidesToShow: 2,
								slidesToScroll: 1,
								infinite: true,
								dots: false
							}
						},
						{
							breakpoint: 768,
							settings: {
								slidesToShow: 1,
								slidesToScroll: 1,
								arrows: false,
								dots: true
							}
						}
					]
				},
				"single": {
					settingName: "setting-value",
					//dots: true,
					speed: slideTime,
					//rtl: true,
					infinite: true,
					cssEase: "ease",
					//variableWidth: true, // default false
					//adaptiveHeight: true, // default false
					//autoplay: true, // default false
					//autoplaySpeed: 3000,

				},
				"fade": {
					dots: true,
					speed: slideTime,
					infinite: true,
					fade: true,
					cssEase: "ease"
				}
			};

		$sliders.each(function (i, item) {

			$(item).attr("class").split(sliderClass)[1].split(" ")[0][0] === "_" ?
				elClass = $(item).attr("class").split(sliderClass)[1].split(" ")[0].slice(1) :
				elClass = "default";
			$(item).slick( sliderParam[elClass] );
		});
	}
});