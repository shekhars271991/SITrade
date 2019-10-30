const express = require('express');
const db = require('../db');

const router = express.Router();

//const db = require('../db');


router.get('/health', async (req, res, next) => {

    res.json({ msg: "Server is up." });
});

router.post('/createSellOrder', async (req, res, next) => {

    try {
        //create order record
        let sellRecordPayload = {
            sellerId: req.body.sellerId,
            deviceTypeId: req.body.deviceTypeId,
            userDeviceId: req.body.userDeviceId,
            powerToSell: req.body.powerToSell,
            transferStartTs: req.body.transferStartTs,
            transferEndTs: req.body.transferEndTs,
            ratePerUnit: req.body.ratePerUnit,
            totalAmount: req.body.totalAmount
        }


        console.log("Sell record payload", sellRecordPayload)
        let resp = await db.createSellRecord(sellRecordPayload);
        let sellOrderId = resp.insertId;
        console.log("Sell Order Id", sellOrderId);
        res.json({
            sellOrderId: sellOrderId,
            msg: "Sell Order successfully created"
        });

    } catch (e) {
        console.log(e);
        res.json({
            msg: "Something went wrong in creating Sell Order.",
            errorMessage: e
        });
    }

});

router.post('/searchBuyLeads', async (req, res, next) => {

    try {
        let searchPayload = {
            unitMin: req.body.unitMin,
            unitMax: req.body.unitMax,
            startTime: req.body.startTime,
            endTime: req.body.endTime,
            budgetMin: req.body.budgetMin,
            budgetMax: req.body.budgetMax,
        }
        console.log("Search payload", searchPayload)
        let resp = await db.searchAvailableBuyOptions(searchPayload);
        console.log("Available buy leads", resp);
        res.json({
            buyLeads: resp,
            msg: "Successfully fetched all buy leads."
        });

    } catch (e) {
        console.log(e);
        res.json({
            msg: "Something went wrong in fetching buy leads.",
            errorMessage: e
        });
    }

});

router.post('/createContract', async (req, res, next) => {

    try {
        //create order record
        let createContractPayload = {
            sellOrderId: req.body.sellOrderId,
            buyerId: req.body.buyerId
        }
        console.log("Create Contract payload", createContractPayload)
        let resp = await db.createContract(createContractPayload);
        let contractID = resp.insertId;
        console.log("Contract created", contractID);
        res.json({
            contractId: contractID,
            msg: "Contract successfully created"
        });

    } catch (e) {
        console.log(e);
        res.json({
            msg: "Something went wrong in creating contract.",
            errorMessage: e
        });
    }

});

router.post('/getForecasts', async (req, res, next) => {

    try {
        console.log("fetching forecats for user id:", req.body.userId)
        let resp = await db.getForecasts(req.body.userId);
        res.json({
            msg: "Forecasts successfully fetched.",
            allForecasts: resp
        });
    } catch (e) {
        console.log(e);
        res.json({
            msg: "Something went wrong in creating contract.",
            errorMessage: e
        });
    }
});

module.exports = router;
