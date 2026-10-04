const USERS_KEY = "streamflix-users";
const CURRENT_USER_KEY = "streamflix-current-user";
const PASSWORD_ITERATIONS = 120000;

function getUsers() {
    try {
        const users = JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
        return Array.isArray(users) ? users : [];
    } catch {
        return [];
    }
}

function saveUsers(users) {
    try {
        localStorage.setItem(USERS_KEY, JSON.stringify(users));
        return true;
    } catch {
        return false;
    }
}

function supportsSecureStorage() {
    return Boolean(window.crypto?.subtle && window.crypto?.getRandomValues);
}

function createSalt() {
    const bytes = new Uint8Array(16);
    window.crypto.getRandomValues(bytes);
    return Array.from(bytes, byte => byte.toString(16).padStart(2, "0")).join("");
}

async function hashPassword(password, salt) {
    const encoder = new TextEncoder();
    const key = await window.crypto.subtle.importKey(
        "raw",
        encoder.encode(password),
        "PBKDF2",
        false,
        ["deriveBits"]
    );
    const bits = await window.crypto.subtle.deriveBits(
        { name: "PBKDF2", salt: encoder.encode(salt), iterations: PASSWORD_ITERATIONS, hash: "SHA-256" },
        key,
        256
    );
    return Array.from(new Uint8Array(bits), byte => byte.toString(16).padStart(2, "0")).join("");
}

function showMessage(element, text, isError = true) {
    element.textContent = text;
    element.classList.toggle("is-success", !isError);
}

const signupForm = document.getElementById("signup-form");

if (signupForm) {
    signupForm.addEventListener("submit", async event => {
        event.preventDefault();

        const name = document.getElementById("signup-name").value.trim();
        const email = document.getElementById("signup-email").value.trim().toLowerCase();
        const password = document.getElementById("signup-password").value;
        const confirmPassword = document.getElementById("signup-confirm-password").value;
        const message = document.getElementById("signup-message");

        if (password !== confirmPassword) {
            showMessage(message, "Passwords do not match.");
            return;
        }

        const users = getUsers();
        if (users.some(user => user.email === email)) {
            showMessage(message, "An account with this email already exists.");
            return;
        }

        if (!supportsSecureStorage()) {
            showMessage(message, "Secure account storage requires localhost or HTTPS.");
            return;
        }

        const salt = createSalt();
        try {
            users.push({
                id: Date.now(),
                name,
                email,
                salt,
                passwordHash: await hashPassword(password, salt),
                passwordAlgorithm: "PBKDF2-SHA-256",
                passwordIterations: PASSWORD_ITERATIONS
            });
        } catch {
            showMessage(message, "Your browser could not create a secure password record.");
            return;
        }

        if (!saveUsers(users)) {
            showMessage(message, "Your browser could not save this account.");
            return;
        }

        showMessage(message, "Account created successfully!", false);
        signupForm.reset();
        window.setTimeout(() => { window.location.href = "./login.html"; }, 1000);
    });
}

const loginForm = document.getElementById("login-form");

if (loginForm) {
    loginForm.addEventListener("submit", async event => {
        event.preventDefault();

        const email = document.getElementById("login-email").value.trim().toLowerCase();
        const password = document.getElementById("login-password").value;
        const message = document.getElementById("login-message");
        const users = getUsers();
        const user = users.find(entry => entry.email === email);

        if (!user) {
            showMessage(message, "Invalid email or password.");
            return;
        }

        if (!supportsSecureStorage()) {
            showMessage(message, "Secure sign in requires localhost or HTTPS.");
            return;
        }

        try {
            let matches = false;
            if (user.passwordAlgorithm === "PBKDF2-SHA-256" && user.passwordIterations) {
                matches = await hashPassword(password, user.salt) === user.passwordHash;
            } else if (user.password) {
                // Upgrade older demo accounts that stored a plain-text password.
                matches = user.password === password;
                if (matches) {
                    const salt = createSalt();
                    user.salt = salt;
                    user.passwordHash = await hashPassword(password, salt);
                    user.passwordAlgorithm = "PBKDF2-SHA-256";
                    user.passwordIterations = PASSWORD_ITERATIONS;
                    delete user.password;
                    if (!saveUsers(users)) {
                        showMessage(message, "Password verified, but your browser could not update the account.");
                        return;
                    }
                }
            }

            if (!matches) {
                showMessage(message, "Invalid email or password.");
                return;
            }

            localStorage.setItem(CURRENT_USER_KEY, JSON.stringify({
                id: user.id,
                name: user.name,
                email: user.email
            }));
        } catch {
            showMessage(message, "Your browser could not complete sign in. Please try again.");
            return;
        }

        showMessage(message, "Login successful!", false);
        window.setTimeout(() => { window.location.href = "./index.html"; }, 700);
    });
}
