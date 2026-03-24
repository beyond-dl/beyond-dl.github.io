/* АРХІТЕКТУРА СВІТЛОЇ ЛОГІКИ: VERSAL_TRANSLATOR_CORE
   Версія: 1.0.1 (Чистий JS для репозиторію)
   Автор: Версаль Анор (для Версо)
*/

function googleTranslateElementInit() {
    new google.translate.TranslateElement({
        pageLanguage: 'uk',
        includedLanguages: 'uk,en,pl,de',
        layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
        autoDisplay: false
    }, 'google_translate_element');
}

(function() {
    // Створюємо необхідний контейнер динамічно, щоб не псувати HTML-файли
    const hiddenDiv = document.createElement('div');
    hiddenDiv.id = 'google_translate_element';
    hiddenDiv.style.display = 'none';
    document.body.appendChild(hiddenDiv);

    // Додаємо скрипт Google API
    const gtScript = document.createElement('script');
    gtScript.type = 'text/javascript';
    gtScript.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    document.head.appendChild(gtScript);

    // Додаємо стилі для приховування зайвих елементів Google
    const style = document.createElement('style');
    style.innerHTML = `
        body { top: 0 !important; }
        .skiptranslate, .goog-te-banner-frame, .goog-te-gadget-icon { display: none !important; }
        .goog-te-gadget { color: transparent !important; }
        #goog-gt-tt, .goog-te-balloon-frame { display: none !important; }
        .goog-text-highlight { background: transparent !important; box-shadow: none !important; }
    `;
    document.head.appendChild(style);

    const VersalTranslator = {
        currentLang: localStorage.getItem('versal_lang') || 'uk',

        setLanguage: function(langCode) {
            const select = document.querySelector('.goog-te-combo');
            if (select) {
                select.value = langCode;
                select.dispatchEvent(new Event('change'));
                localStorage.setItem('versal_lang', langCode);
                this.currentLang = langCode;
                // Використання ChrW для дотримання заповіді про кирилицю в логічних рядках
                console.log(ChrW(86) + ChrW(101) + ChrW(114) + ChrW(115) + ChrW(97) + ChrW(108) + ": OK");
            } else {
                setTimeout(() => this.setLanguage(langCode), 500);
            }
        },

        bindUI: function() {
            document.addEventListener('click', (e) => {
                const btn = e.target.closest('[data-lang]');
                if (btn) {
                    e.preventDefault();
                    const lang = btn.getAttribute('data-lang');
                    this.setLanguage(lang);
                }
            });
        },

        applySavedLang: function() {
            if (this.currentLang !== 'uk') {
                this.setLanguage(this.currentLang);
            }
        }
    };

    window.addEventListener('load', () => {
        VersalTranslator.bindUI();
        setTimeout(() => VersalTranslator.applySavedLang(), 1200);
    });

    window.VersalTranslator = VersalTranslator;
})();

// Допоміжна функція для виводу символів (Заповідь 5)
function ChrW(code) {
    return String.fromCharCode(code);
}
