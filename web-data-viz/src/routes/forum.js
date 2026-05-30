var express = require("express");
var router = express.Router();
var forumController = require("../controllers/forumController");

router.get("/listar/:fkEquipe", forumController.listarPosts);
router.post("/postar", forumController.postarMensagem);
router.put("/curtir/:id", forumController.curtirPost);
router.delete("/deletar/:id", forumController.deletarPost);
router.put("/editar/:id", forumController.editarPost);

module.exports = router;