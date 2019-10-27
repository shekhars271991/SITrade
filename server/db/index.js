
const mysql = require('mysql');

const pool = mysql.createPool({
    connectionLimit: 10,
    user: 'autoiinno_admin',
    password: 'Autoi@12345',
    host: '103.120.179.22',
    database: 'autoiinno_energytrade',
    port: '3306'

});



let jp_db = {};

const createSellRecordQuery = "INSERT INTO `all_sell_orders` ( \
    `seller_id`, `device_type_id`, `power_to_sell`, \
        `transfer_start_ts`, `transfer_end_ts`, \
        `rate_per_unit`, `total_amount`,  \
        `order_status_id` \
  ) \
VALUES ( ?, ?, ?, ?, ?, ?, ?, ?)";


const searchAvailableBuyOptionsQuery = "SELECT * \
FROM   all_sell_orders  \
WHERE  transfer_start_ts <= ?  \
       AND transfer_end_ts >= ? \
       AND ( power_to_sell BETWEEN ? AND ? ) \
       AND ( rate_per_unit BETWEEN ? AND ? ) ";

const createContractQuery = "INSERT INTO `all_contracts`  \
(`sell_order_id`, `buyer_id`, `contract_status_id`)  \
VALUES (?, ?, ?)";

jp_db.createSellRecord = (sellRequest) => {
    return new Promise((resolve, reject) => {
        pool.query(createSellRecordQuery, [sellRequest.sellerId, sellRequest.deviceId
            , sellRequest.powerToSell, sellRequest.transferStartTs, sellRequest.transferEndTs
            , sellRequest.ratePerUnit, sellRequest.totalAmount, 1], (err, results) => {
                if (err) {
                    return reject(err);
                } else {
                    return resolve(results);
                }
            });
    });
};

jp_db.searchAvailableBuyOptions = (searchPayload) => {
    return new Promise((resolve, reject) => {
        pool.query(searchAvailableBuyOptionsQuery, [searchPayload.startTime, searchPayload.endTime
            , searchPayload.unitMin, searchPayload.unitMax, searchPayload.budgetMin
            , searchPayload.budgetMax], (err, results) => {
                if (err) {
                    return reject(err);
                } else {
                    return resolve(results);
                }
            });
    });
};

jp_db.createContract = (createContractPayload) => {
    return new Promise((resolve, reject) => {
        pool.query(createContractQuery, [createContractPayload.sellOrderId, createContractPayload.buyerId
            , 1], (err, results) => {
                if (err) {
                    return reject(err);
                } else {
                    return resolve(results);
                }
            });
    });
};
module.exports = jp_db;