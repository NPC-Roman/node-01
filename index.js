const contacts = require("./contacts");
const argv = require("yargs").argv;

function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      contacts.listContacts((error, contactsList) => {
        if (error) {
          console.error(error);
        } else {
          console.table(contactsList);
        }
      });
      break;

    case "get":
      contacts.getContactById(id, (error, contact) => {
        if (error) {
          console.error(error);
        } else {
          console.table([contact]);
        }
      });
      break;

    case "add":
      contacts.addContact(name, email, phone, (error, newContact) => {
        if (error) {
          console.error(error);
        } else {
          console.table([newContact]);
        }
      });
      break;

    case "remove":
      contacts.removeContact(id, (error, filterContacts) => {
        if (error) {
          console.error(error);
        } else {
          console.table(filterContacts);
        }
      });
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
