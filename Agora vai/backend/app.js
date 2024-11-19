const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose(); // Adicione a biblioteca SQLite
//const rotasTeste = require('./rotas/rotasTeste');

const app = express();
const PORT = process.env.PORT || 3000;

// Conexão com o banco de dados
const db = new sqlite3.Database('./database.db', (err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados', err.message);
    } else {
        console.log('Conectado ao banco de dados SQLite.');
    }

    db.run(`CREATE TABLE IF NOT EXISTS resultados (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user TEXT,
        pontuacao INTEGER,
        total INTEGER,
        horas DATETIME DEFAULT CURRENT_TIMESTAMP
        )`
    );
    
    db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE,
        password TEXT
    )`);
});

// Middlewares
app.use(cors()); // Conectar front e back
app.use(bodyParser.urlencoded({ extended: true }));  // Para formulários URL-encoded
app.use(bodyParser.json());  // Para conteúdo JSON

//app.use('/api/teste', rotasTeste);

// Endpoint para registro
app.post('/api/register', (req, res) => {
    const { username, password } = req.body;

    const sql = 'INSERT INTO users (username, password) VALUES (?, ?)'; // Use 'email' aqui

    db.run(sql, [username, password], function (err) {
        if (err) {
            console.error('Erro ao registrar usuário:', err.message); // Log do erro
            return res.status(500).json({ message: 'Erro ao registrar usuário' });
        }
        res.status(201).json({ message: 'Usuário registrado com sucesso', id: this.lastID });
    });
});

app.post('/api/login', (req, res) => {
    const { username, password } = req.body;

    const sql = 'SELECT * FROM users WHERE username = ? AND password = ?';

    db.get(sql, [username, password], (err, row) => {
        if (err) {
            console.error('Erro ao verificar usuário:', err.message);
            return res.status(500).json({ message: 'Erro ao verificar usuário' });
        }
        
        if (!row) {
            return res.status(401).json({ message: 'Usuário ou senha incorretos' });
        }

        res.status(200).json({ message: 'Login bem-sucedido', userId: row.id });
    });
});

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

app.post('/api/submitForm', (req, res) => {
    const userAnswers = req.body; //receber as respostas
    console.log(userAnswers,"Aquiiii");
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
                res.json({ pontuacao: pontuacao, total: total, message: 'Respostas enviadas!' });
            }
        }
    )
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
