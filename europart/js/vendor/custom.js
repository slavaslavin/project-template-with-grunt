/**
 * Created by Alexej Schwarz on 13.10.17.
 */
// einige Custom-Methoden benötigen jQuery

var custom = {
		isOnScreen: function (el, x, y) {

			// 0<= x und y

			var $el = $(el);

			if (x == null || typeof x == "undefined") x = 1;
			if (y == null || typeof y == "undefined") y = 1;

			var win = $(window),
				viewport = {
					top: win.scrollTop(),
					left: win.scrollLeft()
				};
			viewport.right = viewport.left + win.width();
			viewport.bottom = viewport.top + win.height();

			var height = $el.outerHeight(),
				width = $el.outerWidth();

			if (!(width && height)) return false;

			var bounds = $el.offset();
			bounds.right = bounds.left + width;
			bounds.bottom = bounds.top + height;

			var visible = (!(viewport.right < bounds.left || viewport.left > bounds.right || viewport.bottom < bounds.top || viewport.top > bounds.bottom));

			if (!visible) return false;

			var deltas = {
				top: Math.min(1, ( bounds.bottom - viewport.top ) / height),
				bottom: Math.min(1, ( viewport.bottom - bounds.top ) / height),
				left: Math.min(1, ( bounds.right - viewport.left ) / width),
				right: Math.min(1, ( viewport.right - bounds.left ) / width)
			};

			return (deltas.left * deltas.right) >= x && (deltas.top * deltas.bottom) >= y;
		},
		getCookie: function (name) {
			var matches = document.cookie.match(new RegExp(
				"(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
			));
			return matches ? decodeURIComponent(matches[1]) : undefined;
		},
		setCookie: function (name, value, options) {
			options = options || {};

			var expires = options.expires;

			if (typeof expires == "number" && expires) {
				var d = new Date();
				d.setTime(d.getTime() + expires * 1000);
				expires = options.expires = d;
			}
			if (expires && expires.toUTCString) {
				options.expires = expires.toUTCString();
			}

			value = encodeURIComponent(value);

			var updatedCookie = name + "=" + value;

			for (var propName in options) {
				updatedCookie += "; " + propName;
				var propValue = options[propName];
				if (propValue !== true) {
					updatedCookie += "=" + propValue;
				}
			}

			document.cookie = updatedCookie;
		},
		deleteCookie: function (name) {
			setCookie(name, "", {
				expires: -1
			})
		}
	},
	btstrpBrckpnts =  {
		xs: 0,
		sm: 576,
		md: 768,
		lg: 992,
		//lg2: 1050,
		xl: 1200,
		//xxl: 1230
	};