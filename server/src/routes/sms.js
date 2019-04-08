import express from 'express';

import { MessageController } from 'controllers';
import MessageValidator from 'middleware/validation';

const router = express.Router();

router.route('/contacts/sms')
    .post(MessageValidator.validateCreateSms, MessageController.createMessage)
    .get(MessageController.getAllMessage);

router.get('/contacts/:senderId/sent/sms',
    MessageValidator.validateParamsSenderId,
    MessageController.getSpecificSenderMsg);

router.get('/contacts/:receiverId/received/sms',
    MessageValidator.validateParamsReceiverId,
    MessageController.getSpecificReceipientMsg);

router.delete('/contacts/:senderId/sent/sms/:messageId',
    MessageValidator.validateDeleteSpecificSenderMsg,
    MessageController.deleteSpecificSenderMsg);

router.delete('/contacts/:receiverId/received/sms/:messageId',
    MessageValidator.validateDeleteSpecificReceiverMsg,
    MessageController.deleteSpecificReceiverMsg);

export default router;
