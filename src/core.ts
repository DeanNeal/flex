import {vNode} from './vNode';
import { Utils } from './utils';

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

	// static getPropsByScope(value, scope, loopParams) {
	//     let r;
	//     let variable = value.split('.')
	//     let listOfVariables = Core.getAllVariables();
	//     let listOfVariablesValues = listOfVariables.map(r=> this.props.get(r));
	    
	//     if(loopParams && loopParams.iterator) { 
	//         listOfVariables.push(loopParams.iterator);
	//         listOfVariablesValues.push(scope);

	//         if(loopParams.index || loopParams.index === 0) {
	//             if(listOfVariables.indexOf('index') > -1) {
	//                 listOfVariablesValues[listOfVariables.indexOf('index')] = loopParams.index;
	//             } else {
	//                 listOfVariables.push('index');
	//                 listOfVariablesValues.push(loopParams.index);
	//             }
	//         } else {
	//             listOfVariables.push('index'); // if index doesn't exist
	//         }
	//         if(loopParams.key) {                
	//             listOfVariables.push('key');
	//             listOfVariablesValues.push(loopParams.key);
	//         }
	//     }

	//     try {
	//         r = new Function(listOfVariables, 'return ' + value).apply(this, listOfVariablesValues);
	//     } catch(err) {
	//         // throw new Error(err + '; ' + this);
	//         // console.warn(err + '; ' + this);
	//     }

	//     return r;
	// }

	// static getAllVariables() {
	//     return  Object.keys(this.props.getData());
	// }
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
        vDom.parent = this.el;console.log(vDom);
        this.el.appendChild(Utils.unwrap(temp));
    }

    static component(params: any) {
    	Core.components[params.name] = params;//.push({name, params});
    }
}