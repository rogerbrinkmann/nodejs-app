const nano = require('nano')('http://admin:younggwon@localhost:5984');


const users = nano.db.use('users')
const pages = nano.db.use('pages')


function findByUsername(username) {

    const q = {
        selector: {
            username: { "$eq": username }
        },
        fields: ["_id", "username", "password"],
        limit: 1
    }

    users.find(q)
        .then(response => {
            if (response.docs) {
                const user = { id: response.docs[0]._id, username: response.docs[0].username, password: response.docs[0].password }
                console.log(user)
            }
        })
        .catch(err => {
            console.log(err.message)
        })
}

function findById(id) {

    const q = {
        selector: {
            _id: { "$eq": id }
        },
        fields: ["_id", "username", "password"],
        limit: 1
    }

    users.find(q)
        .then(response => {
            if (response.docs) {
                const user = { id: response.docs[0]._id, username: response.docs[0].username, password: response.docs[0].password }
                console.log(user)
            }
        })
        .catch(err => {
            console.log(err.message)
        })
}

function insertPage() {
    pages.insert({ content: "<h1>This is a test</h1>" })
        .then((response) => {
            console.log(response)
        })
        .catch((err) => {
            console.log(err)
        })
}


function getPage(){
    pages.get('9cfff2fa7f1824555c26b6fc82009961')
    .then((data)=>{
        console.log(data)
    })
    .catch((err)=>{
        console.log(err)
    })
}
// insertPage()
// findByUsername('roger')
// findById('ef53811e09925ae5fa28ec76c1002ded')
getPage()

