const nano = require('nano')('http://admin:younggwon@localhost:5984');


const users = nano.db.use('users')


function findByUsername(username) {

    const q = {
        selector:{
            username:{"$eq":username}
        },
        fields:["_id", "username", "password"],
        limit:1
    }

    users.find(q)
        .then(response => {
            if (response.docs){
                const user = {id: response.docs[0]._id, username: response.docs[0].username, password: response.docs[0].password}
                console.log(user)
            }
        })
        .catch(err => {
            console.log(err.message)
        })
}

function findById(id) {

    const q = {
        selector:{
            _id:{"$eq":id}
        },
        fields:["_id", "username", "password"],
        limit:1
    }

    users.find(q)
        .then(response => {
            if (response.docs){
                const user = {id: response.docs[0]._id, username: response.docs[0].username, password: response.docs[0].password}
                console.log(user)
            }
        })
        .catch(err => {
            console.log(err.message)
        })
}

findByUsername('roger')
findById('ef53811e09925ae5fa28ec76c1002ded')

