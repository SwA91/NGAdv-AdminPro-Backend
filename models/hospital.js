const { Schema, model } = require('mongoose');

const HospitalSchema = Schema(
    {
        name: {
            type: String,
            required: true
        },
        img: {
            type: String,
        },
        user: {
            required: true,
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    },
    {
        // personalized name
        collection: 'hospitals'
    }
);

HospitalSchema.method('toJSON', function () {

    const { __v, ...object } = this.toObject();

    return object;
})

module.exports = model('Hospital', HospitalSchema);