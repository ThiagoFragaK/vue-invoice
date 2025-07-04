export default defineNuxtConfig({
    compatibilityDate: '2025-05-15',
    devtools: { 
        enabled: true
    },
    css: [
        '@/assets/main.scss' 
    ],
    app: {
        head: {
            link: [
                {
                    rel: 'stylesheet',
                    href: 'https://fonts.googleapis.com/css2?family=League+Spartan:wght@400;700&display=swap'
                }
            ],
            script: [
                {
                    src: 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js',
                    defer: true, 
                },
            ],
        }
    },
})