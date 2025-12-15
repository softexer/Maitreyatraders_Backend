var insertdashboard = require('./insertdashboard');
var updatedashboard = require('./updatedashboard');
const deletedashboardapi = require('./deletedashboard')

var dash = {
    dashboardinsert: (params, req, callback) => {
        return insertdashboard.dashboardinsert(params, req, callback)
    },
    dashboardupdate: (params, req, callback) => {
        return updatedashboard.dashboardupdate(params, req, callback)
    },
    dashboardremoveinserdata: (params, callback) => {
        return deletedashboardapi.dashboardremoveinserdata(params, callback)
    }
}
module.exports = dash;