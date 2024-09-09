<script setup>
import { ref, onMounted, reactive, computed } from 'vue'
import { initFlowbite } from 'flowbite'

onMounted(() => {
    initFlowbite();
})

const currentStep = ref(1);
const totalSteps = 4;

const formData = reactive({
    storeName: '',
    selectedTheme: null,
    tin: '',
    bin: '',
    selectedPaymentPartner: null,
    selectedDeliveryPartner: null,
})

const errors = reactive({
    storeName: '',
    selectedTheme: '',
    tin: '',
    bin: '',
    selectedPaymentPartner: '',
    selectedDeliveryPartner: ''
})

const themes = [
    { id: 1, src: "https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg", alt: "Theme 1" },
    { id: 2, src: "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg", alt: "Theme 2" },
    { id: 3, src: "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-2.jpg", alt: "Theme 3" },
    { id: 4, src: "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-3.jpg", alt: "Theme 4" },
    { id: 5, src: "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-4.jpg", alt: "Theme 5" },
    { id: 6, src: "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-5.jpg", alt: "Theme 6" }
]

const paymentPartners = [
    { id: 1, src: "https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg", alt: "Payment Partner 1" },
    { id: 2, src: "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg", alt: "Payment Partner 2" },
    { id: 3, src: "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-2.jpg", alt: "Payment Partner 3" }
]
const deliveryPartners = [
    { id: 1, src: "https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg", alt: "Payment Partner 1" },
    { id: 2, src: "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg", alt: "Payment Partner 2" },
    { id: 3, src: "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-2.jpg", alt: "Payment Partner 3" }
]

const handleNext = () => {
    if (validateCurrentStep()) {
        if (currentStep.value < totalSteps) {
            currentStep.value++;
        }
    }
};

const handlePrevious = () => {
    if (currentStep.value > 1) {
        currentStep.value--;
    }
};

const validateCurrentStep = () => {
    let isValid = true;
    
    if (currentStep.value === 1) {
        if (!formData.storeName.trim()) {
            errors.storeName = 'Store name is required';
            isValid = false;
        } else {
            errors.storeName = '';
        }
    } else if (currentStep.value === 2) {
        if (formData.selectedTheme === null) {
            errors.selectedTheme = 'Please select a theme';
            isValid = false;
        } else {
            errors.selectedTheme = '';
        }
    } else if (currentStep.value === 3) {
        if (!formData.tin.trim()) {
            errors.tin = 'TIN is required';
            isValid = false;
        } else if (isNaN(formData.tin)){
            errors.tin = 'TIN must be a digit';
            isValid = false;
        } else {
            errors.tin = '';
        }
        if (!formData.bin.trim()) {
            errors.bin = 'BIN is required';
            isValid = false;
        } else if (isNaN(formData.bin)){
            errors.bin = 'BIN must be a digit';
            isValid = false;
        } else {
            errors.bin = '';
        }
        if (formData.selectedPaymentPartner === null) {
            errors.selectedPaymentPartner = 'Please select a payment partner';
            isValid = false;
        } else {
            errors.selectedPaymentPartner = '';
        }
        if (formData.selectedDeliveryPartner === null) {
            errors.selectedDeliveryPartner = 'Please select a delivery partner';
            isValid = false;
        } else {
            errors.selectedDeliveryPartner = '';
        }
    }

    return isValid;
};

const submitForm = () => {
    if (validateCurrentStep()) {
        console.log('Form submitted', formData);
    }
};

const selectTheme = (themeId) => {
    formData.selectedTheme = themeId;
};

const selectPaymentPartner = (partnerId) => {
    formData.selectedPaymentPartner = partnerId;
};

const selectDeliveryPartner = (deliverId) => {
    formData.selectedDeliveryPartner = deliverId;
};

const isStepComplete = computed(() => {
    if (currentStep.value === 1) return !!formData.storeName.trim();
    if (currentStep.value === 2) return formData.selectedTheme !== null;
    if (currentStep.value === 3) return !!formData.tin.trim() && !!formData.bin.trim() && formData.selectedPaymentPartner !== null;
    return false;
});
</script>

