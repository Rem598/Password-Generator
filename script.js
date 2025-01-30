const lengthInput = document.getElementById('length');
const lengthDisplay = document.getElementById('length-display');
const generateButton = document.getElementById('generate');
const passwordPreview = document.getElementById('generated-password');
const strengthIndicator = document.getElementById('strength-indicator');
const copyButton = document.getElementById('copy');

const options = {
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    numbers: "0123456789",
    symbols: "!@#$%^&*()_+-=[]{}|;:,.<>?",
};

function updateLengthDisplay(value) {
    lengthDisplay.textContent = `Length: ${value}`;
}

function calculateStrength(password) {
    let strength = 0;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^a-zA-Z0-9]/.test(password)) strength++;

    const width = (strength / 4) * 100;
    strengthIndicator.style.width = `${width}%`;

    strengthIndicator.className = strength <= 1 ? 'weak' : strength <= 3 ? 'medium' : 'strong';
}

function generatePassword() {
    const length = +lengthInput.value;
    let characters = "";

    if (document.getElementById('include-lowercase').checked) {
        characters += options.lowercase;
    }
    if (document.getElementById('include-uppercase').checked) {
        characters += options.uppercase;
    }
    if (document.getElementById('include-numbers').checked) {
        characters += options.numbers;
    }
    if (document.getElementById('include-symbols').checked) {
        characters += options.symbols;
    }

    let password = "";
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        password += characters[randomIndex];
    }

    passwordPreview.textContent = password;
    calculateStrength(password);
}

function copyToClipboard() {
    const password = passwordPreview.textContent;
    navigator.clipboard.writeText(password).then(() => {
        alert('Password copied to clipboard!');
    });
}

generateButton.addEventListener('click', generatePassword);
copyButton.addEventListener('click', copyToClipboard);
