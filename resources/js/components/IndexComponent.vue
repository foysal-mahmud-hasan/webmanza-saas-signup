<script setup>
import { ref, onMounted, reactive } from 'vue'
import { initFlowbite } from 'flowbite'

onMounted(() => {
    initFlowbite();
})

const currentStep = ref(1);
const totalSteps = 4;

const formData = reactive({
    storeName: '',
    themeSelection: '',
    accountInfo: ''
})

const handleNext = () => {
    if (currentStep.value < totalSteps) {
        currentStep.value++;
    }
};

const handlePrevious = () => {
    if (currentStep.value > 1) {
        currentStep.value--;
    }
};

const submitForm = () => {
    console.log('Form submitted', formData);
};
</script>

<template>
    <div class="flex items-center justify-center h-screen w-screen bg-gray-100">
        <div class="w-1/2">
            <div class="rounded-md shadow-md p-6 bg-black">
                <ol
                    class="flex items-center w-full text-sm font-medium text-center text-gray-500 dark:text-gray-400 sm:text-base">
                    <li :class="{ 'text-blue-600': currentStep === 1 }" class="flex md:w-full items-center">
                        <span class="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500">
                            <svg class="w-3.5 h-3.5 sm:w-4 sm:h-4 me-2.5" aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path
                                    d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                            </svg>
                            Store <span class="hidden sm:inline-flex sm:ms-2">Name</span>
                        </span>
                    </li>
                    <li :class="{ 'text-blue-600': currentStep === 2 }" class="flex md:w-full items-center">
                        <span class="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500">
                            <span class="me-2">2</span>
                            Theme <span class="hidden sm:inline-flex sm:ms-2">Selection</span>
                        </span>
                    </li>
                    <li :class="{ 'text-blue-600': currentStep === 3 }" class="flex md:w-full items-center">
                        <span class="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500">
                            <span class="me-2">3</span>
                            Store <span class="hidden sm:inline-flex sm:ms-2">Setup</span>
                        </span>
                    </li>
                    <li :class="{ 'text-blue-600': currentStep === 4 }" class="flex items-center">
                        <span class="me-2">4</span>
                        Confirmation
                    </li>
                </ol>

                <form action="#" @submit.prevent="submitForm">
                    <div v-if="currentStep === 1">
                        <h3 class="mb-4 mt-4 text-lg font-medium leading-none text-gray-900 dark:text-white">Store Details</h3>
                        <label for="store_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Store Name</label>
                        <input v-model="formData.storeName" type="text" name="store_name" id="store_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Store Name" required>
                    </div>

                    <div v-if="currentStep === 2">
                        <h3 class="mb-4 mt-4 text-lg font-medium leading-none text-gray-900 dark:text-white">Theme Selection</h3>
                        <label for="theme_selection" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select Theme</label>
                        <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
                            <div>
                            <img class="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg" alt="">
                            </div>
                            <div>
                                <img class="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg" alt="">
                            </div>
                            <div>
                                <img class="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-2.jpg" alt="">
                            </div>
                            <div>
                                <img class="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-3.jpg" alt="">
                            </div>
                            <div>
                                <img class="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-4.jpg" alt="">
                            </div>
                            <div>
                                <img class="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-5.jpg" alt="">
                            </div>
                        </div>
                    </div>

                    <div v-if="currentStep === 3">
                        <h3 class="mb-4 mt-4 text-lg font-medium leading-none text-gray-900 dark:text-white">Store Setup</h3>
                        <label for="account_info" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Store Setup</label>
                        <input v-model="formData.tin" type="text" name="tin" id="tin" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Tin Number Info" required>
                        <input v-model="formData.bin" type="text" name="bin" id="bin" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mt-2" placeholder="Bin Number" required>
                    </div>

                    <div v-if="currentStep === 4">
                        <h3 class="mb-4 mt-4 text-lg font-medium leading-none text-gray-900 dark:text-white">Confirmation</h3>
                        <p class="text-gray-900 dark:text-white">Please review your information and submit the form.</p>
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
</style>