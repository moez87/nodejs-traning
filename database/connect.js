const mongoose = require('mongoose')

const options = {
    useNewUrlParser: true,
    useUnifieldTopology : true

};

   mongoose.connect('mongodb://localhost:27017/myapp', options).then(success=>{
    console.log("succefully connected to database")
}).catch(error=>{
    console.log('error')
})

