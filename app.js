const express = require('express');
const graphqlHTTP = require('express-graphql');
const mongoose = require('mongoose');
const app = express();
const schema = require('./schema/schema')
mongoose.connect(process.env.MONGO_INFO, {
    useUnifiedTopology: true,
    useNewUrlParser: true
})


app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true
}))



module.exports = app;