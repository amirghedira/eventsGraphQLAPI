const express = require('express');
const graphqlHTTP = require('express-graphql');
const mongoose = require('mongoose');
const User = require('./models/User');
const Book = require('./models/Book');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const Event = require('./models/Event');

mongoose.connect(process.env.MONGO_INFO, {
    useUnifiedTopology: true,
    useNewUrlParser: true
})

const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull,
    GraphQLFloat,
    GraphQLList
} = require('graphql')
const app = express();


const EventType = new GraphQLObjectType({
    name: 'event',
    description: 'this is an event',
    fields: () => ({
        _id: { type: GraphQLNonNull(GraphQLString) },
        title: { type: GraphQLNonNull(GraphQLString) },
        description: { type: GraphQLNonNull(GraphQLString) },
        price: { type: GraphQLFloat },
        date: { type: GraphQLNonNull(GraphQLString) },
        address: { type: GraphQLNonNull(GraphQLString) },
        authorid: { type: GraphQLNonNull(GraphQLString) }

    })
})

const UserType = new GraphQLObjectType({
    name: 'user',
    description: 'this is a user',
    fields: () => ({
        _id: { type: GraphQLNonNull(GraphQLString) },
        username: { type: GraphQLNonNull(GraphQLString) },
        name: { type: GraphQLNonNull(GraphQLString) },
        surname: { type: GraphQLNonNull(GraphQLString) },
        password: { type: GraphQLNonNull(GraphQLString) },
        events: { type: GraphQLList(EventType) }

    })
})

const rootQueryType = new GraphQLObjectType({
    name: 'Query',
    description: 'root query',
    fields: () => ({
        events: {
            type: GraphQLList(EventType),
            description: 'this is list of event',
            resolve: () => {
                return Event.find()
                    .then(events => {
                        return events;
                    })
                    .catch(err => {
                        return;
                    })

            }
        },
        users: {
            type: GraphQLList(UserType),
            description: 'this is a list of users',
            resolve: () => {
                return User.find()
                    .then(users => {
                        return users
                    })
                    .catch(err => {
                        return;
                    })
            }
        }

    })
})

const rootMutationType = new GraphQLObjectType({
    name: 'mutation',
    description: 'mutation query',
    fields: () => ({
        createEvent: {
            type: EventType,
            description: 'create an events',
            args: {
                title: { type: GraphQLNonNull(GraphQLString) },
                description: { type: GraphQLNonNull(GraphQLString) },
                price: { type: GraphQLFloat },
                date: { type: GraphQLNonNull(GraphQLString) },
                address: { type: GraphQLNonNull(GraphQLString) }
                // authorid: { type: GraphQLNonNull(GraphQLString) }
            },
            resolve: (parent, args) => {
                const event = new Event({
                    title: args.title,
                    description: args.description,
                    price: args.price,
                    date: args.date,
                    address: args.address,
                    authorid: '5eab4a1d507631093eb7f093'
                })
                return event.save()
                    .then(result => {
                        console.log(result)
                        return { ...result._doc, _id: result._doc._id.toString() }
                    })
                    .catch(err => {
                        console.log(err)
                        return;
                    })
            }

        },
        createUser: {
            type: UserType,
            description: 'create a user',
            args: {
                username: { type: GraphQLNonNull(GraphQLString) },
                name: { type: GraphQLNonNull(GraphQLString) },
                surname: { type: GraphQLNonNull(GraphQLString) },
                password: { type: GraphQLNonNull(GraphQLString) }
            },
            resolve: (parent, args) => {

                return bcrypt.hash(args.password, 11)
                    .then(hashedpass => {
                        const user = new User({
                            username: args.username,
                            name: args.name,
                            surname: args.surname,
                            password: hashedpass,
                            events: []
                        })
                        return user.save()
                            .then(result => {
                                return { ...result._doc }
                            })
                            .catch(err => {
                                console.log(err)
                                return;
                            })
                    })
                    .catch(err => {
                        return;
                    })


            }
        },
        deleteUser: {
            type: UserType,
            description: 'delete a user',
            args: {
                userid: { type: GraphQLString }
            },
            resolve: (parent, args) => {
                return User.findOne({ _id: args.userid })
                    .then(user => {
                        return User.deleteOne({ _id: args.userid })
                            .then(result => {
                                return user
                            })
                            .catch(err => {
                                console.log(err)
                                return;
                            })
                    })
                    .catch(err => {
                        console.log(err)
                        return;
                    })
            }
        }

    })

})

const schema = new GraphQLSchema({
    query: rootQueryType,
    mutation: rootMutationType
})
app.use('/graphql', graphqlHTTP({
    graphiql: true,
    schema: schema
}))



module.exports = app;