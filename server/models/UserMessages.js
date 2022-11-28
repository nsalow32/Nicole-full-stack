const mongoose = require('mongoose');
const _ = require('lodash');
const generateSlug = require('../utils/slugify');

const { Schema } = mongoose;

mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useNewUrlParser', true);

const mongoSchema = new Schema({
  googleId: {
    type: String,
    required: true,
    unique: true,
  },
  googleToken: {
    access_token: String,
    refresh_token: String,
    token_type: String,
    expiry_date: Number,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  messageContents: {
    type: String,
    required: true,
  },
  displayName: String,
  avatarUrl: String,
});

class UserMessageClass {
  static publicFields() {
    return ['id', 'displayName', 'slug', 'content'];
  }

  static async logMessages({ googleId, displayName, content }) {
    const slug = await generateSlug(this, content);

    const newMessage = await this.create({
      createdAt: new Date(),
      googleId,
      displayName,
      content,
      slug,
    });

    return _.pick(newMessage, UserMessageClass.publicFields());
  }
}

mongoSchema.loadClass(UserMessageClass);

const UserMessage = mongoose.model('UserMessage', mongoSchema);

module.exports = UserMessage;
