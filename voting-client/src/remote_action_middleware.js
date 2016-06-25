/*
Concise way for expressing the following:

export default function() {
    return function(next) {
        return function(action) {
            .....
        }
    }
}

this is currying

*/
export default socket => store => next => action => {
    console.log('in middleware', action);
    if(action.meta && action.meta.remote) {
        socket.emit('action',action)
    }
    return next(action);
}