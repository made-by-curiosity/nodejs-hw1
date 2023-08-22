const fs = require('fs/promises');
const path = require('path');
const contactsPath = path.join(__dirname, 'db', 'contacts.json');
const { v4 } = require('uuid');

async function listContacts() {
  const res = await fs.readFile(contactsPath);

  return JSON.parse(res);
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const contact = contacts.find(contact => contact.id === contactId);

  if (!contact) {
    return null;
  }

  return contact;
}

async function removeContact(contactId) {
  const contactToDelete = await getContactById(contactId);

  if (!contactToDelete) {
    return null;
  }

  const contacts = await listContacts();

  const updatedContacts = contacts.filter(contact => contact.id !== contactId);

  await fs.writeFile(contactsPath, JSON.stringify(updatedContacts));

  return contactToDelete;
}

async function addContact(name, email, phone) {
  const newContact = {
    id: v4(),
    name,
    email,
    phone,
  };
  const allContacts = await listContacts();

  allContacts.push(newContact);

  await fs.writeFile(contactsPath, JSON.stringify(allContacts));

  return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
