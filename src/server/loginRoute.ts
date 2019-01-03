

import {User} from '../app/shared/model/user';
const auth = {
    'john@gmail.com': 'test123',
    'bill@gmail.com': 'test456'

};

const users: {[key: string]: User} = {
    'john@gmail.com': {
        firstName: 'John'
    },
    'bill@gmail.com': {
        firstName: 'Bill'
    }
};

export function loginRoute(req, res) {


    const payload = req.body;

    console.log('verifying password ...', payload);


    if (auth[payload.email] && auth[payload.email] === payload.password) {
        res.status(200).json(users[payload.email]);
    } else {
        res.sendStatus(500);
    }
}
