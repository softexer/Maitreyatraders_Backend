var insertadvertisement = require('./insertadvertisement')
var updateadvertisement = require('./updateadvertisement')
var fetchadvertisement = require('./fetchadvertisement')
var deleteadvertisement = require('./deleteadvertisement')
module.exports = {
    insertadvertisement: async (req, res) => {
        insertadvertisement.insertadvertisement(req, res)
    },
    updateadvertisement: async (req, res) => {
        updateadvertisement.updateadvertisement(req, res)
    },
    fetchadvertisement: async (req, res) => {
        fetchadvertisement.fetchadvertisement(req, res)
    },
    deleteadvertisement: async (req, res) => {
        deleteadvertisement.deleteadvertisement(req, res)
    },
}