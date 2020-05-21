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

exports.createLog = function (req, res) {
    perf.start();
    console.log(dateFormat(dt.now(), "dd mmmm yyyy HH:MM:ss"));
    console.log("api-name : /services/create-panggilan");
    console.log("body sent : ");
    console.log(req.body);

    var sql = `INSERT INTO sekolah_cerdas.tu_generalcalls (
            name,
            contact,
            date,
            description,
            follow_up_date,
            call_dureation,
            note,
            call_type
      ) 
      VALUES
        (
        '`+ req.body.name + `',
        '`+ req.body.contact + `',
        '`+ req.body.date + `',
        '`+ req.body.description + `',
        '`+ req.body.followUpDate + `',
        '`+ req.body.callDuration + `',
        '`+ req.body.note + `',
        '`+ req.body.callType + `'
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

exports.readLog = function (req, res) {
    perf.start();
    var total = 0;
    console.log(dateFormat(dt.now(), "dd mmmm yyyy HH:MM:ss"));
    console.log("api-name : /services/read-panggilan");
    console.log("body sent : ");
    console.log(req.body);

    var condition = "";

    if (req.body.idLog != null || req.body.idLog != undefined) {
        condition = " AND id = " + req.body.idLog;
    }
    var sql = `SELECT 
                name,
                contact,
                date,
                description,
                follow_up_date,
                call_dureation,
                note,
                call_type
            FROM
            sekolah_cerdas.tu_generalcalls
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

exports.updateLog = function (req, res) {
    perf.start();
    console.log(dateFormat(dt.now(), "dd mmmm yyyy HH:MM:ss"));
    console.log("api-name : /services/update-panggilan");
    console.log("body sent : ");
    console.log(req.body);

    var condition = "";

    if (req.body.idLog != null || req.body.idLog != undefined) {
        condition = " AND id = " + req.body.idLog;
    }
    var sql = `UPDATE 
        sekolah_cerdas.tu_generalcalls
     SET
        name = '`+ req.body.name + `',
        contact = '`+ req.body.contact + `',
        date = '`+ req.body.date + `',
        description = '`+ req.body.description + `',
        follow_up_date = '`+ req.body.followUpDate + `',
        call_dureation = '`+ req.body.callDuration + `',
        note = '`+ req.body.note + `',
        call_type = '`+ req.body.callType + `'
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

exports.deleteLog = function (req, res) {
    perf.start();
    console.log(dateFormat(dt.now(), "dd mmmm yyyy HH:MM:ss"));
    console.log("api-name : /services/delete-panggilan");
    console.log("body sent : ");
    console.log(req.body);

    var condition = "";

    if (req.body.idLog != null || req.body.idLog != undefined) {
        condition = " AND id = " + req.body.idLog;
    }

    var sql = `DELETE 
        FROM
            sekolah_cerdas.tu_generalcalls
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
