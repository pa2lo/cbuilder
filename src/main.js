/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */
import Vue from 'vue';

// scopedInputs
import './scopedInputs.js';

// default components
import BuilderLayout from './components/BuilderLayout.vue'
import SettingsRoot from './components/SettingsRoot.vue'
Vue.component('builder-main', BuilderLayout);
Vue.component('settings-root', SettingsRoot);

// input components
/**
 * webpack
 * const iComponents = require.context('./components/inputs', true, /\.vue$/i)
 * iComponents.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], iComponents(key).default))
 */
const iComponents = import.meta.glob('./components/inputs/*.vue');
for (const path in iComponents) {
	iComponents[path]().then((mod) => {
		Vue.component(path.split('/').pop().split('.')[0], mod.default)
	})
}

// element components
/**
 * webpack
 * const eComponents = require.context('./components/elements', true, /\.vue$/i)
 * eComponents.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], eComponents(key).default))
 **/
const eComponents = import.meta.glob('./components/elements/*.vue');
for (const path in eComponents) {
	eComponents[path]().then((mod) => {
		Vue.component(path.split('/').pop().split('.')[0], mod.default)
	})
}

/**
 * simple uuid for components
 *
 * TODO: find better uuid solution for unique components id
 */
//Vue.prototype.$compID = 0
window.compID = 0

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

import App from './App.vue'

new Vue({
	render: (h) => h(App),
}).$mount('#app');

// helpers
Array.prototype.move = function(from, to) {
    this.splice(to, 0, this.splice(from, 1)[0]);
    return this;
};