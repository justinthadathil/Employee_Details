const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/CurdDB', { useNewUrlParser: true })

mongoose.connection
.once("open", () => console.log('Connected DB..'))
.on("error", error => {
    console.log("Your Error", error);
});

module.exports = mongoose;