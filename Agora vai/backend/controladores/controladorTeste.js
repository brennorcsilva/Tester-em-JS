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