<script setup>
import { reactive, ref, computed } from "vue";
import Button from "primevue/button";
import Steps from "primevue/steps";
import InputText from "primevue/inputtext";
import pathaoLogo from '../../assets/images/pathao.png';
import redXLogo from '../../assets/images/redx.png';
import steadFastLogo from '../../assets/images/steadfast.png';
import bkashLogo from '../../assets/images/bkash.png';
import nogodLogo from '../../assets/images/nogod.png';
import rocketLogo from '../../assets/images/rocket.png';
import axios from 'axios';

const currentStep = ref(0);
const totalSteps = 3;
const formData = reactive({
    store_name: "",
    domain_name: "",
    tin_number: "",
    bin_number: "",
    payment_partner_id: null,
    delivery_partner_id: null,
    theme_id: null,
});
const resetForm = () => {
    formData.store_name = '';
    formData.domain_name = '';
    formData.theme_id = null;
    formData.tin_number = '';
    formData.bin_number = '';
    formData.payment_partner_id = null;
    formData.delivery_partner_id = null;
    errors.store_name = '';
    errors.domain_name = '';
    errors.theme_id = '';
    errors.tin_number = '';
    errors.bin_number = '';
    errors.payment_partner_id = '';
    errors.delivery_partner_id = '';
};
const errors = reactive({
    store_name: "",
    domain_name: "",
    tin_number: "",
    bin_number: "",
    payment_partner_id: "",
    delivery_partner_id: "",
    theme_id: "",
});

const courierDropdownOpen = ref(false);
const themeDropdownOpen = ref(false);
const paymentDropdownOpen = ref(false);
const message = ref('');


const handleSubmit = async () => {
    try {
        const response = await axios.post('/signup', formData);
        message.value = response.data.message;
        if (message.value === "Succses") {
            showSuccess.value = true;
            resetForm();
            setTimeout(() => {
                message.value = '';
            }, 2000);
        } else {
            console.log(message.value)
        }
    } catch (error) {
        if (error.response?.data?.errors) {
            errors.value = error.response.data.errors;
        } else {
            message.value = 'An error occurred. Please try again.';
        }
        console.error("Submission error:", error);
    }
};


const toggleCourierDropdown = () => {
    courierDropdownOpen.value = !courierDropdownOpen.value;
};

const toggleThemeDropdown = () => {
    themeDropdownOpen.value = !themeDropdownOpen.value;
};

const togglePaymentDropdown = () => {
    paymentDropdownOpen.value = !paymentDropdownOpen.value;
};

const validateCurrentStep = () => {
    let isValid = true;

    if (currentStep.value === 0) {
        if (!formData.store_name.trim()) {
            errors.store_name = "Store name is required";
            isValid = false;
        } else {
            errors.store_name = "";
        }
        if (!formData.domain_name.trim()) {
            errors.domain_name = "Domain name is required";
            isValid = false;
        } else {
            errors.domain_name = "";
        }
    } else if (currentStep.value === 1) {
        if (!formData.theme_id) {
            errors.theme_id = "Please select a Theme";
            isValid = false;
        } else {
            errors.theme_id = "";
        }
    } else if (currentStep.value === 2) {
        if (!formData.tin_number.trim()) {
            errors.tin_number = "TIN number is required";
            isValid = false;
        } else {
            errors.tin_number = "";
        }
        if (!formData.bin_number.trim()) {
            errors.bin_number = "BIN number is required";
            isValid = false;
        } else {
            errors.bin_number = "";
        }
        if (!formData.payment_partner_id) {
            errors.payment_partner_id = "Please select a payment partner";
            isValid = false;
        } else {
            errors.payment_partner_id = "";
        }
        if (!formData.delivery_partner_id) {
            errors.delivery_partner_id = "Please select a delivery partner";
            isValid = false;
        } else {
            errors.delivery_partner_id = "";
        }
    }

    return isValid;
};

