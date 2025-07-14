<template>
    <div v-if="visible" class="fullscreen-loader d-flex justify-content-center align-items-center">
        <div class="spinner-border text-primary spinner-xl" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'LoadComponent',
        props: {
            visible: {
                type: Boolean,
                default: false
            }
        }
    }
</script>

<style scoped>
    .fullscreen-loader {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background-color: rgba(255, 255, 255, 0.8);
        z-index: 1050;
    }
</style>