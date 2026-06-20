const navItems = document.querySelectorAll('.nav-item');
const sections = document.querySelectorAll('.section');

navItems.forEach(item => {

    item.addEventListener('click', () => {

        navItems.forEach(btn =>
            btn.classList.remove('active')
        );

        item.classList.add('active');

        const target = item.dataset.section;

        sections.forEach(section => {
            section.classList.remove('active-section');
        });

        document
            .getElementById(target)
            .classList.add('active-section');

    });

});

const menuBtn = document.getElementById('menuBtn');
const sidebar = document.getElementById('sidebar');

menuBtn.addEventListener('click', () => {

    sidebar.classList.toggle('open');

});

const themeToggle =
document.getElementById('themeToggle');

const savedTheme =
localStorage.getItem('theme');

if(savedTheme === 'light'){
    document.body.classList.add('light-mode');
    themeToggle.innerHTML = '☀️';
}

themeToggle.addEventListener('click', () => {

    document.body.classList.toggle('light-mode');

    const isLight =
    document.body.classList.contains('light-mode');

    localStorage.setItem(
        'theme',
        isLight ? 'light' : 'dark'
    );

    themeToggle.innerHTML =
        isLight ? '☀️' : '🌙';

});

const searchInput =
document.getElementById('searchInput');

searchInput.addEventListener('keyup', () => {

    const value =
    searchInput.value.toLowerCase();

    document
    .querySelectorAll('.card')
    .forEach(card => {

        const text =
        card.innerText.toLowerCase();

        card.style.display =
        text.includes(value)
        ? 'block'
        : 'none';

    });

});

const clearStorage =
document.getElementById('clearStorage');

if(clearStorage){

    clearStorage.addEventListener(
        'click',
        () => {

            localStorage.clear();

            alert(
                'Datos eliminados correctamente'
            );

        }
    );

}

if('serviceWorker' in navigator){

    window.addEventListener(
        'load',
        () => {

            navigator.serviceWorker.register(
                './service-worker.js'
            );

        }
    );

                        }
