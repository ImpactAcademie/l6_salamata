const form = document.querySelector('#auth-form');
const modeButtons = document.querySelectorAll('[data-mode]');
const heading = document.querySelector('#heading');
const subheading = document.querySelector('#subheading');
const submitLabel = document.querySelector('#submit-label');
const notice = document.querySelector('#notice');
const formOptions = document.querySelector('.form-options');
const terms = document.querySelector('#terms');
const nameInput = form.elements.namedItem('name');
const passwordInput = form.elements.namedItem('password');
const confirmInput = form.elements.namedItem('confirmPassword');
let mode = 'login';

function showNotice(message, isError = false) {
  notice.textContent = message;
  notice.classList.remove('hidden', 'notice-error');
  if (isError) notice.classList.add('notice-error');
}

function clearNotice() {
  notice.textContent = '';
  notice.classList.add('hidden');
  notice.classList.remove('notice-error');
}

modeButtons.forEach((button) => {
  button.addEventListener('click', () => {
    mode = button.dataset.mode;
    const isSignup = mode === 'signup';
    modeButtons.forEach((tab) => {
      const active = tab === button;
      tab.classList.toggle('active', active);
      tab.setAttribute('aria-selected', String(active));
    });
    document.querySelectorAll('.signup-only').forEach((field) => field.classList.toggle('hidden', !isSignup));
    formOptions.classList.toggle('hidden', isSignup);
    terms.classList.toggle('hidden', !isSignup);
    nameInput.required = isSignup;
    confirmInput.required = isSignup;
    passwordInput.autocomplete = isSignup ? 'new-password' : 'current-password';
    heading.innerHTML = isSignup ? 'Créez votre espace<span>.</span>' : 'Ravi de vous revoir<span>.</span>';
    subheading.textContent = isSignup ? 'Quelques détails et vous êtes chez vous.' : 'Connectez-vous pour retrouver votre espace.';
    submitLabel.textContent = isSignup ? 'Créer mon compte' : 'Me connecter';
    clearNotice();
  });
});

form.addEventListener('input', clearNotice);

form.querySelector('.input-action').addEventListener('click', (event) => {
  const button = event.currentTarget;
  const isVisible = passwordInput.type === 'text';
  passwordInput.type = isVisible ? 'password' : 'text';
  confirmInput.type = isVisible ? 'password' : 'text';
  button.textContent = isVisible ? '◎' : '◉';
  button.setAttribute('aria-label', isVisible ? 'Afficher le mot de passe' : 'Masquer le mot de passe');
});

document.querySelector('#forgot').addEventListener('click', () => {
  showNotice('La réinitialisation du mot de passe sera disponible avec le backend.');
});

document.querySelectorAll('[data-notice], #terms button').forEach((button) => {
  button.addEventListener('click', () => showNotice(button.dataset.notice || 'Les conditions seront disponibles prochainement.'));
});

form.addEventListener('submit', (event) => {
  event.preventDefault();
  if (mode === 'signup' && passwordInput.value !== confirmInput.value) {
    showNotice('Les mots de passe ne correspondent pas.', true);
    confirmInput.focus();
    return;
  }
  showNotice(mode === 'signup'
    ? 'Votre compte est prêt à être créé — la connexion au serveur sera ajoutée plus tard.'
    : 'Formulaire validé — la connexion au serveur sera ajoutée plus tard.');
});
