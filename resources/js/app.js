import "primeicons/primeicons.css";
import "./style.css";

import { createApp } from "vue";
import PrimeVue from "primevue/config";
import ConfirmationService from "primevue/confirmationservice";
import DialogService from "primevue/dialogservice";
import ToastService from "primevue/toastservice";
import Noir from "./presets/Noir.js";
import appState from "./plugins/appState.js";
import IndexComponent from "./components/IndexComponent.vue";

const app = createApp();

app.use(PrimeVue, {
    theme: {
        preset: Noir,
        options: {
            prefix: "p",
            darkModeSelector: ".p-dark",
            cssLayer: false,
        },
    },
});
app.use(appState);
app.use(ConfirmationService);
app.use(ToastService);
app.use(DialogService);

app.component("IndexComponent", IndexComponent);

app.mount("#app");
