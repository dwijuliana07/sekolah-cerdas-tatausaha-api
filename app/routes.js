'use strict';

module.exports = function (app) {
    var control = require('./controller/bukuTamu');
    var cors = require('cors')

    app.use(cors())
    //Default API Access
    app.route('/services').get(control.index);

    //buku tamu
    app.route('/services/create-tamu').post(control.createVisitor);
    app.route('/services/read-tamu').get(control.readVisitor);
    app.route('/services/update-tamu').post(control.updateVisitor);
    app.route('/services/delete-tamu').post(control.deleteVisitor);

    //log panggilan
    var logPanggilan = require('./controller/logPanggilan');
    app.route('/services/create-panggilan').post(logPanggilan.createLog);
    app.route('/services/read-panggilan').get(logPanggilan.readLog);
    app.route('/services/update-panggilan').post(logPanggilan.updateLog);
    app.route('/services/delete-panggilan').post(logPanggilan.deleteLog);

    //pengiriman barang
    var pengirimanBarang = require('./controller/pengirimanBarang');
    app.route('/services/create-pengiriman').post(pengirimanBarang.createPengiriman);
    app.route('/services/read-pengiriman').get(pengirimanBarang.readPengiriman);
    app.route('/services/update-pengiriman').post(pengirimanBarang.updatePengiriman);
    app.route('/services/delete-pengiriman').post(pengirimanBarang.deletePengiriman);

    //penerimaan barang
    var penerimaanBarang = require('./controller/penerimaanBarang');
    app.route('/services/create-penerimaan').post(penerimaanBarang.createPenerimaan);
    app.route('/services/read-penerimaan').get(penerimaanBarang.readPenerimaan);
    app.route('/services/update-penerimaan').post(penerimaanBarang.updatePenerimaan);
    app.route('/services/delete-penerimaan').post(penerimaanBarang.deletePenerimaan);

    //keluhan
    var keluhan = require('./controller/keluhan');
    app.route('/services/create-keluhan').post(keluhan.createKeluhan);
    app.route('/services/read-keluhan').get(keluhan.readKeluhan);
    app.route('/services/update-keluhan').post(keluhan.updateKeluhan);
    app.route('/services/delete-keluhan').post(keluhan.deleteKeluhan);

    //pengaturan
    var pengaturan = require('./controller/pengaturanTU');
    //Tujuan
    app.route('/services/create-pengaturan-tujuan').post(pengaturan.createSetTujuan);
    app.route('/services/read-pengaturan-tujuan').get(pengaturan.readSetTujuan);
    app.route('/services/update-pengaturan-tujuan').post(pengaturan.updateSetTujuan);
    app.route('/services/delete-pengaturan-tujuan').post(pengaturan.deleteSetTujuan);

    //Keluhan Tipe
    app.route('/services/create-pengaturan-keluhan-tipe').post(pengaturan.createSetKeluhan);
    app.route('/services/read-pengaturan-keluhan-tipe').get(pengaturan.readSetKeluhan);
    app.route('/services/update-pengaturan-keluhan-tipe').post(pengaturan.updateSetKeluhan);
    app.route('/services/delete-pengaturan-keluhan-tipe').post(pengaturan.deleteSetKeluhan);

    //Keluhan Sumber
    app.route('/services/create-pengaturan-keluhan-sumber').post(pengaturan.createSetSource)
    app.route('/services/read-pengaturan-keluhan-sumber').get(pengaturan.readSetSource);
    app.route('/services/update-pengaturan-keluhan-sumber').post(pengaturan.updateSetSource);
    app.route('/services/delete-pengaturan-keluhan-sumber').post(pengaturan.deleteSetSource);
};
