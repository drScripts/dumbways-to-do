const router = require("express").Router();
const { add, update, destroy, get } = require("../controllers/projects");

router.get("/", get);
router.post("/", add);
router.patch("/:id", update);
router.delete("/:id", destroy);

module.exports = router;
