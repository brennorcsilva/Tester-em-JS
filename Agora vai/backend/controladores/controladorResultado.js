const db = require('../database');


//listar resultados
exports.getAllResults = (req, res) => {
    const sql = `SELECT * FROM resultados`;
    db.all(sql, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao buscar resultados'});
        }
        res.json(rows);
    });
};


//buscar resultados por usuarios
exports.getResultsByUser = (req, res) => {
    const user = req.params.user;
    const sql = `SELECT * FROM results WHERE user = ?`;
    db.all(sql, [user], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao buscar resultados para o usuário especificado' });
        }
        res.json(rows);
    });
};

//deletar 
exports.deleteResultById = (req, res) => { 
    const id = req.params.id;
    const sql = `DELETE FROM results WHERE id = ?`;
    db.run(sql, [id], function (err) {
        if (err) {
            return res.status(500).json({ error: 'Erro ao deletar o resultado' });
        }
        res.json({ message: `Resultado com ID ${id} deletado com sucesso` });
    });
};

//atualizar resultados por ID
exports.updateResultById = (req, res) => { 
    const id = req.params.id;
    const { score, totalQuestions } = req.body;
    const sql = `UPDATE results SET score = ?, totalQuestions = ? WHERE id = ?`;

    db.run(sql, [score, totalQuestions, id], function (err) {
        if (err) {
            return res.status(500).json({ error: 'Erro ao atualizar o resultado' });
        }
        res.json({ message: `Resultado com ID ${id} atualizado com sucesso` });
    });
};


const respostasCertas = {
    q1: 'B',
    q2: 'A',
    q3: 'C',
    q4: 'C',
    q5: 'D',
    q6: 'B',
    q7: 'D',
    q8: 'A',
    q9: 'D',
    q10: 'A'
};

exports.submitAnswers = (req, res) => {
    const userAnswers = req.body; //receber as respostas
    console.log(userAnswers + "Aquiiii");
    let pontuacao = 0;

    //consulta as respostas
    for(let question in respostasCertas) {
        if (userAnswers[question] === respostasCertas[question]){
            pontuacao++;
        }
    }

    const total = Object.keys(respostasCertas).length;

    const user = userAnswers.user || 'Username';
    db.run(`INSERT INTO resultados (user, pontuacao, total) VALUES (?, ?, ?)`,
        [user, pontuacao, total],
        function (err) {
            if(err){
                res.status(500).json({error: 'Erro ao salvar resultado no DB'});
            } else {
                res.json({ pontuacao: pontuacao, total: total, message: 'Respostas enviadas' });
            }
        }
    )
};