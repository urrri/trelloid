const mongoose = require('mongoose');

module.exports.withTransaction = async action => {
  const session = undefined;///await mongoose.startSession();
  // session.startTransaction();
  try {
    const res = await action(session);
    // session.commitTransaction();
    return res;
  } catch (e) {
    // session.abortTransaction();
    throw e;
  }
};