<template>
    <div class="flex flex-col min-h-screen justify-center items-center bg-gray-100">
        <div class="w-full max-w-4xl px-4">
            <div class="rounded-md shadow-md p-6">
                <ol class="flex items-center w-full text-sm font-medium text-center text-gray-500 dark:text-gray-400 sm:text-base">
                    <li v-for="step in totalSteps" :key="step" :class="{ 'text-blue-600': currentStep >= step }" class="flex md:w-full items-center justify-center">
                        <span class="flex items-center after:content-['/'] md:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500">
                            <span class="flex items-center">
                                <svg v-if="currentStep > step" class="w-6 h-6 text-blue-600 dark:text-blue-500 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m5 12 4.7 4.5 9.3-9"/>
                                </svg>
                                <span v-else class="me-2">{{ step }}</span>
                            </span>
                            <span class="hidden md:inline-flex md:ms-2">
                                <span v-if="step === 1">Store Name</span>
                                <span v-if="step === 2">Theme Selection</span>
                                <span v-if="step === 3">Store Setup</span>
                                <span v-if="step === 4">Confirmation</span>
                            </span>
                        </span>
                    </li>
                </ol>

                <form action="#" @submit.prevent="submitForm">
                    <div v-if="currentStep === 1">
                        <h3 class="mb-4 mt-4 text-lg font-medium leading-none text-gray-900 dark:text-white">Store Details</h3>
                        <label for="store_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Store Name</label>
                        <input v-model="formData.storeName" type="text" name="store_name" id="store_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Store Name" required>
                        <p v-if="errors.storeName" class="mt-2 text-sm text-red-600 dark:text-red-500">{{ errors.storeName }}</p>
                    </div>

                    <div v-if="currentStep === 2">
                        <h3 class="mb-4 mt-4 text-lg font-medium leading-none text-gray-900 dark:text-white">Theme Selection</h3>
                        <div class="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-3 gap-4">
                            <div v-for="theme in themes" :key="theme.id" class="relative">
                                <img @click="selectTheme(theme.id)" :class="{ 'border-4 border-blue-500': formData.selectedTheme === theme.id }" class="h-32 md:h-40 w-full rounded-lg cursor-pointer object-cover" :src="theme.src" :alt="theme.alt">
                                <svg v-if="formData.selectedTheme === theme.id" class="w-6 h-6 text-blue-600 dark:text-blue-500 absolute top-2 right-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m5 12 4.7 4.5 9.3-9"/>
                                </svg>
                            </div>
                        </div>
                        <p v-if="errors.selectedTheme" class="mt-2 text-sm text-red-600 dark:text-red-500">{{ errors.selectedTheme }}</p>
                    </div>

                    <div v-if="currentStep === 3">
                        <h3 class="mb-4 mt-4 text-lg font-medium leading-none text-gray-900 dark:text-white">Store Setup</h3>
                        <label for="tin" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">TIN Number</label>
                        <input v-model="formData.tin" type="text" name="tin" id="tin" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="TIN Number" required>
                        <p v-if="errors.tin" class="mt-2 text-sm text-red-600 dark:text-red-500">{{ errors.tin }}</p>
                        
                        <label for="bin" class="block mb-2 mt-4 text-sm font-medium text-gray-900 dark:text-white">BIN Number</label>
                        <input v-model="formData.bin" type="text" name="bin" id="bin" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="BIN Number" required>
                        <p v-if="errors.bin" class="mt-2 text-sm text-red-600 dark:text-red-500">{{ errors.bin }}</p>
                        
                        <h4 class="mb-2 mt-4 text-sm font-medium text-gray-900 dark:text-white">Select Payment Partner</h4>
                        <div class="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 mt-2">
                            <div v-for="partner in paymentPartners" :key="partner.id" class="relative">
                                <img @click="selectPaymentPartner(partner.id)" :class="{ 'border-4 border-blue-500': formData.selectedPaymentPartner === partner.id }" class="h-32 md:h-40 w-full rounded-lg cursor-pointer object-cover" :src="partner.src" :alt="partner.alt">
                                <svg v-if="formData.selectedPaymentPartner === partner.id" class="w-6 h-6 text-blue-600 dark:text-blue-500 absolute top-2 right-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m5 12 4.7 4.5 9.3-9"/>
                                </svg>
                            </div>
                        </div>
                        <p v-if="errors.selectedPaymentPartner" class="mt-2 text-sm text-red-600 dark:text-red-500">{{ errors.selectedPaymentPartner }}</p>
                        <h4 class="mb-2 mt-4 text-sm font-medium text-gray-900 dark:text-white">Select Delivery Partner</h4>
                        <div class="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 mt-2">
                            <div v-for="delivery in deliveryPartners" :key="delivery.id" class="relative">
                                <img @click="selectDeliveryPartner(delivery.id)" :class="{ 'border-4 border-blue-500': formData.selectedDeliveryPartner === delivery.id }" class="h-32 md:h-40 w-full rounded-lg cursor-pointer object-cover" :src="delivery.src" :alt="delivery.alt">
                                <svg v-if="formData.selectedDeliveryPartner === delivery.id" class="w-6 h-6 text-blue-600 dark:text-blue-500 absolute top-2 right-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m5 12 4.7 4.5 9.3-9"/>
                                </svg>
                            </div>
                        </div>
                        <p v-if="errors.selectedDeliveryPartner" class="mt-2 text-sm text-red-600 dark:text-red-500">{{ errors.selectedDeliveryPartner }}</p>
                    </div>

                    <div v-if="currentStep === 4">
                        <h3 class="mb-4 mt-4 text-lg font-medium leading-none text-gray-900 dark:text-white">Confirmation</h3>
                        <p class="text-gray-900 dark:text-white">Please review your information and submit the form.</p>
                        <div class="mt-4">
                            <p><strong>Store Name:</strong> {{ formData.storeName }}</p>
                            <p><strong>Selected Theme:</strong> Theme {{ formData.selectedTheme }}</p>
                            <p><strong>TIN Number:</strong> {{ formData.tin }}</p>
                            <p><strong>BIN Number:</strong> {{ formData.bin }}</p>
                            <p><strong>Selected Payment Partner:</strong> Payment Partner {{ formData.selectedPaymentPartner }}</p>
                            <p><strong>Selected Delivery Partner:</strong> Delivery Partner {{ formData.selectedDeliveryPartner }}</p>
                        </div>
                    </div>

                    <div class="flex justify-between mt-4">
                        <button v-if="currentStep > 1" @click="handlePrevious" type="button" class="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-sm text-sm px-4 py-2 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
                            Previous
                        </button>
                        <div class="flex-grow"></div>
                        <button v-if="currentStep < totalSteps" @click="handleNext" type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-sm text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Next
                        </button>
                        <button v-if="currentStep === totalSteps" type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-sm text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<style>
@import 'flowbite/dist/flowbite.css';
img {
    object-fit: cover; /* Ensure images cover the container without distortion */
}
</style>
