var validations = require('./vmartValidations');
var dbQuaries = require('./vmartaddressdbQuaries')

var fetchVmartADD = {
    fetchvmartaddress: (params, callback) => {
        // var {error} = validations.fetchVmartaddressvalidations(params);
        // if(error){
        //     return callback({
        //         status:400,
        //         data:{
        //             response:0,
        //             message:error.details[0].message
        //         }
        //     })

        // }
        var fetchData = dbQuaries.VmartaddressfetchDb(params);
        fetchData.then((found) => {
            if (found.length > 0) {
                return callback({
                    status: 200,
                    data: {
                        response: 3,
                        message: "Data found Successfully",
                        Info: found
                    }
                })
            } else {
                return callback({
                    status: 200,
                    data: {
                        response: 0,
                        message: "Data not found "
                    }
                })
            }
        })
    },
    updatevmartaddress: (params, callback) => {
        var { error } = validations.updatevmartaddressvalidations(params);
        if (error) {
            return callback({
                status: 400,
                data: {
                    response: 0,
                    message: error.details[0].message
                }
            })

        }
        var checkingvmartaddress = dbQuaries.checkdbinvmartaddress(params);
        checkingvmartaddress.then((found) => {
            if (found) {
                var updateaddress = dbQuaries.updateaddressdb(params);
                updateaddress.then((updated) => {
                    if (updated) {
                        return callback({
                            status: 200,
                            data: {
                                response: 3,
                                message: "Vmart address updated successfully"
                            }
                        })
                    } else {
                        return callback({
                            status: 200,
                            data: {
                                response: 0,
                                message: "Vmart address updated Failure"
                            }
                        })
                    }
                })
            } else {
                return callback({
                    status: 200,
                    data: {
                        response: 0,
                        message: "addressID database not found"
                    }
                })
            }
        })
    },
    deletevmartaddress: (params, callback) => {
        var { error } = validations.deletevmartaddressvalidations(params);
        if (error) {
            return callback({
                status: 400,
                data: {
                    response: 0,
                    message: error.details[0].message
                }
            })

        }
        var checkingvmartaddress = dbQuaries.checkdbinvmartaddress(params);
        checkingvmartaddress.then((found) => {
            if (found) {
                var updateaddress = dbQuaries.deleteaddressdb(params);
                updateaddress.then((deleted) => {
                    if (deleted) {
                        return callback({
                            status: 200,
                            data: {
                                response: 3,
                                message: "Vmart address deleted successfully"
                            }
                        })
                    } else {
                        return callback({
                            status: 200,
                            data: {
                                response: 0,
                                message: "Vmart address deleted Failure"
                            }
                        })
                    }
                })
            } else {
                return callback({
                    status: 200,
                    data: {
                        response: 0,
                        message: "addressID database not found"
                    }
                })
            }
        })
    }
}
module.exports = fetchVmartADD;