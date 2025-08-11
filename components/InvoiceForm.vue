<template>
    <br/>
    <div class="row">
        <div class="col">
            <label 
                class="form-label"
            >
                Number
            </label>
            <input
                type="text" 
                class="form-control"
                v-model="invoice.number"
            >
        </div>
        <div class="col">
            <label 
                class="form-label"
            >
                Date
            </label>
            <input
                type="date" 
                class="form-control"
                v-model="invoice.date"
            >
        </div>
        <div class="col">
            <label 
                class="form-label"
            >
                Due date
            </label>
            <input
                type="date" 
                class="form-control" 
                v-model="invoice.dueDate"
            >
        </div>
    </div>
    <div class="row mt-4">
        <div class="col">
            <label 
                class="form-label"
            >
                Origin
            </label>
            <input
                type="text" 
                class="form-control" 
                placeholder="Invoice origin"
                v-model="invoice.from"
            >
        </div>
    </div>
    <div class="row mt-4">
        <div class="col">
            <label 
                class="form-label"
            >
                Destination
            </label>
            <input
                type="text" 
                class="form-control" 
                placeholder="Invoice destination"
                v-model="invoice.to"
            >
        </div>
    </div>
    <div class="row mt-4">
        <div class="col-2">
            <label 
                class="form-label"
            >
                Currency
            </label>
            <input
                type="text" 
                class="form-control"
                v-model="invoice.currency"
            >
        </div>
        <div class="col-4">
            <label 
                class="form-label"
            >
                Notes
            </label>
            <input
                type="text" 
                class="form-control"
                v-model="invoice.notes"
            >
        </div>
        <div class="col-4">
            <label 
                class="form-label"
            >
                Terms
            </label>
            <input
                type="text" 
                class="form-control" 
                v-model="invoice.terms"
            >
        </div>
        <div class="col-2">
            <label 
                class="form-label"
            >
                Status
            </label>
            <input
                type="text" 
                class="form-control"
                v-model="invoice.status"
            >
        </div>
    </div>
    <hr/>
    <div class="row mt-4">
        <button 
            type="button" 
            class="btn btn-primary btn-sm mb-2"
            @click="addItem"
        >
            <LucideIcon icon="Plus" />
            Add new item
        </button>
        <div 
            style="max-height: 300px; overflow-y: auto; overflow-x: hidden;"
        >
            <div 
                class="row mb-3" 
                v-for="(item, index) in invoice.items" 
                :key="index"
            >
                <div class="col-5">
                    <span class="form-label">Description</span>
                    <input
                        type="text" 
                        class="form-control"
                        v-model="item.description"
                    >
                </div>
                <div class="col-2">
                    <span class="form-label">Quantity</span>
                    <input
                        type="number" 
                        class="form-control"
                        v-model.number="item.quantity"
                    >
                </div>
                <div class="col-3">
                    <span class="form-label">Price</span>
                    <input
                        type="number" 
                        class="form-control"
                        v-model.number="item.price"
                    >
                </div>
                <div class="col-1 d-flex align-items-end">
                    <button 
                        type="button" 
                        class="btn btn-danger btn-sm"
                        @click="removeItem(index)"
                    >
                        <LucideIcon icon="Minus" />
                    </button>
                </div>
            </div>
        </div>        
    </div>
    <div class="row">
        <button
            class="btn btn-secondary mt-4"
            data-bs-toggle="modal"
            data-bs-target="#confirmationDialog"
        >
            <LucideIcon icon="SaveAll" />
            Save
        </button>
    </div>
    
    <ConfirmDialog 
        id="confirmationDialog"
        title="Confirm the information provided"
        message="Are you sure you want to generate the Invoice?"
        @confirm="generateInvoice"
    />
</template>

<script>
    import ConfirmDialog from "@/components/ConfirmDialog.vue";
    import pdfMake from 'pdfmake/build/pdfmake';
    import pdfFonts from 'pdfmake/build/vfs_fonts';
    pdfMake.vfs = pdfFonts.vfs; 
    
    export default {
        name: "InvoiceForm",
        components: {
            ConfirmDialog,
        },
        data: () => ({
            pdfUrl: null,
            invoice: {
                number: '',
                date: '',
                dueDate: '',
                from: '',
                to: '',
                currency: '',
                notes: '',
                terms: '',
                status: '',
                items: [
                    { 
                        description: '', 
                        quantity: 0, 
                        price: 0
                    },
                ],
            }
        }),
        methods: {
            addItem() {
                this.invoice.items.push({
                    description: '',
                    quantity: 1,
                    price: 0
                });
            },
            removeItem(index) {
                this.invoice.items.splice(index, 1);
            },
            async generateInvoice() {
                const docDefinition = {
                    content: [
                        { text: 'Invoice', style: 'header' },

                        { text: `Invoice #: ${this.invoice.number}`, margin: [0, 10] },
                        { text: `Date: ${this.invoice.date}` },
                        { text: `Due Date: ${this.invoice.dueDate}`, margin: [0, 0, 0, 20] },

                        { text: 'From:', style: 'subheader' },
                        { text: this.invoice.from, margin: [0, 0, 0, 20] },

                        { text: 'To:', style: 'subheader' },
                        { text: this.invoice.to, margin: [0, 0, 0, 20] },

                        { text: 'Items', style: 'subheader' },
                        {
                            table: {
                            widths: ['*', 50, 60, 70],
                            body: [
                                ['Description', 'Qty', 'Price', 'Total'],
                                ...this.invoice.items.map(item => [
                                    item.description,
                                    item.quantity.toString(),
                                    `${this.invoice.currency} ${item.price.toFixed(2)}`,
                                    `${this.invoice.currency} ${(item.quantity * item.price).toFixed(2)}`
                                ]),
                                [
                                    { text: 'Total', colSpan: 3, alignment: 'right' }, {}, {},
                                    `${this.invoice.currency} ${this.invoice.items.reduce((sum, i) => sum + i.price * i.quantity, 0).toFixed(2)}`
                                ]
                            ]
                            }
                        },

                        { text: 'Notes:', style: 'subheader', margin: [0, 20, 0, 0] },
                        { text: this.invoice.notes },

                        { text: 'Terms:', style: 'subheader', margin: [0, 20, 0, 0] },
                        { text: this.invoice.terms },

                        { text: `Status: ${this.invoice.status.toUpperCase()}`, margin: [0, 20, 0, 0] }
                    ],
                    styles: {
                        header: { fontSize: 22, bold: true },
                        subheader: { fontSize: 14, bold: true }
                    },
                    defaultStyle: { fontSize: 12 }
                }

                pdfMake.createPdf(docDefinition).getBlob(blob => {
                    console.log(blob)
                    if (this.pdfUrl) {
                        URL.revokeObjectURL(this.pdfUrl);
                    }
                    this.pdfUrl = URL.createObjectURL(blob);
                    this.$emit('showPDF', this.pdfUrl);
                });
            },
        },
    }
</script>