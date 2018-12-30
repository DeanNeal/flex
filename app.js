// https://medium.com/@abraztsov/how-virtual-dom-work-567128ed77e9
	class Component {
		constructor() {
			this.template =  `<div>
			<input type="text">
		</div>`;
		}
	}

	class Qwerty {
	    constructor(options) {
	        this.el = document.querySelector(options.el);
	        options.init.call(this, 123);
	    }
	}

	var App = new Qwerty({
	    el: '#app',
	    init() {
	        this;
	        debugger
	    }
	})