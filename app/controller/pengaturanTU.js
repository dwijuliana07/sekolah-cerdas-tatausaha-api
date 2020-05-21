'use strict';

var response = require('../res');
var connection = require('../conn');

const perf = require('execution-time')();
var dateFormat = require('dateformat');
var datetime = require('node-datetime');

var dt = datetime.create();
var status_code = "";
var messages = "";
var elapseTime = "";
var time = "";

exports.index = function (req, res) {
    response.ok("403 Forbidden (You don't have permission to access this API)", res)
};

//Pengaturan Tujuan
exports.createSetTujuan = function (req, res) {
    perf.start();
    console.log(dateFormat(dt.now(), "dd mmmm yyyy HH:MM:ss"));
    console.log("api-name : /services/create-pengaturan-tujuan");
    console.log("body sent : ");
    console.log(req.body);

    var sql = `INSERT INTO sekolah_cerdas.tu_visitpurpose (
            visitors_purpose,
            description
      ) 
      VALUES
        (
        '`+ req.body.visitorPurpose + `',
        '`+ req.body.description + `'
        ) ;`;

    connection.query(sql, function (error, result, fields) {
        if (error) {
            status_code = "500"
            messages = "Internal server error";
            elapseTime = perf.stop();
            time = elapseTime.time.toFixed(2);
            response.error(status_code, time, messages, error, res);
        } else {
            status_code = "200";
            messages = "Success";
            elapseTime = perf.stop();
            time = elapseTime.time.toFixed(2);
            response.successPost(status_code, time, messages, res);
        }
    });
};

exports.readSetTujuan = function (req, res) {
    perf.start();
    var total = 0;
    console.log(dateFormat(dt.now(), "dd mmmm yyyy HH:MM:ss"));
    console.log("api-name : /services/read-pengaturan-tujuan");
    console.log("body sent : ");
    console.log(req.body);

    var condition = "";

    if (req.body.idTujuan != null || req.body.idTujuan != undefined) {
        condition = " AND id = " + req.body.idTujuan;
    }
    var sql = `SELECT 
            visitors_purpose,
            description
        FROM
            sekolah_cerdas.tu_visitpurpose
     WHERE 1=1  
       `+ condition + `;`;

    connection.query(sql, function (error, result, fields) {
        if (error) {
            status_code = "500"
            messages = "Internal server error";
            elapseTime = perf.stop();
            time = elapseTime.time.toFixed(2);
            response.error(status_code, time, messages, error, res);
        } else {
            result.forEach(element => {
                total = total + 1;
            })
            status_code = "200";
            messages = "Success";
            elapseTime = perf.stop();
            time = elapseTime.time.toFixed(2);
            response.successGet(status_code, time, messages, total, result, res);
        }
    });
};

exports.updateSetTujuan = function (req, res) {
    perf.start();
    console.log(dateFormat(dt.now(), "dd mmmm yyyy HH:MM:ss"));
    console.log("api-name : /services/update-pengaturan-tujuan");
    console.log("body sent : ");
    console.log(req.body);

    var condition = "";

    if (req.body.idTujuan != null || req.body.idTujuan != undefined) {
        condition = " AND id = " + req.body.idTujuan;
    }
    var sql = `UPDATE 
        sekolah_cerdas.tu_visitpurpose
     SET
        visitors_purpose = '`+ req.body.visitorPurpose + `',
        description = '`+ req.body.description + `'
     WHERE 1 = 1
     `+ condition + `;`;

    connection.query(sql, function (error, result, fields) {
        if (error) {
            status_code = "500"
            messages = "Internal server error";
            elapseTime = perf.stop();
            time = elapseTime.time.toFixed(2);
            response.error(status_code, time, messages, error, res);
        } else {
            status_code = "200";
            messages = "Success";
            elapseTime = perf.stop();
            time = elapseTime.time.toFixed(2);
            response.successPost(status_code, time, messages, res);
        }
    });
};

exports.deleteSetTujuan = function (req, res) {
    perf.start();
    console.log(dateFormat(dt.now(), "dd mmmm yyyy HH:MM:ss"));
    console.log("api-name : /services/delete-pengaturan-tujuan");
    console.log("body sent : ");
    console.log(req.body);

    var condition = "";

    if (req.body.idTujuan != null || req.body.idTujuan != undefined) {
        condition = " AND id = " + req.body.idTujuan;
    }

    var sql = `DELETE 
        FROM
            sekolah_cerdas.tu_visitpurpose
        WHERE 1 = 1 
        `+ condition + `;`;

    connection.query(sql, function (error, result, fields) {
        if (error) {
            status_code = "500"
            messages = "Internal server error";
            elapseTime = perf.stop();
            time = elapseTime.time.toFixed(2);
            response.error(status_code, time, messages, error, res);
        } else {
            status_code = "200";
            messages = "Success";
            elapseTime = perf.stop();
            time = elapseTime.time.toFixed(2);
            response.successPost(status_code, time, messages, res);
        }
    });
};

