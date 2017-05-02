
import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import Goods from './components/goods/goods.vue';
import Ratings from './components/ratings/ratings.vue';
import Seller from './components/seller/seller.vue';

import './common/stylus/index.styl';

Vue.config.productionTip = false;
Vue.use(VueRouter);
Vue.use(VueResource);

const router=new VueRouter({
	//将a标签被选中的router-link-active类名改成active
	linkActiveClass:'active',
	routes:[
		{path:"",component:Goods},
		{path:'/goods',component:Goods},
		{path:'/ratings',component:Ratings},
		{path:'/seller',component:Seller}
	]
})

// VueRouter的其中一个生命周期函数
router.beforeEach((to,from,next)=>{
	if(to.path=='/seller'&&from.path=='/ratings'){
		console.log(1111);
	}
	next();
})


// const app = new Vue({
//   router:router,
//   //这是Vue 2.0新增的函数，可以直接给绑定节点渲染一个vue组件
//   render: h => h(App)
// }).$mount('#app')

const app=new Vue({
	el:"#app",
	router:router,
	render:h=>h(App)
})
