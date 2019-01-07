const { mongoose, autoIncrement } = require('../mongo')

const userSchema = new mongoose.Schema({
    userNum: {
        type: Number,
        unique: true
    },
    ID:{
        type: String,
        unique: true,
        required : true,
    },
    password :{
        type: String,
        required : true,
    }
})

// userId를 Auto Increment 필드로 지정
userSchema.plugin(autoIncrement, {
    model: 'User',
    field: 'userNum',
    startAt: 1
})

module.exports = mongoose.model('User', userSchema)