//Pengaturan Keluhan Tipe
exports.createSetKeluhan = function (req, res) {
    perf.start();
    console.log(dateFormat(dt.now(), "dd mmmm yyyy HH:MM:ss"));
    console.log("api-name : /services/create-pengaturan-keluhan-tipe");
    console.log("body sent : ");
    console.log(req.body);

    var sql = `INSERT INTO sekolah_cerdas.tu_complainttype (
            complaint_type,
            description,
            created_at
      ) 
      VALUES
        (
        '`+ req.body.complaintType + `',
        '`+ req.body.description + `',
        NOW()
        ) ;`;

    connection.query(sql, function (error, result, fields) {
        if (error) {
            status_code = "500"
            messages = "Internal server error";
            elapseTime = perf.stop();
            time = elapseTime.time.toFixed(2);
            response.error(status_code, time, messages, error, res);
        } else {
            status_code = "200";
            messages = "Success";
            elapseTime = perf.stop();
            time = elapseTime.time.toFixed(2);
            response.successPost(status_code, time, messages, res);
        }
    });
};

exports.readSetKeluhan = function (req, res) {
    perf.start();
    var total = 0;
    console.log(dateFormat(dt.now(), "dd mmmm yyyy HH:MM:ss"));
    console.log("api-name : /services/read-pengaturan-keluhan-tipe");
    console.log("body sent : ");
    console.log(req.body);

    var condition = "";

    if (req.body.idKeluhan != null || req.body.idKeluhan != undefined) {
        condition = " AND id = " + req.body.idKeluhan;
    }
    var sql = `SELECT 
            complaint_type,
            description,
            created_at
        FROM
            sekolah_cerdas.tu_complainttype
     WHERE 1=1  
       `+ condition + `;`;

    connection.query(sql, function (error, result, fields) {
        if (error) {
            status_code = "500"
            messages = "Internal server error";
            elapseTime = perf.stop();
            time = elapseTime.time.toFixed(2);
            response.error(status_code, time, messages, error, res);
        } else {
            result.forEach(element => {
                total = total + 1;
            })
            status_code = "200";
            messages = "Success";
            elapseTime = perf.stop();
            time = elapseTime.time.toFixed(2);
            response.successGet(status_code, time, messages, total, result, res);
        }
    });
};

exports.updateSetKeluhan = function (req, res) {
    perf.start();
    console.log(dateFormat(dt.now(), "dd mmmm yyyy HH:MM:ss"));
    console.log("api-name : /services/update-pengaturan-keluhan-tipe");
    console.log("body sent : ");
    console.log(req.body);

    var condition = "";

    if (req.body.idKeluhan != null || req.body.idKeluhan != undefined) {
        condition = " AND id = " + req.body.idKeluhan;
    }
    var sql = `UPDATE 
        sekolah_cerdas.tu_complainttype
     SET
        complaint_type = '`+ req.body.complaintType + `',
        description = '`+ req.body.description + `'
     WHERE 1 = 1
     `+ condition + `;`;

    connection.query(sql, function (error, result, fields) {
        if (error) {
            status_code = "500"
            messages = "Internal server error";
            elapseTime = perf.stop();
            time = elapseTime.time.toFixed(2);
            response.error(status_code, time, messages, error, res);
        } else {
            status_code = "200";
            messages = "Success";
            elapseTime = perf.stop();
            time = elapseTime.time.toFixed(2);
            response.successPost(status_code, time, messages, res);
        }
    });
};

exports.deleteSetKeluhan = function (req, res) {
    perf.start();
    console.log(dateFormat(dt.now(), "dd mmmm yyyy HH:MM:ss"));
    console.log("api-name : /services/delete-pengaturan-keluhan-tipe");
    console.log("body sent : ");
    console.log(req.body);

    var condition = "";

    if (req.body.idKeluhan != null || req.body.idKeluhan != undefined) {
        condition = " AND id = " + req.body.idKeluhan;
    }

    var sql = `DELETE 
        FROM
            sekolah_cerdas.tu_complainttype
        WHERE 1 = 1 
        `+ condition + `;`;

    connection.query(sql, function (error, result, fields) {
        if (error) {
            status_code = "500"
            messages = "Internal server error";
            elapseTime = perf.stop();
            time = elapseTime.time.toFixed(2);
            response.error(status_code, time, messages, error, res);
        } else {
            status_code = "200";
            messages = "Success";
            elapseTime = perf.stop();
            time = elapseTime.time.toFixed(2);
            response.successPost(status_code, time, messages, res);
        }
    });
};

