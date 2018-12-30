// https://medium.com/@abraztsov/how-virtual-dom-work-567128ed77e9

// https://www.youtube.com/watch?v=8DrAj6NhCLg
// https://www.youtube.com/watch?v=HjC613zdcA0&list=PLqHlAwsJRxAPs942EdJ1akeWpOg2yatiM&index=3

	class vNode {
		constructor(opts) {
			this.nodeName = opts.nodeName;
			this.parentName = opts.parentName;
			this.children = opts.children;
			this.content =  opts.content;
		}
	}

	class Component {
		constructor(opts) {
			this.vDom = null;
			this.template = opts.template;

			this.render();
		}

		render() {
			this.getVTree();
			
		}
		getVTree() {
			let a = document.createElement('div');
			a.innerHTML = this.template;
			this.vDom = this.getNodeTree(a);
			debugger
		}

		getNodeTree (node) {
		    // if (node.hasChildNodes()) {
		        var children = [];
		        for (var j = 0; j < node.childNodes.length; j++) {
		            children.push(this.getNodeTree(node.childNodes[j]));
		        }

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
		template:  `<div>
			<span>test</span>
			<input type="text">
		</div>`
	});

	class Qwerty {
	    constructor(options) {
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