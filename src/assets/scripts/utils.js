export const isTouchDevice = () => {
	return 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
};

export const isMobile = () => {
	return /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent);
};

export const isIOS = () => {
	return /iPad|iPhone|iPod/.test(navigator.userAgent);
};

export const isInViewport = (element) => {
	const distance = element.getBoundingClientRect();

	return (
		distance.top >= 0 &&
		distance.left >= 0 &&
		distance.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
		distance.right <= (window.innerWidth || document.documentElement.clientWidth)
	);
};

export const getRandomInt = (min, max) => {
	return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const getRandomArbitrary = (min, max) => {
	return Math.random() * (max - min) + min;
};

export const getElementDocumentCoords = (el) => {
	const element = el.getBoundingClientRect();

	return {
		bottom: element.bottom + window.scrollY,
		left: element.left + window.scrollX,
		right: element.right + window.scrollX,
		top: element.top + window.scrollY,
	};
};

export const getObjectLength = (object) => {
	return Object.values(object).length;
};

export const URLToObject = (queryString) => {
	const query = {};
	const pairs = (queryString[0] === '?' ? queryString.substr(1) : queryString).split('&');
	// eslint-disable-next-line no-plusplus
	for (let i = 0; i < pairs.length; i++) {
		const pair = pairs[i].split('=');
		query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
	}
	return query;
};

export const objectToURL = (object) => {
	const pairs = [];

	Object.keys(object).forEach((objectKey) => {
		if (object[objectKey]) {
			pairs.push(`${encodeURIComponent(objectKey)}=${encodeURIComponent(object[objectKey])}`);
		}
	});

	return pairs.join('&');
};

export const numberWithSpaces = (x) => {
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
};

export const numberWithDots = (x) => {
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};

export const guidGenerator = () => {
	const S4 = () => ((1 + Math.random()) * 0x10000 || 0).toString(16).substring(1);

	return `${S4() + S4()}-${S4()}-${S4()}-${S4()}-${S4()}${S4()}${S4()}`;
};

export const pageLanguage = () => {
	const htmlElement = document.getElementsByTagName('html')[0];

	return htmlElement.getAttribute('lang') || 'ru';
};

export const reflow = (element) => {
	// eslint-disable-next-line no-unused-expressions
	element.offsetHeight;
};

export const isElementVisible = (element) => {
	return !!(element.offsetWidth || element.offsetHeight || element.getClientRects().length);
};

export const nextTick = (callback, delay = 0) => {
	return setTimeout(callback, delay);
};

export const getComputedStyle = (element) => {
	let style;

	if (window.getComputedStyle) {
		style = window.getComputedStyle(element, null);
	}

	if (!style && element.currentStyle) {
		style = element.currentStyle;
	}

	if (!style) {
		style = element.style;
	}

	return style;
};

export const isObject = (object) => {
	return (
		typeof object === 'object' &&
		object !== null &&
		object.constructor &&
		Object.prototype.toString.call(object).slice(8, -1) === 'Object'
	);
};

export const isNode = (node) => {
	if (typeof window !== 'undefined' && typeof window.HTMLElement !== 'undefined') {
		return node instanceof HTMLElement;
	}
	return node && (node.nodeType === 1 || node.nodeType === 11);
};

export const elementOffset = (element) => {
	const box = element.getBoundingClientRect();
	const { body } = document;
	const clientTop = element.clientTop || body.clientTop || 0;
	const clientLeft = element.clientLeft || body.clientLeft || 0;
	const scrollTop = element === window ? window.scrollY : element.scrollTop;
	const scrollLeft = element === window ? window.scrollX : element.scrollLeft;
	return {
		left: box.left + scrollLeft - clientLeft,
		top: box.top + scrollTop - clientTop,
	};
};

export const elementPrevAll = (_element, selector) => {
	const previousElements = [];
	let element = _element;

	while (element.previousElementSibling) {
		const prevElement = element.previousElementSibling;
		if (selector) {
			if (prevElement.matches(selector)) previousElements.push(prevElement);
		} else previousElements.push(prevElement);
		element = prevElement;
	}

	return previousElements;
};
export const elementNextAll = (_element, selector) => {
	const nextElements = [];
	let element = _element;

	while (element.nextElementSibling) {
		const nextElement = element.nextElementSibling;
		if (selector) {
			if (nextElement.matches(selector)) nextElements.push(nextElement);
		} else nextElements.push(nextElement);
		element = nextElement;
	}
	return nextElements;
};

export const elementTransitionEnd = (element, callback) => {
	function fireCallBack(e) {
		if (e.target !== element) return;
		callback.call(element, e);
		element.removeEventListener('transitionend', fireCallBack);
	}
	if (callback) {
		element.addEventListener('transitionend', fireCallBack);
	}
};

export const elementOuterSize = (element, size, includeMargins) => {
	if (includeMargins) {
		return (
			element[size === 'width' ? 'offsetWidth' : 'offsetHeight'] +
			parseFloat(
				window.getComputedStyle(element, null).getPropertyValue(size === 'width' ? 'margin-right' : 'margin-top'),
			) +
			parseFloat(
				window.getComputedStyle(element, null).getPropertyValue(size === 'width' ? 'margin-left' : 'margin-bottom'),
			)
		);
	}
	return element.offsetWidth;
};

export const isWebpSupport = () => {
	const canvasElement = document.createElement('canvas');
	const documentRoot = document.getElementsByTagName('html')[0];

	if (
		!(!canvasElement.getContext || !canvasElement.getContext('2d')) &&
		canvasElement.toDataURL('image/webp').indexOf('data:image/webp') === 0
	) {
		documentRoot.classList.add('webp');
	} else {
		documentRoot.classList.add('no-webp');
	}
};
