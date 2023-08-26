const express = require("express");

const router = express.Router();
const listController = require("../controllers/list");

logger.info("router loaded");

router.get("/", listController.getAll);
router.post("/create", listController.craete);
router.get("/delete/:id", listController.deleteById);
router.get("/status/:id", listController.changeStatus);
router.get("/complete-all", listController.completeAll);
router.get("/delete-all", listController.deleteAll);

module.exports = router;
