// https://medium.com/@abraztsov/how-virtual-dom-work-567128ed77e9

// https://www.youtube.com/watch?v=8DrAj6NhCLg
// https://www.youtube.com/watch?v=HjC613zdcA0&list=PLqHlAwsJRxAPs942EdJ1akeWpOg2yatiM&index=3

	class vNode {
		nodeName:  string;
		parentName: string;
		children: [];
		content: string;

		constructor(opts) {
			this.nodeName = opts.nodeName;
			this.parentName = opts.parentName;
			this.children = opts.children;
			this.content =  opts.content;
		}
	}

	class Component {
		template: string;
		constructor(opts) {
			// this.vDom = null;
			this.template = opts.template;
			this.name = opts.name;
			this.render();
		}

		render() {
			this.getVTree();
			
		}
		getVTree() {
			let a = document.createElement('div');
			a.innerHTML = this.template;
			// this.vDom = 
			this.getNodeTree(a);
			debugger
		}

		getNodeTree(node: any) {
		    // if (node.hasChildNodes()) {
		        var children = [];
		        for (var j = 0; j < node.childNodes.length; j++) {
		            children.push(this.getNodeTree(node.childNodes[j]));
		        }
		        console.log(node.nodeName.toLowerCase() === );
		        return new vNode({
		        	    nodeName: node.nodeName,
		        	    parentName: node.parentNode ? node.parentNode.nodeName : null,
		        	    children: children,
		        	    content: node.innerText || "",
		        });
		    // }

		    // return node;
		}
	}


	var AppComponent = new Component({
		name: 'app-counter',
		template:  `<div>
		    <app-counter></app-counter>
			<span>test</span>
			<input type="text">
		</div>`
	});

	class Qwerty {
		el: HTMLElement;
	    constructor(options: any) {
	        this.el = document.querySelector(options.el);
	        options.init.call(this);
	    }
	}

	var App = new Qwerty({
	    el: '#app',
	    components: [AppComponent],
	    init() {

	    }
	})