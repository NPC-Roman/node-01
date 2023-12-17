const fs = require("fs");
const path = require("path");

const contactsPath = path.resolve("./db/contacts.json");

function listContacts(callback) {
  fs.readFile(contactsPath, "utf8", function (error, data) {
    if (error) {
      return callback(error, null);
    }
    const contacts = JSON.parse(data);
    callback(null, contacts);
  });
}

function getContactById(contactId, callback) {
  listContacts((error, contacts) => {
    if (error) {
      return callback(error, null);
    }

    const contact = contacts.find(
      (contact) => Number(contact.id) === contactId
    );

    if (contact) {
      return callback(null, contact);
    } else {
      return callback(`Contact with ID ${contactId} not found`, null);
    }
  });
}

function removeContact(contactId, callback) {
  listContacts((error, contacts) => {
    if (error) {
      return callback(error);
    }

    const filterContacts = contacts.filter(
      (contact) => Number(contact.id) !== contactId
    );

    fs.writeFile(
      contactsPath,
      JSON.stringify(filterContacts),
      function (error) {
        if (error) {
          return callback(error);
        }
        callback(null, filterContacts);
      }
    );
  });
}

function addContact(name, email, phone, callback) {
  listContacts((error, contacts) => {
    if (error) {
      return callback(error);
    }

    const newContact = {
      name,
      email,
      phone,
      id: contacts.length + 1,
    };

    contacts.push(newContact);

    fs.writeFile(contactsPath, JSON.stringify(contacts), function (error) {
      if (error) {
        return callback(error);
      }
      callback(null, newContact);
    });
  });
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
