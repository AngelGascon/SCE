import Vue from 'vue'

import VueRouter from 'vue-router'
Vue.use(VueRouter)

import VueResource from 'vue-resource';
Vue.use(VueResource);

import App from './App.vue'


const AllProducts = require('./assets/js/components/all-products.vue');

const PaymentInfo = require('./assets/js/components/payment-info.vue');
const routes = [
    {
        path: '/payment/:paymentId',
        name: 'PaymentInfo',
        component: PaymentInfo
      },
    {
        name: 'all_products',
        path: '/',
        component: AllProducts
    }
];
var router = new VueRouter({ routes: routes, mode: 'history' });
new Vue(Vue.util.extend({ router }, App)).$mount('#app');