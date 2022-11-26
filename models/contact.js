//? +++++++++++++++++++  mongoose +++++++++++++++++++
const { Schema, model } = require("mongoose");
const Joi = require("joi");

// const contactSchema = Schema({
//     name: String,
//     email: String,
//     phone: String,
//     favorite: Boolean,
// });

const contactSchema = Schema({
    name: {
        type: String,
        required: [true, 'Set name for contact'],
    },
    email: {
        type: String,
    },
    phone: {
        type: String,
    },
    favorite: {
        type: Boolean,
        default: false,
    },
}, { versionKey: false, timestamp: true });


//* ++++++++++++++++++++++ Схемы ВАЛИДАЦИИ Joi +++++++++++++++++++++++++
const contactJoiSchemaPostPut = Joi.object({
    name: Joi.string()
        // .alphanum()
        .min(3)
        .max(30)
        .required(),

    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'ua', 'org',] } })
        .required(),

    phone: Joi.string()
        // .alphanum()
        .min(5)
        .max(14)
        .required(),

    favorite: Joi.bool()
        .optional(),
});

//--------------------------------------------------------------------
const contactJoiSchemaPatch = Joi.object({
    name: Joi.string()
        // .alphanum()
        .min(3)
        .max(30)
        .optional(),

    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'ua', 'org',] } })
        .optional(),

    phone: Joi.string()
        // .alphanum()
        .min(5)
        .max(14)
        .optional(),

    favorite: Joi.bool()
        .optional(),

});
//* _______________________ Схемы ВАЛИДАЦИИ Joi _______________________


//? Создаём МОДЕЛЬ:
const Contact = model("contact", contactSchema);


module.exports = {
    Contact,
    contactJoiSchemaPostPut,
    contactJoiSchemaPatch
};

//? _____________________  mongoose _____________________