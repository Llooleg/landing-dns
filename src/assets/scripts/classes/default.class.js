import throttle from 'lodash.throttle';

import { getElementDocumentCoords, getObjectLength } from '../utils.js';

class Default {
	constructor() {
		this.selectors = {};

		this.elements = {
			html: document.getElementsByTagName('html')[0],
			partHeader: document.querySelector('.js-part-header'),
			scrollButton: document.querySelectorAll('.js-scroll-button'),
		};

		this.elementsToTrackHeight = {
			'part-header': document.querySelector('.js-part-header'),
		};

		this.modes = {
			isActive: 'is-active',
		};
	}

	computed = {};

	handlers = {
		handleScrollButtonClick: ({ currentTarget }) => {
			const buttonScrollTarget = currentTarget.getAttribute('data-scroll-target');

			if (buttonScrollTarget) {
				const scrollButtonSiblings = currentTarget.parentElement.querySelectorAll(`.${this.selectors.scrollButtonClass}`);
				const scrollTargetElement = document.querySelector(
					`[data-scroll-target="${buttonScrollTarget}"]:not(.${this.selectors.scrollButtonClass})`,
				);
				const scrollTargetElementOffsetTop = getElementDocumentCoords(scrollTargetElement).top;
				const scrollDistance = scrollTargetElementOffsetTop - this.elements.partHeader.offsetHeight + 10;

				scrollButtonSiblings.forEach((scrollButton) => {
					if (scrollButton.getAttribute('data-scroll-target') === buttonScrollTarget) {
						scrollButton.classList.add(this.modes.isActive);
					} else {
						scrollButton.classList.remove(this.modes.isActive);
					}
				});

				window.scrollTo({ behavior: 'smooth', top: scrollDistance });
			}
		},
	};

	listeners = {
		setResizeWindowListener: () => {
			window.addEventListener('resize', throttle(this.methods.setCssVariables, 250));
		},

		setScrollButtonListener: () => {
			if (this.elements.scrollButton.length) {
				this.elements.scrollButton.forEach((scrollButton) => {
					scrollButton.addEventListener('click', this.handlers.handleScrollButtonClick);
				});
			}
		},
	};

	methods = {
		setCssVariables: () => {
			if (getObjectLength(this.elementsToTrackHeight)) {
				Object.keys(this.elementsToTrackHeight).forEach((key) => {
					if (this.elementsToTrackHeight[key]) {
						const elementHeigh = Math.ceil(this.elementsToTrackHeight[key].offsetHeight);

						this.elements.html.style.setProperty(`--${key}-height`, `${elementHeigh}px`);
					}
				});
			}
		},

		uploadYouTubeAPI: () => {
			if (document.querySelector('#popup-video') && (typeof YT === 'undefined' || typeof YT.Player === 'undefined')) {
				const tag = document.createElement('script');
				tag.setAttribute('src', 'https://www.youtube.com/iframe_api');
				const firstScriptTag = document.getElementsByTagName('script')[0];
				firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
			}
		},
	};

	init() {
		this.methods.setCssVariables();
		this.methods.uploadYouTubeAPI();

		Object.keys(this.listeners).forEach((key) => {
			if (this.listeners[key]) {
				this.listeners[key]();
			}
		});

		return this;
	}
}

export default Default;
