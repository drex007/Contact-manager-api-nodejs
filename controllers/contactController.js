const getContacts = (req, res) => {
    return res.status(200).send({ "message": "Get all contacts" }) // or =>  res.status(200).json({"message": "messaga"})

}

const getContact = (req, res) => {
    return res.status(200).send({ "message": "Get a contacts" }) // or =>  res.status(200).json({"message": "messaga"})

}
const createContact = (req, res) => {
    console.log(req.body);
    const { name, email, phone } = req.body
    if (!name || !email || !phone) {
        res.status(400);
        throw new Error("All fields are required");
    }
    return res.status(201).send({ "message": "Post a contact" }) // or =>  res.json({"message": "messaga"})

}

const updateContact = (req, res) => {
    return res.send({ "message": `Update a contact for ${req.params.id}` }) // or =>  res.json({"message": "messaga"})

}

const deleteContact = (req, res) => {
    return res.send({ "message": `Delete a contact for ${req.params.id}` }) // or =>  res.json({"message": "messaga"})

}
module.exports = { getContact, createContact, updateContact, getContacts, deleteContact }