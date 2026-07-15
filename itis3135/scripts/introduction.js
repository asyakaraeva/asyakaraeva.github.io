"use strict";

const form = document.getElementById("introduction-form");
const formContainer = document.getElementById("form-container");
const resultContainer = document.getElementById("result-container");
const coursesContainer = document.getElementById("courses-container");
const addCourseButton = document.getElementById("add-course-button");
const clearButton = document.getElementById("clear-button");
const pictureInput = document.getElementById("picture");

const defaultImage = "images/asya-central-perk.jpg";

let uploadedImage = defaultImage;

function escapeHTML(value) {
    const temporaryElement = document.createElement("div");
    temporaryElement.textContent = value;
    return temporaryElement.innerHTML;
}

function formatDate(dateValue) {
    if (!dateValue) {
        return "";
    }

    const dateParts = dateValue.split("-");

    if (dateParts.length !== 3) {
        return dateValue;
    }

    return `${dateParts[1]}/${dateParts[2]}/${dateParts[0]}`;
}

function updateCourseHeadings() {
    const courseEntries = document.querySelectorAll(".course-entry");

    courseEntries.forEach((entry, index) => {
        const heading = entry.querySelector("h4");
        heading.textContent = `Course ${index + 1}`;
    });
}

function createCourseEntry() {
    const courseEntry = document.createElement("div");
    courseEntry.classList.add("course-entry");

    courseEntry.innerHTML = `
        <h4>Course</h4>

        <div class="form-row">
            <label>
                Department:
                <input
                    type="text"
                    class="course-department"
                    placeholder="Example: ITIS"
                    required
                >
            </label>
        </div>

        <div class="form-row">
            <label>
                Course Number:
                <input
                    type="text"
                    class="course-number"
                    placeholder="Example: 3135"
                    required
                >
            </label>
        </div>

        <div class="form-row">
            <label>
                Course Name:
                <input
                    type="text"
                    class="course-name"
                    placeholder="Enter the course name"
                    required
                >
            </label>
        </div>

        <div class="form-row">
            <label>
                Reason:
                <textarea
                    class="course-reason"
                    placeholder="Explain why you are taking this course"
                    required
                ></textarea>
            </label>
        </div>

        <button type="button" class="delete-course-button">
            Delete Course
        </button>
    `;

    coursesContainer.appendChild(courseEntry);
    updateCourseHeadings();
}

function deleteCourse(event) {
    if (!event.target.classList.contains("delete-course-button")) {
        return;
    }

    const courseEntries = document.querySelectorAll(".course-entry");

    if (courseEntries.length === 1) {
        window.alert("You must keep at least one course.");
        return;
    }

    event.target.closest(".course-entry").remove();
    updateCourseHeadings();
}

function readUploadedImage() {
    const file = pictureInput.files[0];

    if (!file) {
        uploadedImage = defaultImage;
        return;
    }

    const reader = new FileReader();

    reader.addEventListener("load", function () {
        uploadedImage = reader.result;
    });

    reader.readAsDataURL(file);
}

function getCoursesHTML() {
    const courseEntries = document.querySelectorAll(".course-entry");

    return Array.from(courseEntries)
        .map((entry) => {
            const department = escapeHTML(
                entry.querySelector(".course-department").value.trim()
            );

            const number = escapeHTML(
                entry.querySelector(".course-number").value.trim()
            );

            const name = escapeHTML(
                entry.querySelector(".course-name").value.trim()
            );

            const reason = escapeHTML(
                entry.querySelector(".course-reason").value.trim()
            );

            return `
                <li>
                    <strong>
                        ${department} ${number} – ${name}:
                    </strong>
                    ${reason}
                </li>
            `;
        })
        .join("");
}

function getLinksHTML() {
    const links = [
        {
            name: document.getElementById("link-one-name").value,
            url: document.getElementById("link-one-url").value
        },
        {
            name: document.getElementById("link-two-name").value,
            url: document.getElementById("link-two-url").value
        },
        {
            name: document.getElementById("link-three-name").value,
            url: document.getElementById("link-three-url").value
        },
        {
            name: document.getElementById("link-four-name").value,
            url: document.getElementById("link-four-url").value
        },
        {
            name: document.getElementById("link-five-name").value,
            url: document.getElementById("link-five-url").value
        }
    ];

    return links
        .map((link) => {
            const linkName = escapeHTML(link.name.trim());
            const linkURL = escapeHTML(link.url.trim());

            return `
                <a href="${linkURL}" target="_blank">
                    ${linkName}
                </a>
            `;
        })
        .join("");
}

