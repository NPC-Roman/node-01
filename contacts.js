const fs = require("fs");
const path = require("path");

const contactsPath = path.resolve("./db/contacts.json");

function listContacts() {
  fs.readFile(contactsPath, "utf8", function (error, data) {
    if (error) {
      console.log(error.message);
    }
    const contacts = JSON.parse(data);
    console.table(contacts);
  });
}

function getContactById(contactId) {
  fs.readFile(contactsPath, "utf8", function (error, data) {
    if (error) {
      console.log(error);
    }

    const contacts = JSON.parse(data);

    contacts.find((contact) => {
      if (Number(contact.id) === contactId) {
        return console.log(`contact with ID ${contactId} in contact List`);
      }
    });
  });
}

function removeContact(contactId) {
  fs.readFile(contactsPath, "utf8", function (error, data) {
    if (error) {
      console.log(error);
    }

    const contacts = JSON.parse(data);

    const filterContacts = contacts.filter(
      (contact) => Number(contact.id) !== contactId
    );

    console.table(filterContacts);
    fs.writeFile(
      contactsPath,
      JSON.stringify(filterContacts),
      function (error) {
        if (error) {
          return console.log(error);
        }
      }
    );
  });
}

function addContact(name, email, phone) {
  fs.readFile(contactsPath, "utf8", function (error, data) {
    if (error) {
      return console.log(error);
    }

    const contacts = JSON.parse(data);
    contacts.push({
      name,
      email,
      phone,
      id: contacts.length + 1,
    });

    console.table(contacts);
    fs.writeFile(contactsPath, JSON.stringify(contacts), function (error) {
      if (error) {
        return console.log(error);
      }
    });
  });
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
