import { Splide } from '@splidejs/splide';

import { defaultAnimationDuration, defaultAnimationEasing } from '@scripts/settings.js';
import { elementOuterSize } from '@scripts/utils.js';

export default class {
	constructor({ sliderElement }) {
		this.elements = {
			slider: sliderElement,
		};

		this.state = {
			isSliderDestroyed: false,
			isSliderInitialized: false,
			sliderId: sliderElement.getAttribute('id'),
			sliderInstance: null,
			sliderNavigationInstance: null,
		};

		this.defaultsSettings = {
			arrows: false,
			easing: defaultAnimationEasing,
			flickMaxPages: 0.3,
			gap: '2rem',
			mediaQuery: 'max',
			perMove: 1,
			perPage: 1,
			speed: defaultAnimationDuration * 1000,
			type: 'slide',
		};
	}

	build({ additionally = {}, extension = {}, isDelayedMount = false, sliderElement, sliderKey = 'sliderInstance' } = {}) {
		const slider = sliderElement || this.elements.slider;
		const parentElement = slider.closest('.section-core') || slider.closest('.js-popup');
		const data = JSON.parse(slider.getAttribute('data-slider-settings'));
		const current = Object.assign(this.defaultsSettings, data, additionally);
		const counterElement = parentElement.querySelector('.js-slider-counter');
		const navigationElements = {
			nextElement: parentElement.querySelector(`.js-slider-${this.state.sliderId}-next`),
			prevElement: parentElement.querySelector(`.js-slider-${this.state.sliderId}-prev`),
		};

		this.state[sliderKey] = new Splide(slider, current);

		if (counterElement) {
			const currentElement = counterElement.querySelector('.js-slider-counter-current');
			const totalElement = counterElement.querySelector('.js-slider-counter-total');

			this.state[sliderKey].on('mounted move', () => {
				const sliderEnd = this.state[sliderKey].Components.Controller.getEnd() + 1;
				const currentIndex = this.state[sliderKey].index + 1;
				const formattedCurrentIndex = currentIndex > 9 ? currentIndex : `0${currentIndex}`;
				const formattedNextIndex = sliderEnd > 9 ? sliderEnd : `0${sliderEnd}`;
				currentElement.textContent = formattedCurrentIndex;

				if (!totalElement.textContent) {
					totalElement.textContent = formattedNextIndex;
				}
			});
		}

		if (navigationElements?.prevElement && navigationElements?.nextElement) {
			navigationElements.prevElement?.addEventListener('click', () => {
				this.state[sliderKey].go('<');
			});
			navigationElements.nextElement?.addEventListener('click', () => {
				this.state[sliderKey].go('>');
			});

			if (current.type !== 'loop') {
				this.state[sliderKey].on('mounted move', () => {
					const isSliderReachEnd = this.state[sliderKey].index === this.state[sliderKey].Components.Controller.getEnd();
					const isSliderReachStart = this.state[sliderKey].index === 0;

					if (isSliderReachEnd) {
						navigationElements.nextElement.setAttribute('disabled', 'disabled');
					} else {
						navigationElements.nextElement.removeAttribute('disabled');
					}

					if (isSliderReachStart) {
						navigationElements.prevElement.setAttribute('disabled', 'disabled');
					} else {
						navigationElements.prevElement.removeAttribute('disabled');
					}
				});
			}
		}

		if (current.pagination && data.paginationDynamic) {
			this.state[sliderKey].on('pagination:updated resize', () => {
				const paginationList = this.state[sliderKey].Components.Pagination.items;
				const listOffset = parseFloat(
					window.getComputedStyle(paginationList[0].li.parentElement).getPropertyValue('gap'),
				);
				const previousIndex = this.state[sliderKey].index - 1;
				const currentIndex = this.state[sliderKey].index;
				const nextIndex = this.state[sliderKey].index + 1;
				const bulletSize = elementOuterSize(paginationList[0].li, 'width') + listOffset;
				const dynamicMainBullets = 1;
				const dynamicBulletIndex = 0;
				const firstIndex = Math.max(currentIndex - dynamicBulletIndex, 0);
				const lastIndex = firstIndex + (Math.min(paginationList.length, dynamicMainBullets) - 1);
				const midIndex = (lastIndex + firstIndex) / 2;
				const dynamicBulletsLength = Math.min(paginationList.length, dynamicMainBullets + 4);
				const bulletsOffset = (bulletSize * dynamicBulletsLength - bulletSize) / 2 - midIndex * bulletSize;

				paginationList.forEach((listItem) => {
					listItem.button.classList.remove('is-previous', 'is-next');
				});

				if (currentIndex >= 1 && paginationList[previousIndex]?.button) {
					paginationList[previousIndex].button.classList.add('is-previous');
				}
				if (nextIndex && paginationList[nextIndex + 1]?.button) {
					paginationList[nextIndex].button.classList.add('is-next');
				}

				paginationList.forEach((listItem) => {
					listItem.li.style.left = `${bulletsOffset}px`;
				});
			});
		}

		if (!isDelayedMount) {
			this.state[sliderKey].mount({ ...extension });
		}

		this.state.sliderId = slider.getAttribute('id');

		window.sliderInstances[this.state.sliderId] = this;

		return this.state[sliderKey];
	}

	destroy({ sliderKey = 'sliderInstance' } = {}) {
		if (!this.state[sliderKey]) return false;

		this.state[sliderKey].destroy(true);

		delete this.state[sliderKey];

		return this;
	}
}
