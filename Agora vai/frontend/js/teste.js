document.getElementById('submit-test').addEventListener('click', async () => {
    const user = 'usuario_teste'; // Pega o usuário logado
    const score = calcularPontuacao(); // Função para calcular a pontuação
    const totalQuestions = 10; // Número total de questões no teste

    try {
        const response = await fetch('http://localhost:3000/api/results', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ user, score, totalQuestions }),
        });

        const data = await response.json();
        if (data.success) {
            alert('Resultado enviado com sucesso!');
            window.location.href = score >= 7 ? 'resultado_acerto.html' : 'resultado_erro.html';
        } else {
            alert('Erro ao enviar o resultado.');
        }
    } catch (error) {
        console.error('Erro ao enviar o resultado:', error);
    }
});
