const { type } = require('@hapi/joi/lib/extend');
var mongoose = require('mongoose');
var schema = mongoose.Schema;
var orderdata = new schema({
    orderUniqueID: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    orderId: {
        type: String,
        required: false,
        default: "ORD-100001"
    },
    contactData: {
        type: String,
        required: false,
        default: ""
    },
    emailID: {
        type: String,
        required: false,
        default: ""
    },
    phoneNumber: {
        type: String,
        required: false,
        default: ""
    },
    Products: {
        type: Array,
        required: false,
        default: []
    },
    addressDetails: {
        country: {
            type: String,
            required: false,
            default: ""
        },
        firstName: {
            type: String,
            required: false,
            default: ""
        },
        lastName: {
            type: String,
            required: false,
            default: ""
        },
        address: {
            type: String,
            required: false,
            default: ""
        },
        apartment: {
            type: String,
            required: false,
            default: ""
        },
        city: {
            type: String,
            required: false,
            default: ""
        },
        state: {
            type: String,
            required: false,
            default: ""
        },
        pincode: {
            type: String,
            required: false,
            default: ""
        },
        phoneNumber: {
            type: String,
            required: false,
            default: ""
        }

    },
    shippingMethod: {
        type: String,
        required: false,
        default: ""
    },
    billingAddressDetails: {
        country: {
            type: String,
            required: false,
            default: ""
        },
        firstName: {
            type: String,
            required: false,
            default: ""
        },
        lastName: {
            type: String,
            required: false,
            default: ""
        },
        address: {
            type: String,
            required: false,
            default: ""
        },
        apartment: {
            type: String,
            required: false,
            default: ""
        },
        city: {
            type: String,
            required: false,
            default: ""
        },
        state: {
            type: String,
            required: false,
            default: ""
        },
        pincode: {
            type: String,
            required: false,
            default: ""
        },
        phoneNumber: {
            type: String,
            required: false,
            default: ""
        }


    },
    coupanCode: {
        type: String,
        required: false,
        default: ""
    },
    coupanAmount: {
        type: Number,
        required: false,
        default: 0
    },
    subTotal: {
        type: Number,
        required: false,
        default: 0
    },
    deliveryFee: {
        type: Number,
        required: false,
        default: 0
    },
    totalToPay: {
        type: Number,
        required: false,
        default: 0
    },
    fronzenCharges: {
        type: Number,
        required: false,
        default: 0
    },
    paymentType: {
        type: String,
        required: false,
        default: ""
    },
    paymentData: {
        type: Object,
        required: false,
        default: { Object }
    },
    //New >> InProgress >> Shipped >> Delivered >> Cancelled
    orderStatus: {
        type: String,
        required: false,
        default: "New"
    },

    //Accepted or rejected by admin timestamp then status change to Inprogress
    inprogressTimestamp: {
        type: String,
        required: false,
        default: ""
    },
    //Shipped timestamp
    shippedTimestamp: {
        type: String,
        required: false,
        default: ""
    },
    //Delivered timestamp
    deliveredTimestamp: {
        type: String,
        required: false,
        default: ""
    },
    //Cancelled timestamp
    cancelledTimestamp: {
        type: String,
        required: false,
        default: ""
    },
    //rejected timestamp
    rejectedTimestamp: {
        type: String,
        required: false,
        default: ""
    },
    paymentStatus: {
        type: String,
        required: false,
        default: ""
    },
    orderTrackingDetails: {
        courierServiceName: {
            type: String,
            required: false,
            default: ""
        },
        shippingDate: {
            type: String,
            required: false,
            default: ""
        },
        trackingID: {
            type: String,
            required: false,
            default: ""
        }
    },
    orderTimeStamp: {
        type: String,
        required: false,
        default: new Date().getTime().toString()
    }

})
module.exports = mongoose.model('ordersdata', orderdata)