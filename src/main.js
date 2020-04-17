import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import messagePlugin from "@/utils/message.plugin";
import vuetify from "./plugins/vuetify";


Vue.config.productionTip = false;
Vue.use(messagePlugin);

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

import "firebase/firestore";

firebase.initializeApp({
  apiKey: "AIzaSyBSrja5MQJ-ah9UmQFQJfI7oIsYNEiYVeA",
  authDomain: "testovoe-5ac24.firebaseapp.com",
  databaseURL: "https://testovoe-5ac24.firebaseio.com",
  projectId: "testovoe-5ac24",
  storageBucket: "testovoe-5ac24.appspot.com",
  messagingSenderId: "818072826000",
  appId: "1:818072826000:web:b8fd8b893e87b36573e815",
  measurementId: "G-ME727RBNHX",
});

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
