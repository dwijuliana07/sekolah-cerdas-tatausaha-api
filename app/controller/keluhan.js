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

exports.createKeluhan = function (req, res) {
    perf.start();
    console.log(dateFormat(dt.now(), "dd mmmm yyyy HH:MM:ss"));
    console.log("api-name : /services/create-keluhan");
    console.log("body sent : ");
    console.log(req.body);

    var sql = `INSERT INTO sekolah_cerdas.tu_complaint (
            complaint_type,
            source,
            name,
            contact,
            email,
            date,
            description,
            action_taken,
            assigned,
            note,
            image
      ) 
      VALUES
        (
        '`+ req.body.complaintType + `',
        '`+ req.body.source + `',
        '`+ req.body.name + `',
        '`+ req.body.contact + `',
        '`+ req.body.email + `',
        '`+ req.body.date + `',
        '`+ req.body.description + `',
        '`+ req.body.actionTaken + `',
        '`+ req.body.assigned + `',
        '`+ req.body.note + `',
        '`+ req.body.image + `'
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

exports.readKeluhan = function (req, res) {
    perf.start();
    var total = 0;
    console.log(dateFormat(dt.now(), "dd mmmm yyyy HH:MM:ss"));
    console.log("api-name : /services/read-keluhan");
    console.log("body sent : ");
    console.log(req.body);

    var condition = "";

    if (req.body.idKeluhan != null || req.body.idKeluhan != undefined) {
        condition = " AND id = " + req.body.idKeluhan;
    }
    var sql = `SELECT 
            complaint_type,
            source,
            name,
            contact,
            email,
            date,
            description,
            action_taken,
            assigned,
            note,
            image
        FROM
            sekolah_cerdas.tu_complaint
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

exports.updateKeluhan = function (req, res) {
    perf.start();
    console.log(dateFormat(dt.now(), "dd mmmm yyyy HH:MM:ss"));
    console.log("api-name : /services/update-keluhan");
    console.log("body sent : ");
    console.log(req.body);

    var condition = "";

    if (req.body.idKeluhan != null || req.body.idKeluhan != undefined) {
        condition = " AND id = " + req.body.idKeluhan;
    }
    var sql = `UPDATE 
        sekolah_cerdas.tu_complaint
     SET
        complaint_type = '`+ req.body.complaintType + `',
        source = '`+ req.body.source + `',
        name = '`+ req.body.name + `',
        contact = '`+ req.body.contact + `',
        email = '`+ req.body.email + `',
        date = '`+ req.body.date + `',
        description = '`+ req.body.description + `',
        action_taken = '`+ req.body.actionTaken + `',
        assigned = '`+ req.body.assigned + `',
        note = '`+ req.body.note + `',
        image = '`+ req.body.image + `'
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

exports.deleteKeluhan = function (req, res) {
    perf.start();
    console.log(dateFormat(dt.now(), "dd mmmm yyyy HH:MM:ss"));
    console.log("api-name : /services/delete-keluhan");
    console.log("body sent : ");
    console.log(req.body);

    var condition = "";

    if (req.body.idKeluhan != null || req.body.idKeluhan != undefined) {
        condition = " AND id = " + req.body.idKeluhan;
    }

    var sql = `DELETE 
        FROM
            sekolah_cerdas.tu_complaint
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
