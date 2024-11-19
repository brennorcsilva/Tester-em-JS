// Função para registrar o usuário
export async function registerUser(username, password) {
    const response = await fetch('http://localhost:3000/api/register', { 
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erro desconhecido');
    }

    return await response.json();
}

// Função para fazer login do usuário
export async function loginUser(username, password) {
    const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erro desconhecido');
    }

    return await response.json();
}

// Lógica do evento de registro
document.getElementById('registerButton')?.addEventListener('click', async () => {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const data = await registerUser(username, password);
        alert('Conta registrada com sucesso!');
        window.location.href = 'login.html';
    } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao registrar: ' + error.message);
    }
});

// Lógica do evento de login
document.getElementById('loginButton')?.addEventListener('click', async () => {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const data = await loginUser(username, password);
        alert('Login bem-sucedido!');
        window.location.href = 'index.html';
    } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao fazer login: ' + error.message);
    }
});
