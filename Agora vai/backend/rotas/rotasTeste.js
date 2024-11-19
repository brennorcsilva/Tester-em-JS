const express = require('express');
const router = express.Router();

const controladorResultado = require('../controladores/controladorResultado');

router.get('/api/results', controladorResultado.getAllResults);
// router.post('/api/submitForm', controladorResultado.submitAnswers);
router.get('/api/results/:user', controladorResultado.getResultsByUser);
router.delete('/api/results/:id', controladorResultado.deleteResultById);
router.put('/api/results/:id', controladorResultado.updateResultById);

module.exports = router;