import throttle from 'lodash.throttle';

import { getElementDocumentCoords } from '../utils.js';

const PageNavigation = {
	data: {
		elements: {
			items: [...document.querySelectorAll('.js-section-page-navigation .js-page-navigation-item')],
			section: document.querySelector('.js-section-page-navigation'),
			sectionHero: document.querySelector('.js-section-hero'),
			sections: document.querySelectorAll('.js-page-navigation-section'),
			sectionWrapper: document.querySelector('.js-section-page-navigation .js-section-page-navigation-wrapper'),
		},

		modes: {
			isActive: 'is-active',
			isVisible: 'is-visible',
		},

		selectors: {
			itemClass: 'js-page-navigation-item',
		},

		settings: {
			intersectionObserverOptions: {
				delay: 0.2,
				rootMargin: '0% 0% -99% 0%',
				threshold: [],
			},
		},

		state: {
			changeAnchorByClick: false,
			intersectionObserverInstances: [],
			previousScrollPosition: 0,
			scrollDirection: 'down',
		},
	},

	methods: {
		hidePageNavigation() {
			this.data.elements.section.classList.remove(this.data.modes.isVisible);
		},

		showPageNavigation() {
			this.data.elements.section.classList.add(this.data.modes.isVisible);
		},
	},

	handlers: {
		handleDocumentClick(event) {
			const pathTree = event.path || (event.composedPath && event.composedPath());
			const itemElement = pathTree.find((element) => element?.classList?.contains(this.data.selectors.itemClass));

			if (itemElement) {
				this.data.state.changeAnchorByClick = true;

				setTimeout(() => {
					this.data.state.changeAnchorByClick = false;
				}, 1000);
			}
		},

		handlerIntersectionObserver([{ isIntersecting, target }]) {
			const sectionId = `#${target.getAttribute('id')}`;

			if (isIntersecting && (!this.data.state.changeAnchorByClick || window.location.hash === sectionId)) {
				const previousActiveItem = this.data.elements.items.find((el) => el.classList.contains(this.data.modes.isActive));
				previousActiveItem?.classList.remove(this.data.modes.isActive);

				const activeItem = this.data.elements.section.querySelector(
					`.${this.data.selectors.itemClass}[href='${sectionId}']`,
				);
				activeItem.classList.add(this.data.modes.isActive);

				let left = 0;

				if (this.data.state.scrollDirection === 'down') {
					if (previousActiveItem) {
						left = activeItem.offsetLeft - 10;
					}
				} else {
					left = activeItem.offsetLeft - 10;
				}

				this.data.elements.sectionWrapper.scrollTo({
					behavior: 'smooth',
					left,
				});
			}
		},

		handleWindowScroll() {
			const sectionOffset = getElementDocumentCoords(this.data.elements.sectionHero);

			if (this.scrolledDistance >= sectionOffset.top + this.data.elements.sectionHero.offsetHeight) {
				this.methods.showPageNavigation.call(this);
			} else {
				this.methods.hidePageNavigation.call(this);
			}

			if (this.data.state.previousScrollPosition < this.scrolledDistance) {
				this.data.state.scrollDirection = 'down';
			} else {
				this.data.state.scrollDirection = 'up';
			}

			this.data.state.previousScrollPosition = this.scrolledDistance;
		},
	},

	listeners: {
		setDocumentClickListener() {
			document.addEventListener('click', this.handlers.handleDocumentClick.bind(this));
		},

		setWindowScrollListener() {
			window.addEventListener('scroll', throttle(this.handlers.handleWindowScroll.bind(this), 250));
		},
	},

	init() {
		this.data.state.previousScrollPosition = this.scrolledDistance;
		this.handlers.handleWindowScroll.call(this);

		Object.keys(this.listeners).forEach((listenerKey) => {
			this.listeners[listenerKey].call(this);
		});

		this.data.elements.sections.forEach((section) => {
			const instance = new IntersectionObserver(
				this.handlers.handlerIntersectionObserver.bind(this),
				this.data.settings.intersectionObserverOptions,
			);
			instance.observe(section);
			this.data.state.intersectionObserverInstances.push(instance);
		});
	},

	get scrolledDistance() {
		return window.scrollY || (document.documentElement || document.body.parentNode || document.body).scrollTop;
	},
};

export default PageNavigation;
