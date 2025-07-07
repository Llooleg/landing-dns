import SliderCore from '@scripts/classes/slider.class.js';

class SliderDefault extends SliderCore {
	constructor({ sliderElement }) {
		super({ sliderElement });

		this.build();
	}
}

export default SliderDefault;
