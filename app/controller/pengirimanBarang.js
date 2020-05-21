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

exports.createPengiriman = function (req, res) {
    perf.start();
    console.log(dateFormat(dt.now(), "dd mmmm yyyy HH:MM:ss"));
    console.log("api-name : /services/create-pengiriman");
    console.log("body sent : ");
    console.log(req.body);

    var sql = `INSERT INTO sekolah_cerdas.tu_dispatchreceive (
            reference_no,
            to_title,
            address,
            note,
            from_title,
            date,
            image,
            created_at,
            type
      ) 
      VALUES
        (
        '`+ req.body.referenceNo + `',
        '`+ req.body.toTitle + `',
        '`+ req.body.address + `',
        '`+ req.body.note + `',
        '`+ req.body.fromTitle + `',
        '`+ req.body.date + `',
        '`+ req.body.image + `',
        NOW(),
        'dispatch'
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

exports.readPengiriman = function (req, res) {
    perf.start();
    var total = 0;
    console.log(dateFormat(dt.now(), "dd mmmm yyyy HH:MM:ss"));
    console.log("api-name : /services/read-pengiriman");
    console.log("body sent : ");
    console.log(req.body);

    var condition = "";

    if (req.body.idPengiriman != null || req.body.idPengiriman != undefined) {
        condition = " AND id = " + req.body.idPengiriman;
    }
    var sql = `SELECT 
                reference_no,
                to_title,
                address,
                note,
                from_title,
                date,
                image,
                created_at,
                updated_at,
                type
            FROM
            sekolah_cerdas.tu_dispatchreceive
     WHERE 1=1  
       `+ condition + ` AND type ='dispatch'; `;

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

exports.updatePengiriman = function (req, res) {
    perf.start();
    console.log(dateFormat(dt.now(), "dd mmmm yyyy HH:MM:ss"));
    console.log("api-name : /services/update-pengiriman");
    console.log("body sent : ");
    console.log(req.body);

    var condition = "";

    if (req.body.idPengiriman != null || req.body.idPengiriman != undefined) {
        condition = " AND id = " + req.body.idPengiriman;
    }
    var sql = `UPDATE 
        sekolah_cerdas.tu_dispatchreceive
     SET
            reference_no = '`+ req.body.referenceNo + `',
            to_title = '`+ req.body.toTitle + `',
            address = '`+ req.body.address + `',
            note = '`+ req.body.note + `',
            from_title = '`+ req.body.fromTitle + `',
            date = '`+ req.body.date + `',
            image = '`+ req.body.image + `',
            updated_at = NOW(),
            type = 'dispatch'
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

exports.deletePengiriman = function (req, res) {
    perf.start();
    console.log(dateFormat(dt.now(), "dd mmmm yyyy HH:MM:ss"));
    console.log("api-name : /services/delete-pengiriman");
    console.log("body sent : ");
    console.log(req.body);

    var condition = "";

    if (req.body.idPengiriman != null || req.body.idPengiriman != undefined) {
        condition = " AND id = " + req.body.idPengiriman;
    }

    var sql = `DELETE 
        FROM
            sekolah_cerdas.tu_dispatchreceive
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