const handleNext = () => {
    if (validateCurrentStep()) {
        if (currentStep.value < totalSteps - 1) {
            currentStep.value++;
        }
    }
};

const items = computed(() => [
    { label: "Store Name" },
    { label: "Theme Selection" },
    { label: "Setup Store" },
]);

const selectedCourier = (courier) => {
    formData.delivery_partner_id = courier;
    courierDropdownOpen.value = false;
    togglePaymentDropdown();
};

const selectedPaymentPartner = (payment) => {
    formData.payment_partner_id = payment;
    paymentDropdownOpen.value = false;
};

const selectedTheme = (themeId) => {
    formData.theme_id = themeId;
    themeDropdownOpen.value = false;
};

const courierPartners = [
    { name: "Pathao", id: 1, logo: pathaoLogo, alt: "Pathao Courier" },
    { name: "RedX", id: 2, logo: redXLogo, alt: "RedX Courier" },
    { name: "SteadFast", id: 3, logo: steadFastLogo, alt: "SteadFast Courier" },
];

const themes = [
    { id: 1, src: "https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg", alt: "Theme 1" },
    { id: 2, src: "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg", alt: "Theme 2" },
    { id: 3, src: "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-2.jpg", alt: "Theme 3" },
    { id: 4, src: "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-3.jpg", alt: "Theme 4" },
];

const paymentPartners = [
    { name: "Bkash", id: 1, logo: bkashLogo, alt: "Bkash" },
    { name: "Nogod", id: 2, logo: nogodLogo, alt: "Nogod" },
    { name: "Rocket", id: 3, logo: rocketLogo, alt: "Rocket" },
];

const zoomImage = (imageSrc) => {
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50';
    modal.onclick = () => {
        modal.remove();
        document.body.classList.remove('overflow-hidden'); // Re-enable scroll on close
    };
    const img = document.createElement('img');
    img.src = imageSrc;
    img.className = 'max-w-full max-h-full';
    modal.appendChild(img);

    document.body.appendChild(modal);
    document.body.classList.add('overflow-hidden'); // Disable body scroll
}

const handleKeyPress = (event, field) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        if (currentStep.value === 0) {
            if (field === 'store_name') {
                document.querySelector('input[placeholder="e.g. shareegor.webmanzaa.com"]').focus();
            }
        } else if (currentStep.value === 1) {
            toggleThemeDropdown();
        } else if (currentStep.value === 2) {
            if (field === 'tin_number') {
                document.querySelector('input[placeholder="Enter BIN number"]').focus();
            } else if (field === 'bin_number') {
                toggleCourierDropdown();
            } else if (field === 'courier') {
                togglePaymentDropdown();
            }
        }
    }
};
const showSuccess = ref(false);

const goToDashboard = () => {
    resetForm();
    currentStep.value = 0;
    showSuccess.value = false;
};
</script>

