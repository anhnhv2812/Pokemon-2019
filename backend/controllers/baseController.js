const mongodb = require('mongodb');

class BaseController {
  get model() {
    return DB.collection(this.collection);
  }

  getModel(collection) {
    return DB.collection(collection);
  }

  ObjectId(idString) {
    return mongodb.ObjectID(idString);
  }
}

module.exports = BaseController;