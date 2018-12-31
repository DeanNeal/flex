import {vNode} from './vNode';

export class Core {
	static components: {name: string, params: {}}[] = [];
	static getNodeTree(node: any, context) {
	    // if (node.hasChildNodes()) {
	    	if(node.nodeType !== 1) return;
	        var children = [];
	        for (var j = 0; j < node.childNodes.length; j++) {
	            children.push(this.getNodeTree(node.childNodes[j], context));
	        }

			// this.components;
	        // console.log(Components.map(r=> r.name).includes(node.nodeName.toLowerCase()));

	        let attributes = {};
	        for(let key in node.attributes) {
	        	if(node.attributes.hasOwnProperty(key)) {
	        		attributes[node.attributes[key].nodeName] = node.attributes[key].nodeValue;
	        	}	
	        }
	        return new vNode({
	             	node: node,
	        	    nodeName: node.nodeName,
	        	    parent: node.parentNode,// ? node.parentNode.nodeName : null,
	        	    children: children,
	        	    content: node.innerText || "",
	        	    attributes: attributes
	        }, context);
	    // }

	    // return node;
	}

	static isCustomElement(element) {
	    if (element.tagName.indexOf("-") !== -1) {
	        return true;
	    }
	    let isAttribute = element.getAttribute("is");
	    if (isAttribute === null) {
	        return false;
	    }
	    return isAttribute.indexOf("-") !== -1;
	}

	static unwrap(wrapper) {
		// place childNodes in document fragment
		var docFrag = document.createDocumentFragment();
		while (wrapper.firstChild) {
			var child = wrapper.removeChild(wrapper.firstChild);
			docFrag.appendChild(child);
		}

		return docFrag;
	}
}


export class Vue {
	el: HTMLElement;
	template: string;
	static components: {name: string, params: any}[] = [];
    constructor(options: any) {
        this.el = document.querySelector(options.el);
        this.template = options.template;
        options.init.call(this);

        let temp = document.createElement('div');
        temp.innerHTML = this.template;

        let vDom: any = Core.getNodeTree(temp, null);		
        vDom.parent = this.el;//console.log(vDom);
        this.el.appendChild(Core.unwrap(temp));
    }

    static component(name: string, params: any) {
    	params.name = name;
    	Core.components[name] = params;//.push({name, params});
    }
}