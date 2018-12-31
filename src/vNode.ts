import {Core} from './core';
import {Component} from './component';


const events = ['click', 'mouseenter'];

export class vNode {
	node: HTMLElement;
	nodeName:  string;
	parent: HTMLElement;
	children: [];
	content: string;
	attributes: {};
	isComponent: boolean = false;
	component: any = null;

	constructor(opts, context) {
		this.node = opts.node;
		this.nodeName = opts.nodeName;
		this.parent = opts.parent;
		this.children = opts.children;
		this.content =  opts.content;
		this.attributes = opts.attributes;
		this.component = context;

		this.init();
		this.render();			
		this.addListeners();

		if(this.component) {
			this.component.data.subscribe(data=>{
				this.update(data);
			});
		}
	}

	init() {

	}

	render() {
		if(Core.isCustomElement(this.node)) {
			this.isComponent = true;
			let compParams = Core.components[this.node.localName];
			let comp = new Component(compParams, this.node);
		}
	}
	addListeners() {
		let clickAttr = this.attributes['v-click'];


	// for(let key in this.node.attributes) {
	// 	this.node.attributes[key];
	// }
		if(clickAttr) {
			
			let regExp = /\(([^)]+)\)|\(()\)/;
			let fnParams = regExp.exec(clickAttr); // get value between brackets
			
			let functionName = clickAttr.replace(regExp, ''); // remove everything between brackets

			this.node.addEventListener('click', ()=> {
				this.component.methods[functionName].call(this.component);
			}, false);
			this.node.removeAttribute('v-click');
		}
	}

	update(data) {
		let val = this.attributes['v-value'];

		if(val) {
			var input = (<HTMLInputElement>this.node);
			input.value = this.component.data.value[val];
			this.node.removeAttribute('v-value');
		}
	}
}