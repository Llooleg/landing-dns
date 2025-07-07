import { disablePageScroll, enablePageScroll } from 'scroll-lock';

import ProductsData from '../data/products.js';
import { getObjectLength, isElementVisible, reflow } from '../utils.js';

class Popup {
	constructor({ popupElement }) {
		this.popupId = popupElement.getAttribute('id');

		this.selectors = {
			popupCloseClass: 'js-popup-close',
			popupTriggerClass: 'js-popup-trigger',
		};

		this.elements = {
			body: document.body,
			popup: popupElement,
			popupContent: {
				iframe: popupElement.querySelector('.js-popup-content-iframe'),
				slider: popupElement.querySelector('.js-popup-content-slider .js-slider'),
				'video-youtube': popupElement.querySelector('.js-popup-content-video-youtube'),
			},
			popupTriggers: document.querySelectorAll(`.js-popup-trigger[data-popup-id='${this.popupId}']`),
			popupWrapper: popupElement.querySelector('.js-popup-wrapper') || popupElement,
		};

		this.settings = {
			...JSON.parse(popupElement.getAttribute('data-popup-settings') || '{}'),
		};

		this.state = {
			isOpened: false,
			videoInstance: null,
		};

		this.modes = {
			isActive: 'is-active',
			isOpened: 'is-opened',
		};
	}

	static hideAllInstances = ({ id = '' } = {}) => {
		Object.keys(this.popupInstances).forEach((popupInstanceKey) => {
			if (this.popupInstances[popupInstanceKey]) {
				const popupInstance = this.popupInstances[popupInstanceKey];

				if (popupInstanceKey !== id && popupInstance.state.isOpened) {
					popupInstance.methods.closePopup();
				}
			}
		});
	};

	static popupInstances = {};

	handlers = {
		handleDocumentClick: (event) => {
			const pathTree = event.path || (event.composedPath && event.composedPath());
			const popupTrigger = pathTree.find((element) => element?.classList?.contains(this.selectors.popupTriggerClass));
			const triggerElementId = popupTrigger?.getAttribute('data-popup-id');

			if (popupTrigger && triggerElementId === this.popupId) {
				const popupContent = JSON.parse(popupTrigger.getAttribute('data-popup-content') || '{}');

				if (popupTrigger.tagName.toLowerCase() === 'a') {
					event.preventDefault();
				}

				if (this.state.isOpened) {
					this.methods.closePopup();
				} else {
					this.methods.openPopup({ popupContent });
				}
			}
		},

		handleDocumentKeydown: ({ code, key }) => {
			if (key === 'Escape' && code === 'Escape' && this.state.isOpened) {
				this.methods.closePopup();
			}
		},

		handlePopupClick: (event) => {
			const pathTree = event.path || (event.composedPath && event.composedPath());
			const closeElement = pathTree.find((element) => element?.classList?.contains(this.selectors.popupCloseClass));

			if (closeElement) {
				this.methods.closePopup({ popupTrigger: closeElement });
			}
		},

		handlePopupWrapperTransitionEnd: ({ target }) => {
			if (target === this.elements.popupWrapper && !this.state.isOpened) {
				this.elements.popup.style.setProperty('display', 'none');
				this.elements.body.style.removeProperty('pointer-events');
			}
		},
	};

	listeners = {
		setDocumentClickListener: () => {
			document.addEventListener('click', this.handlers.handleDocumentClick.bind(this));
		},

		setDocumentKeydownListener: () => {
			document.addEventListener('keydown', this.handlers.handleDocumentKeydown.bind(this));
		},

		setPopupClickListener: () => {
			this.elements.popup.addEventListener('click', this.handlers.handlePopupClick.bind(this));
		},

		setPopupWrapperTransitionEndListener: () => {
			this.elements.popupWrapper.addEventListener(
				'transitionend',
				this.handlers.handlePopupWrapperTransitionEnd.bind(this),
			);
		},
	};

