import {Core} from './core';
import { BehaviorSubject } from 'rxjs';

export 	class Component {
	template: string;
	name: string;
	data: any = new BehaviorSubject({});
	parent: HTMLElement;
	methods: {};
	constructor(opts, parent) {
		this.template = opts.template;
		this.name = opts.name;
		this.methods = opts.methods;
		this.parent = parent;

		for(let key in opts.data()){
			Object.defineProperty(this, key, {
			    set: (value) => {
			    	// return 
			    	if (typeof value == 'object') {
			    	    this.data.next(Object.assign(this.data.getValue(), value));
			    	    // this.defineProperties(data);
			    	} else {
			    	    // this.defineProperty(data, value);
			    	    // this._data[data] = value;
			    	    let temp = this.data.getValue();
			    	    temp[key] = value;
			    	    this.data.next(temp);
			    	}

			    	
			    },
			    get: () => this.data.value[key],
			    configurable: true
			});
		}

		this.data.next(opts.data());
		this.render();
	}

	render() {
		let temp = document.createElement('div');
		temp.innerHTML = this.template;
		let vDom: any = Core.getNodeTree(temp, this);		
		vDom.parent = this.parent;
		this.parent.parentNode.replaceChild(Core.unwrap(temp), this.parent);
	}
}
