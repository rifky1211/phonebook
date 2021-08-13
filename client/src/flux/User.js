import Immutable from 'immutable';

const User = Immutable.Record({
    id: 0,
    name: '',
    phone: '',
    total: 0,
    sent: true
})

export default User