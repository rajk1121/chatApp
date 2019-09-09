const mongoose = require('mongoose');
const validator = require("validator");
const crypto = require('crypto');
const bcrypt = require('bcrypt')
const DB = "mongodb+srv://rajk1121:Rajat1121@cluster0-chamy.mongodb.net/test?retryWrites=true&w=majority"
mongoose.connect(DB, {
    useNewUrlParser: true
}).then(conn => {
    // console.log(conn.connection);
    console.log('Connnected to DataBase');


});

const UserSchema = new mongoose.Schema({
    name: {
        type: String, required: true,
        validate: function abc(val) {
            var str = val.split(" ").join("");
            if (!validator.isAlpha(str)) {
                throw new Error("Name contains numerics");
            }

        }
    },
    roles: {
        type: String,
        enum: ["restaurant-owner", "cook", "user", "admin"],
        default: "user"
    },
    password: {
        type: String,
        required: true,
        validate: function abc(val) {
            if (!validator.isLength(val, { min: 8, max: undefined })) {
                throw new Error("Passwordlength is too short. Should be minimum of 8 in length")
            }
        }
    },
    confirmPassword: {
        type: String,
        required: true,
        validate: async function abc(val) {
            // console.log("2")
            let ans = await bcrypt.compare(this.password, val);
            console.log(ans)
            console.log(val)
            console.log(this.password)
            if (val !== this.password) {
                console.log('hello')
                throw new Error("Password does not match")
            }
        }
    },

    username: {
        type: String, required: true, unique: true,
        validate: function abc(val) {
            var str = val.split(" ").join("");
            if (!validator.isAlphanumeric(str)) {
                throw new Error("username is not alphanumeric");
            }

        }
    },
    email: {
        type: String, required: true, unique: true,
        validate: validator.isEmail
    },
    socket: []

})
UserSchema.pre('save', async function (next) {
    console.log(this.password);
    console.log(this.confirmPassword)
    this.password = await bcrypt.hash(this.password, 8);
    this.confirmPassword = await bcrypt.hash(this.confirmPassword, 8);
    console.log('hashed')
    next();
})

const UserModels = mongoose.model('chatUser', UserSchema);


module.exports = UserModels;