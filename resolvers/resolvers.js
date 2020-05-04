const bcrypt = require('bcrypt');
const User = require('../models/User');
const Book = require('../models/Book');
const Event = require('../models/Event');
const jwt = require('jsonwebtoken')
exports.getEvents = () => {

    return Event.find()
        .then(events => {
            return events;
        })
        .catch(err => {
            return;
        })
}

exports.getEvent = (parent, args) => {
    return Event.findById(args.eventid)
        .populate('creator')
        .exec()
        .then(event => {
            return event
        })
        .catch(err => {
            return;
        })
}
exports.getBookings = () => {

    return Book.find()
        .populate('user event')
        .exec()
        .then(bookings => {
            console.log(bookings)
            return bookings
        })
        .catch(err => {
            console.log(err)
            return;
        })



}

exports.getUsers = () => {
    return User.find()
        .populate('events')
        .then(users => {
            return users
        })
        .catch(err => {
            return;
        })
}

exports.getUser = (parent, args) => {

    return User.findById(args.userid)
        .populate('creator')
        .then(user => {
            return user
        })
        .catch(err => {
            return
        })
}

exports.userLogin = async (parent, args) => {
    const user = await User.findOne({ username: args.username });
    if (user) {
        const result = await bcrypt.compare(args.password, user.password);
        if (result) {
            const token = jwt.sign({
                _id: user._id,
                username: user.username
            }, process.env.JWT_SECRET_KEY)
            return { user: user, token: token }
        } else {
            return
        }
    }
    else
        return
}
exports.createEvent = (parent, args, req) => {
    if (req.isAuth) {

        const event = new Event({
            title: args.title,
            description: args.description,
            price: args.price,
            date: args.date,
            address: args.address,
            creator: req.user._id
        })
        return event.save()
            .then(result => {
                return User.updateOne({ _id: result._doc.creator }, { $push: { events: { ...result._doc } } })
                    .then(updateresult => {
                        return Event.findOne({ _id: result._doc._id })
                            .populate('creator')
                            .exec()
                            .then(event => {
                                return event
                            })
                            .catch(err => {
                                return;
                            })
                    })
                    .catch(err => {
                        return;
                    })

            })
            .catch(err => {
                return;
            })
    }
    return;
}
exports.bookEvent = async (parent, args, req) => {
    if (req.isAuth)
        try {
            const event = await Event.findOne({ _id: args.eventid });
            if (event) {
                const booking = new Book({
                    user: req.user._id,
                    event: event
                })
                await booking.save()
                return booking;
            } else {
                return;
            }
        } catch (error) {
            return;
        }
    return new Error("User is not Authenticated");

}

exports.createUser = (parent, args) => {

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
                    return;
                })
        })
        .catch(err => {
            return;
        })


}

exports.deleteEvent = (parent, args) => {
    return Event.findById(args.eventid)
        .then(event => {
            return Event.deleteOne({ _id: event._id })
                .then(result => {
                    return event
                })
                .catch(err => {
                    return;
                })
        })
        .catch(err => {
            return;
        })
}
exports.deleteUser = (parent, args) => {
    return User.findOne({ _id: args.userid })
        .then(user => {
            return User.deleteOne({ _id: args.userid })
                .then(result => {
                    return user
                })
                .catch(err => {
                    return;
                })
        })
        .catch(err => {
            return;
        })
}

exports.updateUser = async (parent, args, req) => {
    if (req.isAuth)
        try {
            let oldUserSetting = await User.findOneAndUpdate({ _id: req.user._id },
                { $set: { username: args.username, name: args.name, surname: args.surname } })
            return oldUserSetting;

        } catch (error) {
            return;
        }
    return new Error("User is not Authenticated");
}

exports.updateUserPassword = async (parent, args, req) => {
    if (req.isAuth)
        try {
            let user = await User.findById(req.user._id);
            let result = await bcrypt.compare(args.oldpassword, user.password);
            if (result) {
                let hashedpass = await bcrypt.hash(args.newpassword, 11);
                await User.updateOne({ _id: req.user._id }, { $set: { password: hashedpass } })
                return "Password Successfully changed"
            } else {
                return new Error("Authenticated failed");
            }
        } catch (err) {
            return new Error(err);

        }
    return new Error("User is not Authenticated");

}