const bcrypt = require('bcrypt');
const User = require('../models/User');
const Book = require('../models/Book');
const Event = require('../models/Event');

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
        .then(event => {
            return event
        })
        .catch(err => {
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
            return user
        } else {
            return
        }
    }
    else
        return
}
exports.createEvent = (parent, args) => {
    const event = new Event({
        title: args.title,
        description: args.description,
        price: args.price,
        date: args.date,
        address: args.address,
        creator: '5eab5d476e506f0ed25ee4e4'
    })
    return event.save()
        .then(result => {
            return User.updateOne({ _id: result._doc.creator }, { $push: { events: { ...result._doc } } })
                .then(updateresult => {
                    console.log(updateresult)
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

exports.updateUser = async (parent, args) => {
    try {
        let oldUserSetting = await User.findOneAndUpdate({ _id: args.userid },
            { $set: { username: args.username, name: args.name, surname: args.surname } })
        return oldUserSetting;

    } catch (error) {
        return;
    }
}

exports.updateUserPassword = async (parent, args) => {
    try {
        let user = await User.findById(args.userid);
        let result = await bcrypt.compare(args.oldpassword, user.password);
        if (result) {
            let hashedpass = await bcrypt.hash(args.newpassword, 11);
            await User.updateOne({ _id: args.userid }, { $set: { password: hashedpass } })
            return "Password Successfully changed"
        } else {
            return "Old password is wrong!";
        }
    } catch (err) {

    }
}