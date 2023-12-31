const contactsOperations = require('./contacts');
const { Command } = require('commander');
const program = new Command();
program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      const contacts = await contactsOperations.listContacts();
      console.table(contacts);
      break;

    case 'get':
      const contact = await contactsOperations.getContactById(id);
      console.log(contact);

      if (!contact) {
        throw new Error(`Contact with id=${id} not found`);
      }
      break;

    case 'add':
      const newContact = await contactsOperations.addContact(name, email, phone);
      console.log('added ', newContact);
      break;

    case 'remove':
      const deletedContact = await contactsOperations.removeContact(id);
      console.log(deletedContact);

      if (!deletedContact) {
        throw new Error(`Contact with id=${id} not found`);
      }
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction(argv);
