import mongoose, { mongo } from "mongoose";

const subscriptionSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        minLength: 2,
        maxLength: 100
    },
    price: {
        type: Number,
        require: [true, 'Sbscription price is required'],
        min: [0, 'Price can not be less than 0']
    },
    currency: {
        type: String,
        enum: ['INR', 'USD', 'EUR'],
        default: 'INR'
    },
    frequency: {
        type: String,
        enum: ['daily', 'weekly', 'monthly', 'yearly'],
        require: [true, 'Choose freq between daily, weekly, monthly, yearly']
    },
    category: {
        type: String,
        enum: ['AIpro', 'entertainment', 'tech', 'other'],
        required: [true, 'Choose category between AIpro, entertainment, tech, other ']
    },
    paymentMethod:{
        type:String,
        required:true,
        trim:true
    },
    status: {
        type: String,
        enum: ['active', 'cancelled', 'expire'],
        default: 'active'
    },
    startDate: {
        type: Date,
        require: true,
        validate: {
            validator: (value) => { value <= new Date() },
            message: 'Start date must be in the past'
        }
    },
    renewalDate: {
        type: Date,
        validate: {
            validator: function (value) {
                return value > this.startDate
            },
            message: 'Renewal date must be after the start date'
        }

    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    }
}, { timestamps: true })

// to Auto calculate if renewal date is missing based on frequency
subscriptionSchema.pre('save',function(next){
    if(!this.renewalDate){
        const renewalPeriods = {
            daily:1,
            weekly:7,
            monthly:30,
            yearly:365
        };
        this.renewalDate = new Date(this.startDate);
        this.renewalDate.setDate(this.renewalDate.getDate()+renewalPeriods[this.frequency]);
    }
    if (this.renewalDate < new Date()){
        this.status = 'expire';
    }
    next();
});

const Subscription = mongoose.model("Subscription",subscriptionSchema);

export default Subscription;