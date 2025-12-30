/**
 * Calculateur Arithmétique Interactif
 * Gestion des validations, calculs et affichage dynamique des résultats
 */

// Sélection des éléments du DOM
const nombre1Input = document.getElementById('nombre1');
const nombre2Input = document.getElementById('nombre2');
const calculerBtn = document.getElementById('calculerBtn');
const resultatsSection = document.getElementById('resultatsSection');
const errorGlobal = document.getElementById('errorGlobal');

// Éléments des résultats
const resultats = {
    somme: document.getElementById('somme'),
    difference: document.getElementById('difference'),
    produit: document.getElementById('produit'),
    quotient: document.getElementById('quotient')
};

// Éléments d'erreur des champs
const erreurs = {
    nombre1: document.getElementById('error-nombre1'),
    nombre2: document.getElementById('error-nombre2')
};

/**
 * Validation en temps réel des champs de saisie
 */
function setupValidation() {
    [nombre1Input, nombre2Input].forEach(input => {
        input.addEventListener('input', function() {
            validateInput(this);
            clearGlobalError();
            updateButtonState();
        });
    });
}

/**
 * Validation d'un champ de saisie numérique
 */
function validateInput(input) {
    const value = input.value.trim();
    const errorElement = erreurs[input.id === 'nombre1' ? 'nombre1' : 'nombre2'];
    
    // Reset des styles d'erreur
    input.classList.remove('error');
    errorElement.textContent = '';
    errorElement.style.display = 'none';
    
    if (value === '') {
        return true; // Champ vide autorisé tant qu'on ne clique pas sur calculer
    }
    
    // Vérification que la valeur est bien un nombre
    if (isNaN(value) || !isFinite(value)) {
        input.classList.add('error');
        errorElement.textContent = 'Veuillez saisir un nombre valide.';
        errorElement.style.display = 'block';
        return false;
    }
    
    return true;
}

/**
 * Met à jour l'état du bouton Calculer
 */
function updateButtonState() {
    const nombre1Valid = nombre1Input.value.trim() !== '' && !nombre1Input.classList.contains('error');
    const nombre2Valid = nombre2Input.value.trim() !== '' && !nombre2Input.classList.contains('error');
    
    calculerBtn.disabled = !(nombre1Valid && nombre2Valid);
}

/**
 * Affiche un message d'erreur global
 */
function showGlobalError(message) {
    errorGlobal.textContent = message;
    errorGlobal.style.display = 'block';
    resultatsSection.style.display = 'none';
}

/**
 * Efface le message d'erreur global
 */
function clearGlobalError() {
    errorGlobal.style.display = 'none';
    resultatsSection.style.display = 'block';
}

/**
 * Calcule et affiche tous les résultats
 */
function calculerResultats() {
    const num1 = parseFloat(nombre1Input.value);
    const num2 = parseFloat(nombre2Input.value);
    
    // Division par zéro
    if (num2 === 0) {
        showGlobalError('❌ Erreur : Division par zéro impossible ! Le second nombre ne peut pas être égal à 0.');
        return;
    }
    
    // Calculs
    resultats.somme.textContent = (num1 + num2).toLocaleString('fr-FR', { maximumFractionDigits: 4 });
    resultats.difference.textContent = (num1 - num2).toLocaleString('fr-FR', { maximumFractionDigits: 4 });
    resultats.produit.textContent = (num1 * num2).toLocaleString('fr-FR', { maximumFractionDigits: 4 });
    resultats.quotient.textContent = (num1 / num2).toLocaleString('fr-FR', { maximumFractionDigits: 4 });
    
    // Efface les erreurs et affiche les résultats
    clearGlobalError();
}

/**
 * Gestionnaire du bouton Calculer
 */
calculerBtn.addEventListener('click', function(e) {
    e.preventDefault();
    
    // Validation finale des deux champs
    const valid1 = validateInput(nombre1Input);
    const valid2 = validateInput(nombre2Input);
    
    if (!valid1 || !valid2) {
        showGlobalError('❌ Veuillez corriger les erreurs dans les champs de saisie.');
        return;
    }
    
    calculerResultats();
});

// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', function() {
    setupValidation();
    updateButtonState();
    
    // Réinitialisation des résultats au changement de valeurs
    [nombre1Input, nombre2Input].forEach(input => {
        input.addEventListener('change', clearGlobalError);
    });
});