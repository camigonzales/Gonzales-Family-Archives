/* =========================
   1. MONTH TABS (1997 page)
========================= */

const tabs = document.querySelectorAll(".tab");
const panels = document.querySelectorAll(".month-panel");

if (tabs.length && panels.length) {
    tabs.forEach(tab => {
        tab.addEventListener("click", () => {

            tabs.forEach(t => t.classList.remove("active"));
            panels.forEach(p => p.classList.remove("active"));

            tab.classList.add("active");

            const month = tab.dataset.month;
            const target = document.getElementById(month);

            if (target) target.classList.add("active");
        });
    });
}


/* =========================
   2. MONTH PAGE SEARCH (tags inside 1997 page)
========================= */

const searchInput = document.getElementById("search");

if (searchInput) {
    searchInput.addEventListener("input", (e) => {
        const query = e.target.value.toLowerCase();
        const photos = document.querySelectorAll(".photo");

        photos.forEach(photo => {
            const tags = photo.getAttribute("data-tags") || "";

            const match = tags.toLowerCase().includes(query);

            photo.style.display = match ? "block" : "none";
        });
    });
}


/* =========================
   3. LIGHTBOX (click image to enlarge)
========================= */

document.addEventListener("DOMContentLoaded", () => {

    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    const lightboxCaption = document.getElementById("lightbox-caption");

    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");

    const images = Array.from(document.querySelectorAll(".photo img"));

    let currentIndex = 0;

    function openLightbox(index) {
    if (!images.length) return;

    currentIndex = index;

    const img = images[currentIndex];
    if (!img) return;

    const parent = img.closest(".photo");
    const caption = parent?.querySelector("p")?.textContent || "";

    // fade out
    lightboxImg.style.opacity = 0;

    setTimeout(() => {
        lightboxImg.src = img.src;
        lightboxCaption.textContent = caption;

        // fade back in
        lightboxImg.style.opacity = 1;
    }, 120);

    lightbox.classList.add("active");
}

    images.forEach((img, index) => {
        img.addEventListener("click", () => {
            openLightbox(index);
        });
    });

    function showNext() {
        if (!images.length) return;
        currentIndex = (currentIndex + 1) % images.length;
        openLightbox(currentIndex);
    }

    function showPrev() {
        if (!images.length) return;
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        openLightbox(currentIndex);
    }

    nextBtn?.addEventListener("click", (e) => {
        e.stopPropagation();
        showNext();
    });

    prevBtn?.addEventListener("click", (e) => {
        e.stopPropagation();
        showPrev();
    });

    lightbox?.addEventListener("click", () => {
        lightbox.classList.remove("active");

        setTimeout(() => {
            lightboxImg.src = "";
            lightboxCaption.textContent = "";
        }, 200);
    });

    document.addEventListener("keydown", (e) => {
        if (!lightbox.classList.contains("active")) return;

        if (e.key === "ArrowRight") showNext();
        if (e.key === "ArrowLeft") showPrev();
        if (e.key === "Escape") lightbox.click();
    });

});