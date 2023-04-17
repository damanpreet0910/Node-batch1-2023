const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/mern-stack-batch-1')
.then(() => console.log('Connected!'));