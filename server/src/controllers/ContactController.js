import db from 'models';

import { handleResponse } from 'helpers/util';

export default class ContactController {
  static createContact(req, res) {
    const { name, phoneNumber } = req.body;

    return db.Contact
      .findOrCreate({
        where: {
          name, phoneNumber
        }
      }).then(([contact, created]) => {
        return created ? handleResponse(res, 201, 'Contact successfully created', contact, true)
          : handleResponse(res, 400, 'Contact already exist', contact, false);;
      })
      .catch(err => {
        return handleResponse(res, 400, 'Creating contact not successfully created', err, false);
      });
  }

  static getContacts(req, res) {

    return db.Contact
      .findAll()
      .then(contacts => {
        return handleResponse(res, 201, 'Contact successfully retrieved', contacts, true);
      })
      .catch(err => {
        return handleResponse(res, 400, 'Error occured during retrieving', err, false);
      });
  }

  static deleteContacts(req, res) {
    const { contactId } = req.params

    return db.Contact
      .findAll({
        where: {
          id: contactId
        }
      })
      .then(contact => {
        if (contact.length === 0) {
          return handleResponse(res, 404, 'Contact not found', [], false);
        }

        return db.Contact.destroy({
          where: {
            id: contactId
          }
        })
          .then(deleted => {
            return handleResponse(res, 200, 'Contact successfully deleted', contact, true);
          })
          .catch(err => {
            return handleResponse(res, 400, 'Error occured during deletion', err, false);
          });
      })
      .catch(err => {
        return handleResponse(res, 400, 'Error occured during search', err, false);
      });
  }
}
