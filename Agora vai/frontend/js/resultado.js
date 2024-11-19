async function buscarResultadosDoUsuario(user) {
    try {
        const response = await fetch(`http://localhost:3000/api/results/${user}`, {
            method: 'GET',
        });
        const resultados = await response.json();
        const containerResultados = document.getElementById('container-resultados');

        resultados.forEach((resultado) => {
            const item = document.createElement('div');
            item.textContent = `ID: ${resultado.id}, Nota: ${resultado.score}/${resultado.totalQuestions}, Data: ${resultado.createdAt}`;
            containerResultados.appendChild(item);
        });
    } catch (error) {
        console.error('Erro ao buscar resultados:', error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const user = 'usuario_teste'; // Pega o usuário logado
    buscarResultadosDoUsuario(user);
});
