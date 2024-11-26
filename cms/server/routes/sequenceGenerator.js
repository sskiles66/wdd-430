const Sequence = require('../models/sequence');

module.exports = class SequenceGenerator {
  async initialize() {
    try {
      const sequence = await Sequence.findOne().exec();
      this.sequenceId = sequence._id;
      this.maxDocumentId = sequence.maxDocumentId;
      this.maxMessageId = sequence.maxMessageId;
      this.maxContactId = sequence.maxContactId;
    } catch (err) {
      console.error('Error initializing SequenceGenerator:', err);
      throw err; // Or handle the error as needed
    }
  }

  async nextId(collectionType) {
    try {
      let updateObject;
      let nextId;

      switch (collectionType) {
        case 'documents':
          this.maxDocumentId++;
          updateObject = { maxDocumentId: this.maxDocumentId };
          nextId = this.maxDocumentId;
          break;
        case 'messages':
          this.maxMessageId++;
          updateObject = { maxMessageId: this.maxMessageId };
          nextId = this.maxMessageId;
          break;
        case 'contacts':
          this.maxContactId++;
          updateObject = { maxContactId: this.maxContactId };
          nextId = this.maxContactId;
          break;
        default:
          return -1;
      }

      await Sequence.updateOne({ _id: this.sequenceId }, { $set: updateObject });
      return nextId;
    } catch (err) {
      console.error('Error generating next ID:', err);
      throw err; // Or handle the error as needed
    }
  }
}