//? +++++++++++++++++++  mongoose +++++++++++++++++++
const { NotFound, BadRequest } = require('http-errors');
const { Contact } = require("../../models");


//-----------------------------------------------------------------------------
const updatePatchContact = async (req, res, next) => {
    const { contactId } = req.params;

    //! Проверка условия "Если body нет" 
    if (!Object.keys(req.body).length) {
        throw new BadRequest(`missing all fields`)
    }

    const contact = await Contact.findByIdAndUpdate(contactId, req.body, { new: true });

    if (!contact) {
        throw new NotFound(`Contact wiht id:'${contactId}' not found`)
    }

    res.status(200).json({
        status: "success",
        code: 200,
        data: { contact }
    })
};

module.exports = updatePatchContact;
//? _____________________  mongoose _____________________








//todo --> OLD ------------------------------------
// const { NotFound } = require('http-errors')

// const contactsOperations = require("../../models/contacts")
// const { lineBreak } = require("../../service");


// //-----------------------------------------------------------------------------
// const updatePatchContact = async (req, res, next) => {
//     //! ===========================console============================
//     console.log("START-->PATCH/:id".rainbow); //!
//     lineBreak();
//     //! ==============================================================

//     const { contactId } = req.params;
//     const contact = await contactsOperations.updatePatchContact(contactId, req.body)

//     if (!contact) {
//         throw new NotFound(`Contact wiht id:'${contactId}' not found`)
//     }

//     res.status(200).json({
//         status: "success",
//         code: 200,
//         data: { contact }
//     })
// }

// module.exports = updatePatchContact