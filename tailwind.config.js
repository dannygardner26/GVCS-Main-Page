/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                gvcs: {
                    navy: '#003366',
                    gold: '#FFC425',
                    gray: '#F3F4F6',
                }
            }
        },
    },
    plugins: [],
}
