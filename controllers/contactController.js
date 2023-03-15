const asyncHandler = require("express-async-handler") // This help us not to use try catche block for error handling

const contactModel = require('../model/contactModels')

const getContacts = asyncHandler(async (req, res) => {
    const contacts = await contactModel.find();
    return res.status(200).send(contacts) // or =>  res.status(200).json({"message": "messaga"})

})

const getContact = asyncHandler(async (req, res) => {
    const contact = await contactModel.findById(req.params.id);

    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }
    res.status(200).json(contact);// or =>  res.status(200).json({"message": "messaga"})

});

const createContact = asyncHandler(async (req, res) => {
    console.log(req.body);
    const { name, email, phone } = req.body
    if (!name || !email || !phone) {
        res.status(400);
        throw new Error("All fields are required");
    }
    const contact = await contactModel.create({
        name,
        email,
        phone, 
        user_id: req.user.id,
    });
    res.status(201).json(contact) // or =>  res.json({"message": "messaga"})

})

const updateContact = asyncHandler(async (req, res) => {
    const contact = await contactModel.findById(req.params.id);

    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }

    const updatedContact = await contactModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedContact);// or =>  res.json({"message": "messaga"})

}
)
const deleteContact = asyncHandler(async (req, res) => {
    const contact = await contactModel.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }
    await contactModel.remove()
    res.status(200).json(contact) // or =>  res.json({"message": "messaga"})

})
module.exports = { getContact, createContact, updateContact, getContacts, deleteContact }