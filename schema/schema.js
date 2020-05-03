

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
            args: {
                eventid: { type: GraphQLNonNull(GraphQLString) }
            },
            resolve: resolvers.getEvent
        },
        user: {
            type: UserType,
            args: {
                userid: { type: GraphQLNonNull(GraphQLString) }
            },
            resolve: resolvers.getUser
        },
        events: {
            type: GraphQLList(EventType),
            resolve: resolvers.getEvents
        },
        users: {
            type: GraphQLList(UserType),
            resolve: resolvers.getUsers
        },
        login: {
            type: UserType,
            args: {
                username: { type: GraphQLNonNull(GraphQLString) },
                password: { type: GraphQLNonNull(GraphQLString) }
            },
            resolve: resolvers.userLogin
        }

    })
})

const rootMutationType = new GraphQLObjectType({
    name: 'mutation',
    description: 'mutation query',
    fields: () => ({
        createEvent: {
            type: EventType,
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
        },
        updateUser: {
            type: UserType,
            args: {
                userid: { type: GraphQLNonNull(GraphQLString) },
                username: { type: GraphQLNonNull(GraphQLString) },
                name: { type: GraphQLNonNull(GraphQLString) },
                surname: { type: GraphQLNonNull(GraphQLString) },
            },
            resolve: resolvers.updateUser
        },
        updateUserPassword: {
            type: GraphQLString,
            args: {
                userid: { type: GraphQLNonNull(GraphQLString) },
                newpassword: { type: GraphQLNonNull(GraphQLString) },
                oldpassword: { type: GraphQLNonNull(GraphQLString) }
            },
            resolve: resolvers.updateUserPassword,
        }

    })

})

module.exports = new GraphQLSchema({
    query: rootQueryType,
    mutation: rootMutationType
})