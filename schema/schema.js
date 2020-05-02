

const jwt = require('jsonwebtoken')

const resolvers = require('../resolvers/resolvers')

const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull,
    GraphQLFloat,
    GraphQLList
} = require('graphql')
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
        creator: { type: GraphQLNonNull(UserType) }

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
        event: {
            type: EventType,
            description: 'get specific event with id',
            args: {
                eventid: { type: GraphQLNonNull(GraphQLString) }
            },
            resolve: resolvers.getEvent
        },
        user: {
            type: UserType,
            description: 'get specific user with id',
            args: {
                userid: { type: GraphQLNonNull(GraphQLString) }
            },
            resolve: resolvers.getUser
        },
        events: {
            type: GraphQLList(EventType),
            description: 'this is list of event',
            resolve: resolvers.getEvents
        },
        users: {
            type: GraphQLList(UserType),
            description: 'this is a list of users',
            resolve: resolvers.getUsers
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
            resolve: resolvers.createEvent

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
            resolve: resolvers.createUser
        },
        deleteUser: {
            type: UserType,
            description: 'delete a user',
            args: {
                userid: { type: GraphQLNonNull(GraphQLString) }
            },
            resolve: resolvers.deleteUser
        },
        deleteEvent: {
            type: EventType,
            args: {
                eventid: { type: GraphQLNonNull(GraphQLString) }
            },
            resolve: resolvers.deleteEvent
        }

    })

})

module.exports = new GraphQLSchema({
    query: rootQueryType,
    mutation: rootMutationType
})