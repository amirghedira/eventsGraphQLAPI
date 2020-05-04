


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

const BookingType = new GraphQLObjectType({
    name: 'booking',
    fields: () => ({
        _id: { type: GraphQLNonNull(GraphQLString) },
        user: { type: GraphQLNonNull(UserType) },
        event: { type: GraphQLNonNull(EventType) },
        createdAt: { type: GraphQLNonNull(GraphQLString) },
        updatedAt: { type: GraphQLNonNull(GraphQLString) }
    })
})

const loginType = new GraphQLObjectType({
    name: 'login',
    fields: () => ({
        user: { type: UserType },
        token: { type: GraphQLNonNull(GraphQLString) }
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
        bookings: {
            type: GraphQLList(BookingType),
            resolve: resolvers.getBookings
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
            type: loginType,
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
            },
            resolve: resolvers.createEvent

        },
        bookEvent: {
            type: BookingType,
            args: {
                eventid: { type: GraphQLNonNull(GraphQLString) }
            },
            resolve: resolvers.bookEvent
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
                username: { type: GraphQLNonNull(GraphQLString) },
                name: { type: GraphQLNonNull(GraphQLString) },
                surname: { type: GraphQLNonNull(GraphQLString) },
            },
            resolve: resolvers.updateUser
        },
        updateUserPassword: {
            type: GraphQLString,
            args: {
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