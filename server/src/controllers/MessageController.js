import db from 'models';

import { handleResponse } from 'helpers/util';

export default class MessageController {
  static createMessage(req, res) {
    const {
      message,
      senderId,
      receiverId,
      status,
    } = req.body;

    return db.Message
      .create({
        message, senderId, receiverId, status
      }).then(sms => {
        return handleResponse(res, 201, 'Sms successfully created', sms, true);
      })
      .catch(err => {
        return handleResponse(res, 400, 'Error occured during operation', err, false);
      });
  }

  static getAllMessage(req, res) {

    return db.Message
      .findAll({
        include: [db.Contact]
      })
      .then(sms => {
        return handleResponse(res, 200, 'Sms successfully retrieved', sms, true);
      })
      .catch(err => {
        return handleResponse(res, 400, 'Error occured during retrieving', err, false);
      });
  }

  static getSpecificSenderMsg(req, res) {
    const { senderId } = req.params;

    return db.Message
      .findAll({
        where: {
          senderId
        }
      })
      .then(sms => {
        if (sms.length === 0) {
          return handleResponse(res, 404, 'User message not found', sms, false);
        }

        return handleResponse(res, 200, 'Sms successfully retrieved', sms, true);
      })
      .catch(err => {
        return handleResponse(res, 400, 'Error occured during retrieving', err, false);
      });
  }
  static getSpecificReceipientMsg(req, res) {
    const { receiverId } = req.params;

    return db.Message
      .findAll({
        where: {
          receiverId
        }
      })
      .then(sms => {
        if (sms.length === 0) {
          return handleResponse(res, 404, 'User message not found', sms, false);
        }

        return handleResponse(res, 200, 'Sms successfully retrieved', sms, true);
      })
      .catch(err => {
        return handleResponse(res, 400, 'Error occured during retrieving', err, false);
      });
  }
  static deleteSpecificSenderMsg(req, res) {
    const { senderId, messageId } = req.params;

    return db.Message
      .findAll({
        where: {
          senderId,
          id: messageId
        }
      })
      .then(sms => {
        if (sms.length === 0) {
          return handleResponse(res, 404, 'User message not found', sms, false);
        }

        return db.Message
          .destroy({
            where: {
              id: messageId
            }
          })
          .then(detailsDeleted => {
            return handleResponse(res, 200, 'Sms successfully deleted', sms, true);
          })
          .catch(err => {
            return handleResponse(res, 400, 'Error occured during deletion', err, false);
          })
      })
      .catch(err => {
        return handleResponse(res, 400, 'Error occured during retrieving', err, false);
      });
  }

  static deleteSpecificReceiverMsg(req, res) {
    const { receiverId, messageId } = req.params;

    return db.Message
      .findAll({
        where: {
          receiverId,
          id: messageId
        }
      })
      .then(sms => {
        if (sms.length === 0) {
          return handleResponse(res, 404, 'User message not found', sms, false);
        }

        return db.Message
          .destroy({
            where: {
              id: messageId
            }
          })
          .then(detailsDeleted => {
            return handleResponse(res, 200, 'Sms successfully retrieved', sms, true);
          })
          .catch(err => {
            return handleResponse(res, 400, 'Error occured during deletion', err, false);
          })
      })
      .catch(err => {
        return handleResponse(res, 400, 'Error occured during retrieving', err, false);
      });
  }
}
