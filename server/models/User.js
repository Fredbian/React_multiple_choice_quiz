const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new Schema(
    {
        email: {
            type: String,
            required: [true, "Please provide an Email!"],
            unique: [true, "Email Exist"],
            match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/, "Please fill a valid email address"]
        },
        password: {
            type: String,
            required: [true, "Please provide a password!"]
        }
    }
)

// hash user password
userSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }
    next();
});

// custom method to compare and validate password for logging in
userSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

const User = model('User', userSchema);

module.exports = User;