//Pengaturan Keluhan Sumber
exports.createSetSource = function (req, res) {
    perf.start();
    console.log(dateFormat(dt.now(), "dd mmmm yyyy HH:MM:ss"));
    console.log("api-name : /services/create-pengaturan-keluhan-sumber");
    console.log("body sent : ");
    console.log(req.body);

    var sql = `INSERT INTO sekolah_cerdas.tu_source (
            source,
            description
      ) 
      VALUES
        (
        '`+ req.body.source + `',
        '`+ req.body.description + `'
        ) ;`;

    connection.query(sql, function (error, result, fields) {
        if (error) {
            status_code = "500"
            messages = "Internal server error";
            elapseTime = perf.stop();
            time = elapseTime.time.toFixed(2);
            response.error(status_code, time, messages, error, res);
        } else {
            status_code = "200";
            messages = "Success";
            elapseTime = perf.stop();
            time = elapseTime.time.toFixed(2);
            response.successPost(status_code, time, messages, res);
        }
    });
};

exports.readSetSource = function (req, res) {
    perf.start();
    var total = 0;
    console.log(dateFormat(dt.now(), "dd mmmm yyyy HH:MM:ss"));
    console.log("api-name : /services/read-pengaturan-keluhan-sumber");
    console.log("body sent : ");
    console.log(req.body);

    var condition = "";

    if (req.body.idSource != null || req.body.idSource != undefined) {
        condition = " AND id = " + req.body.idSource;
    }
    var sql = `SELECT 
            source,
            description
        FROM
            sekolah_cerdas.tu_source
     WHERE 1=1  
       `+ condition + `;`;

    connection.query(sql, function (error, result, fields) {
        if (error) {
            status_code = "500"
            messages = "Internal server error";
            elapseTime = perf.stop();
            time = elapseTime.time.toFixed(2);
            response.error(status_code, time, messages, error, res);
        } else {
            result.forEach(element => {
                total = total + 1;
            })
            status_code = "200";
            messages = "Success";
            elapseTime = perf.stop();
            time = elapseTime.time.toFixed(2);
            response.successGet(status_code, time, messages, total, result, res);
        }
    });
};

exports.updateSetSource = function (req, res) {
    perf.start();
    console.log(dateFormat(dt.now(), "dd mmmm yyyy HH:MM:ss"));
    console.log("api-name : /services/update-pengaturan-keluhan-sumber");
    console.log("body sent : ");
    console.log(req.body);

    var condition = "";

    if (req.body.idSource != null || req.body.idSource != undefined) {
        condition = " AND id = " + req.body.idSource;
    }
    var sql = `UPDATE 
        sekolah_cerdas.tu_source
     SET
        source = '`+ req.body.source + `',
        description = '`+ req.body.description + `'
     WHERE 1 = 1
     `+ condition + `;`;

    connection.query(sql, function (error, result, fields) {
        if (error) {
            status_code = "500"
            messages = "Internal server error";
            elapseTime = perf.stop();
            time = elapseTime.time.toFixed(2);
            response.error(status_code, time, messages, error, res);
        } else {
            status_code = "200";
            messages = "Success";
            elapseTime = perf.stop();
            time = elapseTime.time.toFixed(2);
            response.successPost(status_code, time, messages, res);
        }
    });
};

exports.deleteSetSource = function (req, res) {
    perf.start();
    console.log(dateFormat(dt.now(), "dd mmmm yyyy HH:MM:ss"));
    console.log("api-name : /services/delete-pengaturan-keluhan-sumber");
    console.log("body sent : ");
    console.log(req.body);

    var condition = "";

    if (req.body.idSource != null || req.body.idSource != undefined) {
        condition = " AND id = " + req.body.idSource;
    }

    var sql = `DELETE 
        FROM
            sekolah_cerdas.tu_source
        WHERE 1 = 1 
        `+ condition + `;`;

    connection.query(sql, function (error, result, fields) {
        if (error) {
            status_code = "500"
            messages = "Internal server error";
            elapseTime = perf.stop();
            time = elapseTime.time.toFixed(2);
            response.error(status_code, time, messages, error, res);
        } else {
            status_code = "200";
            messages = "Success";
            elapseTime = perf.stop();
            time = elapseTime.time.toFixed(2);
            response.successPost(status_code, time, messages, res);
        }
    });
};