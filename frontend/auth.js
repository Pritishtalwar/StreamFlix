const USERS_KEY = "streamflix-users";
const CURRENT_USER_KEY = "streamflix-current-user";

function getUsers() {
    return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
}

function saveUsers(users) {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
}


// =========================
// SIGN UP
// =========================

const signupForm = document.getElementById("signup-form");

if (signupForm) {
    signupForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.getElementById("signup-name").value.trim();
        const email = document.getElementById("signup-email").value.trim().toLowerCase();
        const password = document.getElementById("signup-password").value;
        const confirmPassword = document.getElementById("signup-confirm-password").value;
        const message = document.getElementById("signup-message");

        if (password !== confirmPassword) {
            message.textContent = "Passwords do not match.";
            return;
        }

        const users = getUsers();

        const existingUser = users.find(user => user.email === email);

        if (existingUser) {
            message.textContent = "An account with this email already exists.";
            return;
        }

        const newUser = {
            id: Date.now(),
            name: name,
            email: email,
            password: password
        };

        users.push(newUser);
        saveUsers(users);

        message.textContent = "Account created successfully!";

        signupForm.reset();

        setTimeout(() => {
            window.location.href = "./login.html";
        }, 1000);
    });
}


// =========================
// LOGIN
// =========================

const loginForm = document.getElementById("login-form");

if (loginForm) {
    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const email = document.getElementById("login-email").value.trim().toLowerCase();
        const password = document.getElementById("login-password").value;
        const message = document.getElementById("login-message");

        const users = getUsers();

        const user = users.find(
            user => user.email === email && user.password === password
        );

        if (!user) {
            message.textContent = "Invalid email or password.";
            return;
        }

        localStorage.setItem(
            CURRENT_USER_KEY,
            JSON.stringify({
                id: user.id,
                name: user.name,
                email: user.email
            })
        );

        message.textContent = "Login successful!";

        setTimeout(() => {
            window.location.href = "./index.html";
        }, 700);
    });
}