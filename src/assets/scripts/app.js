import EventBus from 'js-event-bus';

import Default from './classes/default.class.js';
import Popup from './classes/popup.class.js';
import PageNavigation from './modules/page-navigation.js';
import SlidersRegister from './modules/sliders-register.js';

const AppEventBus = new EventBus();
window.AppEventBus = AppEventBus;

window.addEventListener('DOMContentLoaded', () => {
	class App {
		init() {
			this.pageSetup();

			this.initClasses();
			this.initModules();

			console.log('App has been initialized');

			return this;
		}

		initClasses() {
			new Default().init();

			document.querySelectorAll('.js-popup')?.forEach((popupElement) => {
				new Popup({ popupElement }).init();
			});
		}

		initModules() {
			SlidersRegister.init();
			PageNavigation.init();
		}

		pageSetup() {}
	}

	new App().init();
});
