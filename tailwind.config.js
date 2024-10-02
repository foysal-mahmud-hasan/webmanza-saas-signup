/** @type {import('tailwindcss').Config} */

const colors = require("tailwindcss/colors");
const primeui = require("tailwindcss-primeui");

module.exports = {
    content: [
        "./resources/**/*.blade.php", // Target all Blade templates
        "./resources/js/**/*.vue", // Target all Vue components
    ],
    theme: {
        extend: {
            colors: {
                gray: colors.gray, // Updated from 'coolGray'
                blue: colors.sky, // Updated from 'lightBlue'
                red: colors.rose,
                pink: colors.fuchsia,
            },
            fontFamily: {
                sans: ["Graphik", "sans-serif"],
                serif: ["Merriweather", "serif"],
            },
        },
        container: {
            center: true,
            padding: "1rem", // Specify default padding for containers
        },
    },
    plugins: [primeui],
};
