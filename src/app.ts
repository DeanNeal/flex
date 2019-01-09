// https://medium.com/@abraztsov/how-virtual-dom-work-567128ed77e9

// https://www.youtube.com/watch?v=8DrAj6NhCLg
// https://www.youtube.com/watch?v=HjC613zdcA0&list=PLqHlAwsJRxAPs942EdJ1akeWpOg2yatiM&index=3
// https://learn.javascript.ru/proxy
//https://medium.com/@linus2228/javascript-%D1%87%D1%82%D0%BE-%D0%BD%D0%BE%D0%B2%D0%BE%D0%B3%D0%BE-%D0%B2-ecmascript-2018-es2018-e0af4a53cb5c
import {Vue} from './core';

Vue.component({
	name: 'app-counter',
	template:  `<div class="counter">
		<span v-click="test()" v-value="value"></span>
		<input type="text" v-value="value" v-model="value">
		<div v-value="checkbox"></div>
		<input type="checkbox" v-value="checkbox" v-model="checkbox">

		<div v-value="radio"></div>
		<input type="radio" v-value="radio" v-model="radio" name="radio" value="1">
		<input type="radio" v-value="radio" v-model="radio" name="radio" value="2">

		<div v-class="active: isActive">CLASS</div>
	</div>`,
	data: function() {
		return {
			value: 10,
			checkbox: false,
			radio: null,
			isActive: false
		}
	},
	methods: {
		test: function() {
			this.value = 10;
			this.checkbox = !this.checkbox;
			this.radio = 1;
			this.isActive = !this.isActive;
		}
	}
});

var App = new Vue({
    el: '#app',
    template: `

        <app-counter></app-counter>`,
    init() {

    }
})

// <div class="container">
//         <div class="container-child">BLOCK 1</div>
//         <div class="container-child">BLOCK 2</div>
//         <div class="container-child">BLOCK 3</div>
//     </div>