<template>
    <div class="min-h-screen w-full flex items-center justify-center p-4">
        <div v-if="showSuccess"
            class="flex items-center  justify-center fixed inset-0 bg-black bg-opacity-75 z-50">
            <div class="bg-white rounded-xl shadow-xl p-8 max-w-sm w-full mx-4">
                <div class="text-center">
                    <div class="mb-4 flex justify-center">
                        <i class="pi pi-check-circle text-blue-500" style="font-size: 2.5rem"></i>
                    </div>
                    <h2 class="text-2xl font-bold mb-2">Congratulations!</h2>
                    <p class="text-gray-600 mb-6">Your Profile is Almost Done</p>
                    <button @click="goToDashboard"
                        class="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300">
                        Go to Dashboard
                    </button>
                </div>
            </div>
        </div>
        <div class="w-full max-w-4xl bg-white shadow-lg rounded-lg p-6 overflow-y-auto max-h-[90vh]">

            <h1 class="text-2xl font-semibold text-center text-[#4a4b68] mb-6">
                Welcome Afsana!
            </h1>

            <div class="mb-8">
                <Steps v-model:activeStep="currentStep" class="custom-steps" :model="items" />
            </div>

            <!-- Step 1: Store Setup -->
            <div v-if="currentStep === 0" class="space-y-6">
                <h2 class="text-xl font-semibold text-[#4a4b68]">
                    Let's set up your store
                </h2>
                <div class="space-y-2">
                    <label class="text-sm text-[#4a4b68]">Store Name</label>
                    <InputText v-model="formData.store_name" @keypress="(e) => handleKeyPress(e, 'store_name')"
                        class="w-full p-2 input-field" placeholder="e.g. Sharee Ghor" />
                    <small v-if="errors.store_name" class="text-xs text-red-600">{{ errors.store_name }}</small>
                </div>
                <div class="space-y-2">
                    <label class="text-sm text-[#4a4b68]">Domain Name</label>
                    <InputText v-model="formData.domain_name" @keypress="(e) => handleKeyPress(e, 'domain_name')"
                        class="w-full p-2 input-field" placeholder="e.g. shareegor.webmanzaa.com" />
                    <small v-if="errors.domain_name" class="text-xs text-red-600">{{ errors.domain_name }}</small>
                </div>
            </div>

            <!-- Step 2: Theme Selection -->
            <div v-if="currentStep === 1" class="space-y-6">
                <h2 class="text-xl font-semibold text-[#4a4b68]">
                    Select a Theme
                </h2>
                <div class="dropdown-container">
                    <button @click="toggleThemeDropdown" @keypress="(e) => handleKeyPress(e, 'theme')"
                        class="dropdown-button w-full text-left">
                        {{ formData.theme_id ? `Theme ${formData.theme_id}` : "Select Theme" }}
                        <i :class="themeDropdownOpen ? 'pi pi-chevron-up' : 'pi pi-chevron-down'"></i>
                    </button>
                </div>
                <div v-if="themeDropdownOpen" class="space-y-4">
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 p-4">
                        <div v-for="theme in themes" :key="theme.id" class="bg-white rounded-lg shadow-md p-4">
                            <img :src="theme.src" :alt="theme.alt" class="h-44 w-full object-cover mb-2 rounded-md" />
                            <div class="flex justify-between items-center w-full space-x-2 h-8">
                                <div class="flex flex-col items-center justify-center h-8">
                                    <h3 class="text-lg font-semibold text-[#4a4b68] text-center">{{ theme.alt }}</h3>
                                </div>
                                <div class="flex items-center gap-4">
                                    <button @click="zoomImage(theme.src)"
                                        class="inline-flex items-center justify-center w-8 h-8 rounded-md bg-gray-200 hover:bg-gray-300">
                                        <i class="pi pi-eye w-4 h-4 text-gray-700"></i>
                                    </button>
                                    <Button @click="selectedTheme(theme.id)" class="h-8 " label="Install Now" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <small v-if="errors.theme_id" class="text-xs text-red-600">{{ errors.theme_id }}</small>
            </div>

            <!-- Step 3: Setup and Confirmation -->
            <div v-if="currentStep === 2" class="space-y-6">
                <h2 class="text-xl font-semibold text-[#4a4b68]">
                    Store Setup
                </h2>
                <div class="space-y-2">
                    <label class="text-sm text-[#4a4b68]">Tin Number</label>
                    <InputText v-model="formData.tin_number" @keypress="(e) => handleKeyPress(e, 'tin_number')"
                        class="w-full p-2 input-field" placeholder="Enter TIN number" />
                    <small v-if="errors.tin_number" class="text-xs text-red-600">{{ errors.tin_number }}</small>
                </div>
                <div class="space-y-2">
                    <label class="text-sm text-[#4a4b68]">Bin Number</label>
                    <InputText v-model="formData.bin_number" @keypress="(e) => handleKeyPress(e, 'bin_number')"
                        class="w-full p-2 input-field" placeholder="Enter BIN number" />
                    <small v-if="errors.bin_number" class="text-xs text-red-600">{{ errors.bin_number }}</small>
                </div>

                <div class="space-y-2">
                    <label class="text-sm text-[#4a4b68]">Courier Partner</label>
                    <div class="dropdown-container">
                        <button @click="toggleCourierDropdown" @keypress="(e) => handleKeyPress(e, 'courier')"
                            class="dropdown-button w-full text-left">
                            {{ formData.delivery_partner_id ? courierPartners.find(p => p.id ===
                                formData.delivery_partner_id)?.name : "Select Courier Partner" }}
                            <i :class="courierDropdownOpen ? 'pi pi-chevron-up' : 'pi pi-chevron-down'"></i>
                        </button>
                    </div>
                    <div v-if="courierDropdownOpen" class="space-y-4">
                        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                            <div v-for="partner in courierPartners" :key="partner.name"
                                class="rounded-lg shadow-md p-4 text-center bg-white">
                                <img :src="partner.logo" :alt="partner.name"
                                    class="h-20 w-40 object-cover mb-2 mx-auto" />
                                <h3 class="text-lg font-semibold text-[#4a4b68] mb-2">{{ partner.name }}</h3>
                                <Button @click="selectedCourier(partner.id)" class="w-40 mx-auto"
                                    label="Activate Now" />
                            </div>
                        </div>
                    </div>
                    <small v-if="errors.delivery_partner_id" class="text-xs text-red-600">{{ errors.delivery_partner_id
                        }}</small>
                </div>

                <div class="space-y-2">
                    <label class="text-sm text-[#4a4b68]">Payment Partner</label>
                    <div class="dropdown-container">
                        <button @click="togglePaymentDropdown" @keypress="(e) => handleKeyPress(e, 'payment')"
                            class="dropdown-button w-full text-left">
                            {{ formData.payment_partner_id ? paymentPartners.find(p => p.id ===
                                formData.payment_partner_id)?.name : "Select Payment Partner" }}
                            <i :class="paymentDropdownOpen ? 'pi pi-chevron-up' : 'pi pi-chevron-down'"></i>
                        </button>
                    </div>
                    <div v-if="paymentDropdownOpen" class="space-y-4">
                        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                            <div v-for="partner in paymentPartners" :key="partner.id"
                                class="bg-white rounded-lg shadow-md p-4 text-center">
                                <img :src="partner.logo" :alt="partner.alt" class="h-20 w-full object-contain mb-2" />
                                <h3 class="text-lg font-semibold text-[#4a4b68] mb-2">{{ partner.alt }}</h3>
                                <Button @click="selectedPaymentPartner(partner.id)" class="w-40 mx-auto"
                                    label="Activate Now" />
                            </div>
                        </div>
                    </div>
                    <small v-if="errors.payment_partner_id" class="text-xs text-red-600">{{ errors.payment_partner_id
                        }}</small>
                </div>
            </div>

            <div class="mt-8 flex items-center justify-center">
                <Button @click="currentStep === totalSteps - 1 ? handleSubmit() : handleNext()"
                    :label="currentStep === totalSteps - 1 ? 'Submit' : 'Next'"
                    class="w-1/2 p-3 text-white bg-blue-500 rounded-lg" />
            </div>
        </div>
    </div>
</template>

<style scoped>
.custom-steps :deep(.p-steps-item) {
    flex: 1;
}

.custom-steps :deep(.p-steps-title) {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 0.75rem;
}

.dropdown-container {
    position: relative;
}

.dropdown-button {
    background-color: white;
    border: 1px solid #009EF733;
    padding: 10px;
    border-radius: 4px;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #001b37;
    transition: background-color 0.3s, border-color 0.3s;
}

.dropdown-button:hover {
    background-color: #009EF733;
}

.input-field {
    background-color: white;
    border: 1px solid #009EF733;
    padding: 10px;
    border-radius: 4px;
    color: #001b37;
    transition: border-color 0.3s;
}

.input-field:focus {
    border-color: #009EF733;
    outline: none;
}
</style>
