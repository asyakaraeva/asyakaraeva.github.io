document.addEventListener("DOMContentLoaded", () => {
    initializeSlideshow();
    initializeProductFilter();
    initializeCarePackageBuilder();
    initializeHoursStatus();
});

/*
 * Homepage slideshow
 * Changes the featured image and caption when the user
 * clicks the Previous or Next buttons.
 */
function initializeSlideshow() {
    const image = document.querySelector("#feature-image");
    const caption = document.querySelector("#feature-caption");
    const previousButton = document.querySelector("#previous-slide");
    const nextButton = document.querySelector("#next-slide");

    if (!image || !caption || !previousButton || !nextButton) {
        return;
    }

    const slides = [
        {
            src: "images/cozy-gift-display.jpg",
            alt: "Koala-inspired comfort gifts displayed with blankets and pillows",
            caption: "Thoughtful comfort gifts for peaceful moments."
        },
        {
            src: "images/comfort-products.jpg",
            alt: "A warming pillow, eye mask, blanket, and relaxation products",
            caption: "Small essentials designed to make rest feel easier."
        },
        {
            src: "images/gift-packaging.jpg",
            alt: "An Adorable Koala care package wrapped with tissue paper and ribbon",
            caption: "Every package is prepared with warmth and attention."
        }
    ];

    let currentSlide = 0;

    function showSlide(index) {
        currentSlide = (index + slides.length) % slides.length;

        image.src = slides[currentSlide].src;
        image.alt = slides[currentSlide].alt;
        caption.textContent = slides[currentSlide].caption;
    }

    previousButton.addEventListener("click", () => {
        showSlide(currentSlide - 1);
    });

    nextButton.addEventListener("click", () => {
        showSlide(currentSlide + 1);
    });

    showSlide(currentSlide);
}

/*
 * Comfort Collection filter
 * Shows only the products that match the selected category.
 */
function initializeProductFilter() {
    const filterButtons = document.querySelectorAll("[data-filter]");
    const productCards = document.querySelectorAll(".product-card");

    if (filterButtons.length === 0 || productCards.length === 0) {
        return;
    }

    filterButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const selectedCategory = button.dataset.filter;

            filterButtons.forEach((filterButton) => {
                filterButton.classList.remove("active-filter");
                filterButton.setAttribute("aria-pressed", "false");
            });

            button.classList.add("active-filter");
            button.setAttribute("aria-pressed", "true");

            productCards.forEach((card) => {
                const cardCategory = card.dataset.category;

                const shouldShow =
                    selectedCategory === "all" ||
                    cardCategory === selectedCategory;

                card.hidden = !shouldShow;
            });
        });
    });
}

/*
 * Interactive care package builder
 * Updates the selected products, item count, price,
 * and gift message preview.
 */
function initializeCarePackageBuilder() {
    const checkboxes = document.querySelectorAll(".care-option");
    const summary = document.querySelector("#care-summary");
    const itemCount = document.querySelector("#item-count");
    const total = document.querySelector("#care-total");
    const messageInput = document.querySelector("#gift-message");
    const messagePreview = document.querySelector("#message-preview");

    if (
        checkboxes.length === 0 ||
        !summary ||
        !itemCount ||
        !total ||
        !messageInput ||
        !messagePreview
    ) {
        return;
    }

    function updatePackage() {
        const selectedItems = Array.from(checkboxes).filter(
            (checkbox) => checkbox.checked
        );

        const selectedNames = selectedItems.map(
            (checkbox) => checkbox.value
        );

        const totalPrice = selectedItems.reduce(
            (sum, checkbox) => sum + Number(checkbox.dataset.price),
            0
        );

        if (selectedNames.length > 0) {
            summary.textContent = selectedNames.join(", ");
        } else {
            summary.textContent = "No items selected yet.";
        }

        itemCount.textContent = selectedNames.length;
        total.textContent = totalPrice.toFixed(2);
    }

    checkboxes.forEach((checkbox) => {
        checkbox.addEventListener("change", updatePackage);
    });

    messageInput.addEventListener("input", () => {
        const message = messageInput.value.trim();

        if (message) {
            messagePreview.textContent = message;
        } else {
            messagePreview.textContent =
                "Your personal gift message will appear here.";
        }
    });

    updatePackage();
}

/*
 * Shop hours status
 * Displays whether the shop is currently open based
 * on the visitor's local day and time.
 */
function initializeHoursStatus() {
    const status = document.querySelector("#shop-status");

    if (!status) {
        return;
    }

    const currentDate = new Date();
    const currentDay = currentDate.getDay();
    const currentHour = currentDate.getHours();

    const isWeekday =
        currentDay >= 1 &&
        currentDay <= 5 &&
        currentHour >= 10 &&
        currentHour < 18;

    const isSaturday =
        currentDay === 6 &&
        currentHour >= 10 &&
        currentHour < 16;

    const shopIsOpen = isWeekday || isSaturday;

    if (shopIsOpen) {
        status.textContent = "The shop is currently open.";
        status.classList.add("open-status");
    } else {
        status.textContent = "The shop is currently closed.";
        status.classList.add("closed-status");
    }
}