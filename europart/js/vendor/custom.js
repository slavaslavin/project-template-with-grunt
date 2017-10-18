/**
 * Created by Alexej Schwarz on 13.10.17.
 */
// die Custom_methoden benötigen jQuery
var custom = {
	isOnScreen : function(el, x, y){

		// 0<= x und y

		var $el = $(el);

		if(x == null || typeof x == "undefined") x = 1;
		if(y == null || typeof y == "undefined") y = 1;

		var win = $(window),
			viewport = {
				top : win.scrollTop(),
				left : win.scrollLeft()
			};
		viewport.right = viewport.left + win.width();
		viewport.bottom = viewport.top + win.height();

		var height =  $el.outerHeight(),
			width =  $el.outerWidth();

		if(!(width && height)) return false;

		var bounds =  $el.offset();
		bounds.right = bounds.left + width;
		bounds.bottom = bounds.top + height;

		var visible = (!(viewport.right < bounds.left || viewport.left > bounds.right || viewport.bottom < bounds.top || viewport.top > bounds.bottom));

		if(!visible) return false;

		var deltas = {
			top : Math.min( 1, ( bounds.bottom - viewport.top ) / height),
			bottom : Math.min(1, ( viewport.bottom - bounds.top ) / height),
			left : Math.min(1, ( bounds.right - viewport.left ) / width),
			right : Math.min(1, ( viewport.right - bounds.left ) / width)
		};

		return (deltas.left * deltas.right) >= x && (deltas.top * deltas.bottom) >= y;
	}
};