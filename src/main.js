import Vue from 'vue';
import VueRouter from 'vue-router';
import '@dillerm/pretty-controls';
import '@dillerm/pretty-controls/dist/pretty-controls.css';
import App from './App.vue';
import ResponsesPage from './components/ResponsesPage.vue';
import HomePage from './components/HomePage.vue';

Vue.config.productionTip = false;

const router = new VueRouter({
	mode: 'history',
	routes: [
		{
			path: '/', 
			component: HomePage 
		},
		{
			path: '/responses', 
			component: ResponsesPage 
		}
	]
})

Vue.use(VueRouter)

new Vue({
	router,
	render: h => h(App)
}).$mount('#app')
