const mongodb = require('mongodb');
const getDb = require('../util/database').getDb;

class User {
  constructor(name, email, id) {
    this.name = name;
    this.email = email;
  }

  save() {
    const db = getDb();
    let dbOp;
    if (this._id) {
      // Update the user
      dbOp = db.collection('users').updateOne(
        { _id: this._id },
        { $set: this }
      );
    } else {
      // Insert the user
      dbOp = db.collection('users').insertOne(this);
    }
    return dbOp
      .then(result => {
        console.log(result);
      })
      .catch(err => {
        console.error(err);
      });
  }

  static findUserByID(userId) {
    const db = getDb();
    return db.collection('users')
      .find({ _id: new mongodb.ObjectId(userId) })
      .next()
      .then(user => {
        console.log(user);
        return user;
      })
      .catch(err => {
        console.error(err);
      });
  }
}

module.exports = User;
