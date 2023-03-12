// Initialiser Tippy.js

tippy('#copyBtn', {
    content: 'Cliquez pour copier mon mail',
    arrow: true,
    trigger: 'mouseenter',
    placement: 'top-end',
    duration: 500,
    });


    
    const textToCopy = "nunomoreiraribeiro-08@outlook.fr"
    const copyBtn = document.getElementById('copyBtn')
    copyBtn.addEventListener('click', function() {
    navigator.clipboard.writeText(textToCopy).then(function() {
        copyBtn._tippy.setContent('Mail copié !');
    }, function() {
        copyBtn._tippy.setContent('Une erreur est survenue lors de la copie du mail.');
    });
    });

   