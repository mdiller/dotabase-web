import Vue from 'vue';
import Vuetify from 'vuetify';
import VueRouter from 'vue-router';
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/dist/vuetify.min.css'
import App from './App.vue';
import ResponsesPage from './components/ResponsesPage.vue';
import HomePage from './components/HomePage.vue';
import LoadingScreensPage from './components/LoadingScreensPage.vue';
import ExplorerPage from './components/ExplorerPage.vue';

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
		},
		{
			path: '/loadingscreens', 
			component: LoadingScreensPage 
		},
		{
			path: '/explorer', 
			component: ExplorerPage 
		}
	]
})

Vue.use(VueRouter)
Vue.use(Vuetify, {
	iconfont: "mdi"
})

new Vue({
	router,
	render: h => h(App)
}).$mount('#app')
