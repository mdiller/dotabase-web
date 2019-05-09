export default {
	debounce: function(func, wait, immediate) {
		var timeout;
		return function() {
			var context = this, args = arguments;
			var later = function() {
				timeout = null;
				if (!immediate) func.apply(context, args);
			};
			var callNow = immediate && !timeout;
			clearTimeout(timeout);
			timeout = setTimeout(later, wait);
			if (callNow) func.apply(context, args);
		};
	},
	pad(n, width, z) {
		z = z || ' ';
		n = n + '';
		return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
	},
	cleanText(text) {
		text = text.trim();
		text = text.toLowerCase();
		text = text.replace(/[^a-z0-9\s]/, '')
		return text;
	}
}