// https://medium.com/@abraztsov/how-virtual-dom-work-567128ed77e9

// https://www.youtube.com/watch?v=8DrAj6NhCLg
// https://www.youtube.com/watch?v=HjC613zdcA0&list=PLqHlAwsJRxAPs942EdJ1akeWpOg2yatiM&index=3

import {Vue} from './core';

Vue.component('app-counter', {
	// name: 'app-counter',
	template:  `<div class="counter">
		<span v-click="test()">test</span>
		<input type="text" v-value="value">
	</div>`,
	data: function() {
		return {
			value: 10
		}
	},
	methods: {
		test: function() {
			this.value = this.value + 10;
		}
	}
});

var App = new Vue({
    el: '#app',
    // components: [],
    template: `<div class="container">
            <div class="container-child">BLOCK 1</div>
            <div class="container-child">BLOCK 2</div>
            <div class="container-child">BLOCK 3</div>
        </div>
        <app-counter></app-counter>`,
    init() {

    }
})