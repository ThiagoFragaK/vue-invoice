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
            @click="triggerHidden"
        >
            <LucideIcon icon="Upload" />
            Import PDF
        </button>
         <input
            class="d-none"
            type="file"
            accept="application/pdf"
            ref="fileInput"
            @change="importPDF"
        />

        <button
            v-if="showDownloadBtn"
            class="btn btn-info flex items-center justify-center gap-2 mt-4 ms-4"
            @click="togglePDFViewer"
        >
            <LucideIcon v-if="showPDFEmbed" icon="EyeClosed" />
            <LucideIcon v-else icon="Eye" />
            {{ showPDFEmbed ? "Hide" : "Show" }} PDF
        </button>
        <button
            v-if="showDownloadBtn"
            class="btn btn-info flex items-center justify-center gap-2 mt-4 ms-4"
            @click="downloadPDF"
        >
            <LucideIcon icon="Download" />
            Download Invoice
        </button>
    </div>

    <div class="container text-center">
        <div class="row mt-4">
            <div class="col-md-6 offset-md-3">
                <InvoiceForm 
                    v-if="showInvoiceForm"
                    @showPDF="showPDFFile"
                />
            </div>
            <div class="col-md-7 offset-md-1">
                <PDFEmbed 
                    v-if="showPDFEmbed"
                    :pdf="pdfUrl"
                />                
            </div>
        </div>
    </div>

    <LoadComponent :visible="isLoading"/>
</template>

<script>
    export default {
        data: () => ({
            isLoading: false,
            showInvoiceForm: false,
            showPDFEmbed: false,
            pdfFile: null,
            pdfUrl: "",
            showDownloadBtn: false,
        }),
        methods: {
            toggleInvoiceForm() {
                this.showInvoiceForm = !this.showInvoiceForm;
                this.showPDFEmbed = false; 
            },
            togglePDFViewer() {
                this.showPDFEmbed = !this.showPDFEmbed; 
                this.showInvoiceForm = false;
            },
            triggerHidden() {
                this.$refs.fileInput.click();
            },
            async importPDF(event) {
                this.isLoading = true;
                const file = event.target.files[0];
                if (!file || file.type !== 'application/pdf') {
                    alert("It should be a PDF file!");
                    return
                }
                
                this.pdfFile = file;

                if (this.pdfUrl) {
                    URL.revokeObjectURL(this.pdfUrl)
                }
                this.pdfUrl = URL.createObjectURL(file);

                this.showDownloadBtn = true;
                this.showPDFEmbed = true;
                this.isLoading = false;
            },
            downloadPDF() {
                if (!this.pdfUrl || !this.pdfFile) {
                    alert("No PDF file loaded.")
                    return;
                }

                this.isLoading = true;
                const link = document.createElement('a');
                link.href = this.pdfUrl;
                link.download = this.pdfFile.name || 'invoice.pdf';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                this.isLoading = false;
            },
            showPDFFile(pdfFile) {
                this.pdfUrl = pdfFile;
                this.togglePDFViewer();
            }
        },
        beforeUnmount() {
            if (this.pdfUrl) {
                URL.revokeObjectURL(this.pdfUrl)
            }
        }
    }
</script>