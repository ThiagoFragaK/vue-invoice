<template>
    <div>
        <button
            class="btn btn-primary flex items-center justify-center gap-2 mt-4 ms-4"
            @click="toggleInvoiceForm"
        >
            <LucideIcon icon="FilePlus2" />
            Create Invoice
        </button>
        <button
            class="btn btn-primary flex items-center justify-center gap-2 mt-4 ms-4"
        >
            <LucideIcon icon="Upload" />
            Import PDF
        </button>
        <button
            v-if="showDownloadBtn"
            class="btn btn-info flex items-center justify-center gap-2 mt-4 ms-4"
        >
            <LucideIcon icon="Download" />
            Download Invoice
        </button>
    </div>
    <div class="container text-center">
        <div class="row mt-4">
            <div class="col-3"></div>
            <div class="col-6">
                <InvoiceForm v-if="showInvoiceForm" />
                <PDFEmbed v-if="showPDFEmbed" />
            </div>
            <div class="col-2"></div>
        </div>
    </div>
</template>

<script>
    export default {
        data: () => ({
            showInvoiceForm: false,
            showPDFEmbed: false,
            showDownloadBtn: false,
        }),
        methods: {
            toggleInvoiceForm() {
                this.showInvoiceForm = !this.showInvoiceForm;
            },
        }
    }
</script>