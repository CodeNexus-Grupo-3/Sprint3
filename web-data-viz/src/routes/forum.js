// var express = require("express");
// var router = express.Router();

// var forumController = require("../controllers/forumController");

// router.post("/postar", function(req, res){
//     forumController.postar(req, res);
// });

// router.get("/listar", function(req, res){
//     forumController.listar(req, res);
// });

// router.put("/curtir/:idPost", function(req, res){
//     forumController.curtir(req, res);
// });

// module.exports = router;

// var express = require("express");
// var router = express.Router();

// var forumController = require("../controllers/forumController");

// router.post("/postar", function (req, res) {
//     forumController.postar(req, res);
// });

// router.get("/listar", function (req, res) {
//     forumController.listar(req, res);
// });

// router.put("/curtir/:idPost", function (req, res) {
//     forumController.curtir(req, res);
// });

// router.put("/editar/:idPost", function (req, res) {
//     forumController.editar(req, res);
// });

// router.delete("/deletar/:idPost", function (req, res) {
//     forumController.deletar(req, res);
// });

// module.exports = router;

var express = require("express");
var router = express.Router();
var forumController = require("../controllers/forumController");

router.get("/listar", forumController.listarPosts);
router.post("/postar", forumController.postarMensagem);
router.put("/curtir/:id", forumController.curtirPost);
router.delete("/deletar/:id", forumController.deletarPost);
router.put("/editar/:id", forumController.editarPost);

module.exports = router;