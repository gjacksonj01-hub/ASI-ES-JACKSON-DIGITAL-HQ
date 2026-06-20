// ===============================
// ASÍ ES JACKSON DIGITAL HQ
// APP.JS v1.1
// ===============================

document.addEventListener("DOMContentLoaded", () => {

    // ===============================
    // ELEMENTOS
    // ===============================

    const sidebar = document.getElementById("sidebar");
    const menuBtn = document.getElementById("menuBtn");
    const themeToggle = document.getElementById("themeToggle");
    const searchInput = document.getElementById("searchInput");
    const clearStorage = document.getElementById("clearStorage");

    const navItems = document.querySelectorAll(".nav-item");
    const sections = document.querySelectorAll(".section");

    // ===============================
    // MENÚ LATERAL
    // ===============================

    if (menuBtn) {

        menuBtn.addEventListener("click", () => {

            sidebar.classList.toggle("open");

        });

    }

    // ===============================
    // NAVEGACIÓN ENTRE SECCIONES
    // ===============================

    navItems.forEach(item => {

        item.addEventListener("click", () => {

            // Quitar activo anterior
            navItems.forEach(btn => {
                btn.classList.remove("active");
            });

            // Activar actual
            item.classList.add("active");

            // Obtener sección destino
            const target = item.dataset.section;

            // Ocultar todas
            sections.forEach(section => {
                section.classList.remove("active-section");
            });

            // Mostrar seleccionada
            const destination =
                document.getElementById(target);

            if (destination) {
                destination.classList.add("active-section");
            }

            // En móvil cerrar menú
            if (window.innerWidth <= 768) {
                sidebar.classList.remove("open");
            }

        });

    });

    // ===============================
    // MODO OSCURO / CLARO
    // ===============================

    const savedTheme =
        localStorage.getItem("theme");

    if (savedTheme === "light") {

        document.body.classList.add("light-mode");

        if (themeToggle) {
            themeToggle.innerHTML = "☀️";
        }

    }

    if (themeToggle) {

        themeToggle.addEventListener("click", () => {

            document.body.classList.toggle("light-mode");

            const isLight =
                document.body.classList.contains("light-mode");

            localStorage.setItem(
                "theme",
                isLight ? "light" : "dark"
            );

            themeToggle.innerHTML =
                isLight ? "☀️" : "🌙";

        });

    }

    // ===============================
    // BUSCADOR GLOBAL
    // ===============================

    if (searchInput) {

        searchInput.addEventListener("keyup", () => {

            const value =
                searchInput.value.toLowerCase();

            const cards =
                document.querySelectorAll(".card");

            cards.forEach(card => {

                const text =
                    card.innerText.toLowerCase();

                card.style.display =
                    text.includes(value)
                        ? ""
                        : "none";

            });

        });

    }

    // ===============================
    // LIMPIAR DATOS
    // ===============================

    if (clearStorage) {

        clearStorage.addEventListener("click", () => {

            const confirmar = confirm(
                "¿Deseas eliminar todos los datos guardados?"
            );

            if (!confirmar) return;

            localStorage.clear();

            alert(
                "Datos eliminados correctamente."
            );

            location.reload();

        });

    }

    // ===============================
    // CHECKLISTS
    // ===============================

    const checkboxes =
        document.querySelectorAll(
            'input[type="checkbox"]'
        );

    checkboxes.forEach((checkbox, index) => {

        const key =
            `checklist_${index}`;

        const savedValue =
            localStorage.getItem(key);

        if (savedValue === "true") {
            checkbox.checked = true;
        }

        checkbox.addEventListener("change", () => {

            localStorage.setItem(
                key,
                checkbox.checked
            );

        });

    });

    // ===============================
    // DATOS DEMO KPI
    // ===============================

    const followers =
        document.getElementById("followersValue");

    const reach =
        document.getElementById("reachValue");

    const shows =
        document.getElementById("showsValue");

    const content =
        document.getElementById("contentValue");

    if (followers)
        followers.innerText = "1.250";

    if (reach)
        reach.innerText = "37.500";

    if (shows)
        shows.innerText = "4 / 12";

    if (content)
        content.innerText = "9 / 14";

    // ===============================
    // SERVICE WORKER
    // ===============================

    if ("serviceWorker" in navigator) {

        window.addEventListener("load", () => {

            navigator.serviceWorker
                .register("./service-worker.js")
                .then(() => {

                    console.log(
                        "Service Worker registrado"
                    );

                })
                .catch(error => {

                    console.error(
                        "Error SW:",
                        error
                    );

                });

        });

    }

    // ===============================
    // INICIO
    // ===============================

    console.log(
        "ASÍ ES JACKSON DIGITAL HQ iniciado"
    );

});
