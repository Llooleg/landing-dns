import SliderDefault from '@scripts/sliders/slider-default.class.js';

const SlidersRegister = {
	data: {
		list: {
			'.js-slider': SliderDefault,
		},

		sliderInstances: {},
	},

	init() {
		const isSliderExist = Object.values(this.data.list).length;

		if (isSliderExist) {
			if (!window.sliderInstances) {
				window.sliderInstances = {};
			}

			Object.keys(this.data.list).forEach((selector) => {
				const SliderLayout = this.data.list[selector];
				const sliderElements = document.querySelectorAll(selector);

				if (sliderElements.length) {
					sliderElements.forEach((sliderElement) => {
						// eslint-disable-next-line no-new
						new SliderLayout({ sliderElement });
					});
				}
			});
		}

		return this.data.sliderInstances;
	},
};

export default SlidersRegister;
