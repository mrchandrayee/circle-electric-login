const form = document.querySelector("#loginForm");
const usernameInput = document.querySelector("#username");
const passwordInput = document.querySelector("#password");
const message = document.querySelector("#formMessage");
const signInButton = document.querySelector("#signInButton");
const copyButton = document.querySelector("#copyButton");
const snippet = document.querySelector("#htmlSnippet");
const toast = document.querySelector("#toast");
let toastTimer;

function showMessage(text, success = false) {
  message.textContent = text;
  message.classList.toggle("success", success);
}

function clearValidation(input) {
  input.classList.remove("invalid");
  if (!usernameInput.classList.contains("invalid") &&
      !passwordInput.classList.contains("invalid")) {
    showMessage("");
  }
}

[usernameInput, passwordInput].forEach(input => {
  input.addEventListener("input", () => clearValidation(input));
});

form.addEventListener("submit", event => {
  event.preventDefault();
  usernameInput.classList.remove("invalid");
  passwordInput.classList.remove("invalid");
  showMessage("");

  const username = usernameInput.value.trim();
  const password = passwordInput.value;

  if (!username || !password) {
    if (!username) usernameInput.classList.add("invalid");
    if (!password) passwordInput.classList.add("invalid");
    showMessage("Please enter username and password.");
    return;
  }

  signInButton.disabled = true;
  signInButton.textContent = "Signing in...";

  window.setTimeout(() => {
    signInButton.disabled = false;
    signInButton.textContent = "Sign In";
    showMessage(`Welcome, ${username}! Demo login successful.`, true);
  }, 750);
});

function notify(text) {
  toast.textContent = text;
  toast.classList.add("show");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove("show"), 1500);
}

copyButton.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(snippet.textContent);
    notify("HTML copied to clipboard");
  } catch {
    const field = document.createElement("textarea");
    field.value = snippet.textContent;
    field.style.position = "fixed";
    field.style.opacity = "0";
    document.body.appendChild(field);
    field.select();
    const ok = document.execCommand("copy");
    field.remove();
    notify(ok ? "HTML copied to clipboard" : "Clipboard unavailable");
  }
});