function displayIntroduction() {
    const firstName = escapeHTML(
        document.getElementById("first-name").value.trim()
    );

    const middleName = escapeHTML(
        document.getElementById("middle-name").value.trim()
    );

    const nickname = escapeHTML(
        document.getElementById("nickname").value.trim()
    );

    const lastName = escapeHTML(
        document.getElementById("last-name").value.trim()
    );

    const mascotAdjective = escapeHTML(
        document.getElementById("mascot-adjective").value.trim()
    );

    const mascotAnimal = escapeHTML(
        document.getElementById("mascot-animal").value.trim()
    );

    const divider = escapeHTML(
        document.getElementById("divider").value.trim()
    );

    const acknowledgment = escapeHTML(
        document.getElementById("acknowledgment").value.trim()
    );

    const acknowledgmentInitials = escapeHTML(
        document.getElementById("acknowledgment-initials").value.trim()
    );

    const acknowledgmentDate = formatDate(
        document.getElementById("acknowledgment-date").value
    );

    const pictureCaption = escapeHTML(
        document.getElementById("picture-caption").value.trim()
    );

    const personalStatement = escapeHTML(
        document.getElementById("personal-statement").value.trim()
    );

    const personalBackground = escapeHTML(
        document.getElementById("personal-background").value.trim()
    );

    const professionalBackground = escapeHTML(
        document.getElementById("professional-background").value.trim()
    );

    const academicBackground = escapeHTML(
        document.getElementById("academic-background").value.trim()
    );

    const primaryComputer = escapeHTML(
        document.getElementById("primary-computer").value.trim()
    );

    const funnyThing = escapeHTML(
        document.getElementById("funny-thing").value.trim()
    );

    const shareItem = escapeHTML(
        document.getElementById("share-item").value.trim()
    );

    const quote = escapeHTML(
        document.getElementById("quote").value.trim()
    );

    const quoteAuthor = escapeHTML(
        document.getElementById("quote-author").value.trim()
    );

    const preferredName = nickname
        ? `${firstName} “${nickname}”`
        : firstName;

    const fullName = middleName
        ? `${preferredName} ${middleName} ${lastName}`
        : `${preferredName} ${lastName}`;

    const funnyThingHTML = funnyThing
        ? `
            <li>
                <strong>Funny or Interesting Item to Remember Me By:</strong>
                ${funnyThing}
            </li>
        `
        : "";

    const shareItemHTML = shareItem
        ? `
            <li>
                <strong>Something Else I’d Like to Share:</strong>
                ${shareItem}
            </li>
        `
        : "";

    resultContainer.innerHTML = `
        <h3 class="intro-name">
            ${fullName} ${divider}
            ${mascotAdjective} ${mascotAnimal}
        </h3>

        <figure>
            <img
                src="${uploadedImage}"
                alt="${fullName}"
                class="intro-image"
            >

            <figcaption>
                ${pictureCaption}
            </figcaption>
        </figure>

        <p class="acknowledgment">
            ${acknowledgment}
            — ${acknowledgmentInitials}, ${acknowledgmentDate}
        </p>

        <p>
            ${personalStatement}
        </p>

        <ul class="introduction-list">
            <li>
                <strong>Personal Background:</strong>
                ${personalBackground}
            </li>

            <li>
                <strong>Professional Background:</strong>
                ${professionalBackground}
            </li>

            <li>
                <strong>Academic Background:</strong>
                ${academicBackground}
            </li>

            <li>
                <strong>Primary Computer:</strong>
                ${primaryComputer}
            </li>

            <li>
                <strong>Courses I’m Taking and Why:</strong>

                <ul class="course-list">
                    ${getCoursesHTML()}
                </ul>
            </li>

            ${funnyThingHTML}
            ${shareItemHTML}

            <li class="no-bullet">
                <blockquote>
                    “${quote}”
                </blockquote>

                <cite>— ${quoteAuthor}</cite>
            </li>
        </ul>

        <nav
            class="profile-links"
            aria-label="${fullName}'s professional links"
        >
            ${getLinksHTML()}
        </nav>

        <div class="form-buttons result-buttons">
            <button type="button" id="start-over-button">
                Start Over
            </button>
        </div>
    `;

    formContainer.hidden = true;
    resultContainer.hidden = false;

    document
        .getElementById("start-over-button")
        .addEventListener("click", resetProgress);
}

function validateForm() {
    if (!form.checkValidity()) {
        form.reportValidity();
        return false;
    }

    return true;
}

function handleSubmit(event) {
    event.preventDefault();

    if (!validateForm()) {
        return;
    }

    displayIntroduction();
}

function resetProgress() {
    form.reset();
    uploadedImage = defaultImage;
    pictureInput.value = "";

    formContainer.hidden = false;
    resultContainer.hidden = true;
    resultContainer.innerHTML = "";

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

function clearForm() {
    const textFields = form.querySelectorAll(
        "input:not([type='file']), textarea"
    );

    textFields.forEach((field) => {
        field.value = "";
    });

    pictureInput.value = "";
    uploadedImage = defaultImage;
}

form.addEventListener("submit", handleSubmit);
form.addEventListener("reset", function () {
    uploadedImage = defaultImage;
    pictureInput.value = "";
});

pictureInput.addEventListener("change", readUploadedImage);
addCourseButton.addEventListener("click", createCourseEntry);
coursesContainer.addEventListener("click", deleteCourse);
clearButton.addEventListener("click", clearForm);

updateCourseHeadings();