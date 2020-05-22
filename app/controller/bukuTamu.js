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

exports.createVisitor = function (req, res) {
    perf.start();
    console.log(dateFormat(dt.now(), "dd mmmm yyyy HH:MM:ss"));
    console.log("api-name : /services/create-tamu");
    console.log("body sent : ");
    console.log(req.body);

    var sql = `INSERT INTO sekolah_cerdas.tu_visitbook (
            source,
            purpose,
            name,
            email,
            contact,
            id_proof,
            no_of_pepple,
            date,
            in_time,
            out_time,
            note,
            image
      ) 
      VALUES
        (
        '`+ req.body.source + `',
        '`+ req.body.purpose + `',
        '`+ req.body.name + `',
        '`+ req.body.email + `',
        '`+ req.body.contact + `',
        '`+ req.body.idProof + `',
        '`+ req.body.noOfPeople + `',
        '`+ req.body.date + `',
        '`+ req.body.inTime + `',
        '`+ req.body.outTime + `',
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

exports.readVisitor = function (req, res) {
    perf.start();
    var total = 0;
    console.log(dateFormat(dt.now(), "dd mmmm yyyy HH:MM:ss"));
    console.log("api-name : /services/read-tamu");
    console.log("body sent : ");
    console.log(req.body);

    var condition = "";

    if (req.body.idVisitor != null || req.body.idVisitor != undefined) {
        condition = " AND id = " + req.body.idVisitor;
    }
    var sql = `SELECT 
            purpose,
            name,
            email,
            contact,
            id_proof,
            no_of_pepple,
            date,
            in_time,
            out_time,
            note,
            image
        FROM
            sekolah_cerdas.tu_visitbook
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

exports.updateVisitor = function (req, res) {
    perf.start();
    console.log(dateFormat(dt.now(), "dd mmmm yyyy HH:MM:ss"));
    console.log("api-name : /services/update-tamu");
    console.log("body sent : ");
    console.log(req.body);

    var condition = "";

    if (req.body.idVisitor != null || req.body.idVisitor != undefined) {
        condition = " AND id = " + req.body.idVisitor;
    }
    var sql = `UPDATE 
        sekolah_cerdas.tu_visitbook
     SET
        source = '`+ req.body.source + `',
        purpose = '`+ req.body.purpose + `',
        name = '`+ req.body.name + `',
        email = '`+ req.body.email + `',
        contact = '`+ req.body.contact + `',
        id_proof = '`+ req.body.idProof + `',
        no_of_pepple = '`+ req.body.noOfPeople + `',
        date = '`+ req.body.date + `',
        in_time = '`+ req.body.inTime + `',
        out_time = '`+ req.body.outTime + `',
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

exports.deleteVisitor = function (req, res) {
    perf.start();
    console.log(dateFormat(dt.now(), "dd mmmm yyyy HH:MM:ss"));
    console.log("api-name : /services/delete-tamu");
    console.log("body sent : ");
    console.log(req.body);

    var condition = "";

    if (req.body.idVisitor != null || req.body.idVisitor != undefined) {
        condition = " AND id = " + req.body.idVisitor;
    }

    var sql = `DELETE 
        FROM
            sekolah_cerdas.tu_visitbook
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
