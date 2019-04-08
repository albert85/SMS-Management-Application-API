import express from 'express';

import { ContactController } from 'controllers';
import ContactValidator from 'middleware/validation';

const router = express.Router();

router.route('/contacts')
  .post(ContactValidator.validateCreateContact, ContactController.createContact)
  .get(ContactController.getContacts);

router.delete('/contacts/:contactId', ContactValidator.validateDeleteContact, ContactController.deleteContacts);

export default router;
