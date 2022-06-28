import { createApp } from "vue";
import App from "./App.vue";
import VuePersianDatetimePicker from "vue3-persian-datetime-picker";


const app = createApp(App);
app.use(VuePersianDatetimePicker, {
    name: "v3-datetime-picker",
    props: {
        format: "YYYY-MM-DDTHH:mm:ssZ",
        displayFormat: "jYYYY-jMM-jDD",
        editable: false,
        placeholder: "انتخاب تاریخ",
        altFormat: "YYYY-MM-DD HH:mm:ss",
        color: "#9e0059",
        autoSubmit: false,
        jumpMinute: 5,
        roundMinute: true,
    },
});
app.mount("#app");