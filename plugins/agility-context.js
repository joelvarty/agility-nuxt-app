import Vue from 'vue'
import AgilityClient from "../agility/agility-client"

//set the global $agility property so it's available everywhere
Vue.prototype.$agility = new AgilityClient();
