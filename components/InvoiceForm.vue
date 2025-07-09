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
    
    <Confirm 
        id="confirmationDialog"
        title="Confirm the information provided"
        message="Are you sure you want to generate the Invoice?"
        @confirm="generateInvoice"
    />
</template>

<script>
    import Confirm from "@/components/ConfirmDialog.vue";

    export default {
        name: "InvoiceForm",
        components: {
            Confirm,
        },
        data: () => ({
            invoice: {
                number: 'INV-001',
                date: '2025-06-23',
                dueDate: '2025-07-07',
                from: 'Acme Inc.\n123 Main St\nCity, Country',
                to: 'Client Name\n456 Avenue\nOther City',
                currency: 'USD',
                notes: 'Thanks for your business!',
                terms: 'Please pay within 14 days.',
                status: 'unpaid',
                items: [
                    { 
                        description: 'Consulting', 
                        quantity: 2, 
                        price: 200 
                    },
                    { 
                        description: 'Hosting', 
                        quantity: 1, 
                        price: 80 
                    }
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
            generateInvoice() {
                console.log("Generated")
            },
        }
    }
</script>