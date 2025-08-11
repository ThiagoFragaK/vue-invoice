<template>
    <div class="modal fade" tabindex="-1" aria-hidden="true" ref="modalEl" :aria-labelledby="`${id}-label`" :id="id">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title ms-2" :id="`${id}-label`">
                        {{ title }}
                    </h5>
                    <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                        :disabled="isLoading"
                    />
                </div>

                <div class="modal-body">
                    {{ message }}
                </div>

                <div class="d-flex justify-content-center mx-4 my-4">
                    <button
                        type="button"
                        class="btn btn-outline-secondary mx-4"
                        data-bs-dismiss="modal"
                        :disabled="isLoading"
                        @click="close"
                    >
                        Cancell
                    </button>
                    <button
                        type="button"
                        class="mx-4"
                        :class="`btn btn-${confirmVariant}`"
                        :disabled="isLoading"
                        @click="$emit('confirm')"
                    >
                        <div style="min-width: 80px" class="text-center">
                            <span v-if="isLoading" class="spinner-grow spinner-grow-sm" role="status"></span>
                            <span v-else>Confirm</span>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ConfirmDialog",
        props: {
            id: {
                type: String,
                required: true,
            },
            isLoading: {
                type: Boolean,
                required: true,
            },
            title: {
                type: String,
                default: "Are you sure?"
            },
            message: {
                type: String,
                default: "Are you sure of this action?",
            },
            confirmVariant: {
                type: String,
                required: false,
                default: "danger",
            },
            iconeName: {
                type: String,
                required: false,
                default: "Trash2",
            },
            iconVariant: {
                type: String,
                required: false,
                default: "danger",
            },
        },
        mounted() {
            this.modalInstance = new window.bootstrap.Modal(this.$refs.modalEl, {
                backdrop: "static",
                keyboard: false,
            });
        },
        methods: {
            open() {
                this.modalInstance?.show();
            },
            close() {
                this.modalInstance?.hide();
            },
        },
    };
</script>
