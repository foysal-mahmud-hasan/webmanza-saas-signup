import { createApp } from 'vue';
import IndexComponent from './components/IndexComponent.vue'
import '../assets/tailwind.css'

createApp({
    components: {
        IndexComponent
    }
}).mount('#app');

