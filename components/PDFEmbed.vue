<template>
    <iframe
        :src="pdf"
        width="150%"
        height="800"
        style="border:none;"
    ></iframe>
</template>

<script>
    export default {
        props: {
            pdf: {
                type: String,
                required: true
            }
        },
    };
</script>