	methods = {
		afterClose: () => {},

		afterOpen: () => {},

		beforeClose: () => {
			if (this.state.videoInstance?.getPlayerState) {
				this.state.videoInstance?.pauseVideo();
			}

			this.elements.popupTriggers?.forEach((triggerElement) => {
				triggerElement.classList.remove(this.modes.isActive);
			});

			enablePageScroll();
		},

		beforeOpen: ({ popupContent }) => {
			this.methods.setPopupContent({ popupContent });

			if (this.state.videoInstance?.playVideo) {
				this.state.videoInstance?.playVideo();
			}

			this.elements.popupTriggers?.forEach((triggerElement) => {
				triggerElement.classList.add(this.modes.isActive);
			});

			Popup.hideAllInstances();
			disablePageScroll();
		},

		closePopup: () => {
			this.methods.beforeClose();

			this.elements.body.style.setProperty('pointer-events', 'none');
			this.elements.popup.classList.remove(this.modes.isOpened);

			this.state.isOpened = false;

			this.methods.afterClose();
		},

		openPopup: ({ popupContent = {} } = {}) => {
			this.methods.beforeOpen({ popupContent });

			this.elements.body.style.setProperty('pointer-events', 'none');
			this.elements.popup.style.setProperty('display', 'flex');

			reflow(this.elements.popup);

			this.elements.popup.classList.add(this.modes.isOpened);

			[...this.elements.popup.querySelectorAll('input')]
				.filter((inputElement) => isElementVisible(inputElement))[0]
				?.focus();

			this.elements.body.style.setProperty('pointer-events', '');

			this.state.isOpened = true;

			this.methods.afterOpen();
		},

		setPopupContent: ({ popupContent = {} } = {}) => {
			if (Array.isArray(popupContent)) {
				const currentContent = this.elements.popup.getAttribute('data-popup-content-current');

				const sliderInstance =
					window.sliderInstances[this.elements.popupContent.slider.getAttribute('id')]?.state?.sliderInstance;
				if (sliderInstance && currentContent !== popupContent[1]) {
					const template = document.querySelector('.js-template-item-card');
					let contentNext = null;

					const content = Object.keys(ProductsData).reduce((acc, productKey) => {
						const productValue = ProductsData[productKey];

						if (productValue.type === popupContent[1]) {
							acc.push({ ...productValue, article: productKey });
						}
						return acc;
					}, []);

					sliderInstance.Components.Slides.remove((Slide) => Slide);

					content.forEach((slideContent) => {
						const slideElement = document.createElement('div');
						slideElement.classList.add('splide__slide');

						const itemCardElement = template.content.cloneNode(true);
						const itemCardLinkElement = itemCardElement.querySelector('.js-template-item-card-link');
						const itemCardPhotoElement = itemCardElement.querySelector('.js-template-item-card-photo');
						const itemCardCaptionElement = itemCardElement.querySelector('.js-template-item-card-caption');
						const itemCardArticleElement = itemCardElement.querySelector('.js-template-item-card-article');

						itemCardLinkElement.setAttribute('href', slideContent.url);
						itemCardPhotoElement.setAttribute('src', slideContent.modulePhoto.url);
						itemCardPhotoElement.setAttribute(
							'srcset',
							`${slideContent.modulePhoto.url} 1x, ${slideContent.modulePhoto.url2x} 2x`,
						);
						itemCardPhotoElement.setAttribute('alt', `${slideContent.caption} ${slideContent.article}`);
						itemCardCaptionElement.textContent = slideContent.caption;
						itemCardArticleElement.textContent = slideContent.article;

						slideElement.append(itemCardElement);

						sliderInstance.Components.Slides.add(slideElement);

						contentNext = slideContent.caption;
					});

					this.elements.popup.setAttribute('data-popup-content-current', contentNext);
				}
			} else if (getObjectLength(popupContent)) {
				Object.keys(popupContent).forEach((contentKey) => {
					const content = popupContent[contentKey];

					if (this.elements.popupContent[contentKey]) {
						if (contentKey === 'iframe') {
							const currentIframeUrl = this.elements.popupContent[contentKey].getAttribute('src');

							if (currentIframeUrl !== content) {
								this.elements.popupContent[contentKey].setAttribute('src', `${content}?autoplay=1`);
							}
						} else if (contentKey === 'video-youtube') {
							this.methods.setupVideoInstance({
								videoElement: this.elements.popupContent[contentKey],
								videoKey: content,
							});
						} else {
							this.elements.popupContent[contentKey].textContent = content;
						}
					}
				});
			}
		},

		setupVideoInstance: ({ videoElement, videoKey } = {}) => {
			if (this.state.videoInstance && !this.state.videoInstance?.getVideoUrl().includes(videoKey)) {
				this.state.videoInstance.destroy();
				this.state.videoInstance = null;
			}

			if (!this.state.videoInstance) {
				const interval = setInterval(() => {
					if (typeof window.YT !== 'undefined' && window.YT?.loaded) {
						this.state.videoInstance = new YT.Player(videoElement, {
							events: {
								onReady: ({ target }) => {
									target.playVideo();
								},
							},
							height: '100%',
							videoId: videoKey,
							width: '100%',
						});
						clearInterval(interval);
					}
				}, 100);
			}
		},
	};

	init() {
		Object.keys(this.listeners).forEach((key) => {
			this.listeners[key]();
		});

		Popup.popupInstances[this.popupId] = this;

		return this;
	}
}

export default Popup;
