const id = document.querySelector('#id');
const passwordInput = document.querySelector('#password');
const submitBtn = document.querySelector('#submitBtn');
const rememberMe = document.querySelector('#rememberMe');

const saved = JSON.parse(localStorage.getItem('rememberedUser'));
if (saved) {
    id.value = saved.id;
    passwordInput.value = saved.password;
    rememberMe.checked = true;
}

submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const validUsers = [
        { id: 'admin', password: 'admin123' },
        { id: 'alice', password: 'alice456' },
    ];
    const match = validUsers.find(u => u.id === id.value && u.password === passwordInput.value);
    if (match) {
        if (rememberMe.checked) {
            localStorage.setItem('rememberedUser', JSON.stringify({ id: id.value, password: passwordInput.value }));
        } else {
            localStorage.removeItem('rememberedUser');
        }
        sessionStorage.setItem('loggedUser', match.id);
        window.location.href = './src/pages/dashboard.html';
    } else {
        passwordInput.classList.add('invalid');
        setTimeout(() => {
            passwordInput.classList.remove('invalid');
        }, 2000);
    }
});
