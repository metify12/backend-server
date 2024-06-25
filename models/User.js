const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const UserSchema = mongoose.Schema(
  {
    firstname: {
      type: String,
      required: [true, 'please add your firstName'],
      maxlength: [50, 'name cannot be more than 50 characters'],
    },
    lastname: {
      type: String,
      required: [true, 'please add your lastName'],
      maxlength: [50, 'name cannot be more than 50 characters'],
    },
    email: {
      type: String,
      required: [true, 'please provide an email'],
      unique: [true, 'user already exists'],
      match: [
        /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/,
        'please add a valid email address',
      ],
    },
    password: {
      type: String,
      required: [true, 'please add a password'],
      minlength: 8,
      select: false,
    },
    // objectID: {
    //   type: String,
    //   required: [true],
    // },

    resetPasswordToken: String,
    resetPasswordExpire: Date,
    lastPasswordReset: Date,
  },

  {
    timestamps: true,
  }
);

// Encrypt password using bcrypt
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Match user entered password to hashed password in the database
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Generate and hash password token
UserSchema.methods.getResetPasswordToken = function () {
  // generate token
  const resetToken = crypto.randomBytes(20).toString('hex');

  try {
    // Hash token and set to resetPasswordExpire field
    this.resetPasswordToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');

    // set expire
    this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

    return resetToken;
  } catch (error) {
    // handle error
    console.log('error generating reset password token:', error); 
    throw new Error('failed to generate reset password token');
  }
};
module.exports = mongoose.model('User', UserSchema);
