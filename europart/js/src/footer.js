/**
 * Created by Alexej Schwarz on 06.10.17.
 */
$(function () {
	"use strict";

	if($("#footerMenuAccordion a[data-toggle='collapse']").length > 0) {
		$("#footerMenuAccordion a[data-toggle='collapse']")
			.on("click", function(e){ if ($(window).width() >= 768) e.stopPropagation() });
	}
});
