const { Router } = require("express");
// import all routers;
const formRouter = require("./form.js");

const router = Router();

// load each router on a route
router.use("/forms", formRouter);

module.exports = router;
