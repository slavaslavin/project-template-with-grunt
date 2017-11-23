/**
 * Created by Alexej Schwarz on 13.10.17.
 */

$(function () {
	"use strict";
	/* Slick-Slider-Plugin - http://kenwheeler.github.io/slick */

	var sliderClass= "slider__js",
		$sliders = $("[class*='" + sliderClass + "']");

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
							breakpoint: window.btstrpBrckpnts.xl,
							settings: {
								slidesToShow: 3,
								slidesToScroll: 1,
								infinite: true,
								dots: false
							}
						},
						{
							breakpoint: window.btstrpBrckpnts.lg,
							settings: {
								slidesToShow: 2,
								slidesToScroll: 1,
								infinite: true,
								dots: false
							}
						},
						{
							breakpoint: window.btstrpBrckpnts.md,
							settings: {
								slidesToShow: 1,
								slidesToScroll: 1,
								arrows: false,
								dots: true
							}
						}
					]
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