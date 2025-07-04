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
        >
            <LucideIcon icon="Plus" />
            Add new item
        </button>
        <div class="row">
            <div class="col-5">
                <span 
                    class="form-label"
                >
                    Description
                </span>
                <input
                    type="text" 
                    class="form-control"
                >
            </div>
            <div class="col-2">
                <span 
                    class="form-label"
                >
                    Quantity
                </span>
                <input
                    type="number" 
                    class="form-control"
                >
            </div>
            <div class="col-4">
                <span 
                    class="form-label"
                >
                    Price
                </span>
                <input
                    type="number" 
                    class="form-control"
                >
            </div>
            <div class="col-1">
                <button 
                    type="button" 
                    class="btn btn-danger btn-sm mt-4"
                >
                    <LucideIcon icon="Minus" />
                </button>
            </div>
        </div>
    </div>
    <div class="row">
        <button
            class="btn btn-secondary mt-4"
        >
            <LucideIcon icon="SaveAll" />
            Save
        </button>
    </div>
</template>

<script>
    export default {
        name: "InvoiceForm",
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
    }
</script>