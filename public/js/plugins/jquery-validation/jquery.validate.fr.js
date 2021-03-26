jQuery.extend(jQuery.validator.messages, {
    required: "Ce champ est requis.",
    remote: "Veuillez corriger ce champ.",
    email: "Veuillez entrer une adresse e-mail valide.",
    url: "Veuillez entrer une URL valide.",
    date: "Veuillez entrer une date valide.",
    dateISO: "Veuillez entrer une date valide (ISO).",
    number: "Veuillez entrer un nombre valide.",
    digits: "Veuillez entrer que des chiffres.",
    creditcard: "Veuillez entrer un numéro de carte de crédit valide.",
    equalTo: "Veuillez entrer à nouveau la même valeur.",
    accept: "Veuillez entrer une valeur avec une extension valide.",
    maxlength: jQuery.validator.format("Veuillez ne pas entrer plus de {0} caractères."),
    minlength: jQuery.validator.format("Veuillez entrer au moins {0} caractères."),
    rangelength: jQuery.validator.format("Veuillez entrer une valeur comprise entre {0} et {1} caractères."),
    range: jQuery.validator.format("Veuillez entrer une valeur entre {0} et {1}."),
    max: jQuery.validator.format("Veuillez entrer une valeur inférieure ou égale à {0}."),
    min: jQuery.validator.format("Veuillez entrer une valeur supérieure ou égale à {0}.")
});
