
export default class SmsManagement {
  static validateCreateContact(req, res, next) {
    req.checkBody('phoneNumber', 'Please supply a phone number').notEmpty();

    req.checkBody('name', 'Please supply name').notEmpty().isLength({ min: 2 });

    if (req.validationErrors()) {
      return req.getValidationResult()
        .then(result => res.status(422).json({ message: 'Please check your credentials', errors: result.mapped() }));
    }

    return next();
  }

  static validateDeleteContact(req, res, next) {
    req.checkParams('contactId', 'Please supply a valid contact Id').notEmpty().isInt();

    if (req.validationErrors()) {
      return req.getValidationResult()
        .then(result => res.status(422).json({ message: 'Please check your credentials', errors: result.mapped() }));
    }

    return next();
  }

  static validateSenderId(req, res, next) {
    req.checkParams('senderId', 'Please supply a valid senderId').notEmpty().isInt();

    if (req.validationErrors()) {
      return req.getValidationResult()
        .then(result => res.status(422).json({ message: 'Please check your credentials', errors: result.mapped() }));
    }

    return next();
  }

  static validateCreateSms(req, res, next) {
    req.checkBody('message', 'Please supply a valid message').notEmpty();
    req.checkBody('senderId', 'Please supply a valid senderId').notEmpty().isInt({ min: 1});
    req.checkBody('receiverId', 'Please supply a valid receiverId').notEmpty().isInt({ min: 1});
    req.checkBody('status', 'Please supply a valid status either sent or failed').notEmpty().isIn(["failed", "sent"]);

    if (req.validationErrors()) {
      return req.getValidationResult()
        .then(result => res.status(422).json({ message: 'Please check your credentials', errors: result.mapped() }));
    }

    return next();
  }

  static validateReceiverId(req, res, next) {
    req.checkBody('receiverId', 'Please supply a valid receiverId').notEmpty().isInt({ min: 1});

    if (req.validationErrors()) {
      return req.getValidationResult()
        .then(result => res.status(422).json({ message: 'Please check your credentials', errors: result.mapped() }));
    }

    return next();
  }

  static validateDeleteSpecificSenderMsg(req, res, next) {
    req.checkParams('senderId', 'Please supply a valid senderId').notEmpty().isInt({ min: 1});
    req.checkParams('messageId', 'Please supply a valid messageId').notEmpty().isInt({ min: 1});

    if (req.validationErrors()) {
      return req.getValidationResult()
        .then(result => res.status(422).json({ message: 'Please check your credentials', errors: result.mapped() }));
    }

    return next();
  }

  static validateDeleteSpecificReceiverMsg(req, res, next) {
    req.checkParams('receiverId', 'Please supply a valid receiverId').notEmpty().isInt({ min: 1});
    req.checkParams('messageId', 'Please supply a valid messageId').notEmpty().isInt({ min: 1});

    if (req.validationErrors()) {
      return req.getValidationResult()
        .then(result => res.status(422).json({ message: 'Please check your credentials', errors: result.mapped() }));
    }

    return next();
  }

  static validateParamsReceiverId(req, res, next) {
    req.checkParams('receiverId', 'Please supply a valid receiverId').notEmpty().isInt({ min: 1});

    if (req.validationErrors()) {
      return req.getValidationResult()
        .then(result => res.status(422).json({ message: 'Please check your credentials', errors: result.mapped() }));
    }

    return next();
  }
  static validateParamsSenderId(req, res, next) {
    req.checkParams('senderId', 'Please supply a valid senderId').notEmpty().isInt({ min: 1});

    if (req.validationErrors()) {
      return req.getValidationResult()
        .then(result => res.status(422).json({ message: 'Please check your credentials', errors: result.mapped() }));
    }

    return next();
  }
}