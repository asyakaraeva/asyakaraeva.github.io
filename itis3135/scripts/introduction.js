"use strict";

const form = document.getElementById("introduction-form");
const formContainer = document.getElementById("form-container");
const resultContainer = document.getElementById("result-container");
const coursesContainer = document.getElementById("courses-container");
const addCourseButton = document.getElementById("add-course-button");
const clearButton = document.getElementById("clear-button");
const pictureInput = document.getElementById("picture");

const generateHtmlButton = document.getElementById(
    "generate-html-button"
);

const generateJsonButton = document.getElementById(
    "generate-json-button"
);

const generateXmlButton = document.getElementById(
    "generate-xml-button"
);

const generatedCodeSection = document.getElementById(
    "generated-code-section"
);

const generatedCodeHeading = document.getElementById(
    "generated-code-heading"
);

const generatedCode = document.getElementById("generated-code");

const defaultImage = "images/asya-central-perk.jpg";

let uploadedImage = defaultImage;
let uploadedImageName = "asya-central-perk.jpg";

/**
 * Escapes text before placing it inside generated HTML.
 *
 * @param {string} value Text to escape.
 * @returns {string} Escaped HTML text.
 */
function escapeHTML(value) {
    const temporaryElement = document.createElement("div");
    temporaryElement.textContent = String(value);
    return temporaryElement.innerHTML;
}

/**
 * Escapes text before placing it inside generated XML.
 *
 * @param {string} value Text to escape.
 * @returns {string} Escaped XML text.
 */
function escapeXML(value) {
    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&apos;");
}

/**
 * Changes a YYYY-MM-DD date to MM/DD/YYYY.
 *
 * @param {string} dateValue Date from an HTML date input.
 * @returns {string} Formatted date.
 */
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

/**
 * Updates the visible course numbers.
 */
function updateCourseHeadings() {
    const courseEntries = document.querySelectorAll(".course-entry");

    courseEntries.forEach((entry, index) => {
        const heading = entry.querySelector("h4");

        if (heading) {
            heading.classList.add("course-title");
            heading.textContent = `Course ${index + 1}`;
        }
    });
}

/**
 * Creates and adds a new blank course section.
 */
function createCourseEntry() {
    const courseEntry = document.createElement("div");
    courseEntry.classList.add("course-entry");

    courseEntry.innerHTML = `
        <h4 class="course-title">Course</h4>

        <div class="form-row">
            <label>
                Department:
                <input
                    type="text"
                    class="course-department"
                    name="courseDepartment[]"
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
                    name="courseNumber[]"
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
                    name="courseName[]"
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
                    name="courseReason[]"
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

/**
 * Deletes a course when its Delete Course button is clicked.
 *
 * @param {MouseEvent} event Course-container click event.
 */
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

/**
 * Reads the selected image so it can be displayed on the page.
 */
function readUploadedImage() {
    const file = pictureInput.files[0];

    if (!file) {
        uploadedImage = defaultImage;
        uploadedImageName = "asya-central-perk.jpg";
        return;
    }

    uploadedImageName = file.name;

    const reader = new FileReader();

    reader.addEventListener("load", function () {
        uploadedImage = reader.result;
    });

    reader.readAsDataURL(file);
}

/**
 * Collects the current course values.
 *
 * @returns {Array<object>} Course data.
 */
function getCoursesData() {
    const courseEntries = document.querySelectorAll(".course-entry");

    return Array.from(courseEntries).map((entry) => {
        return {
            department: entry
                .querySelector(".course-department")
                .value
                .trim(),

            number: entry
                .querySelector(".course-number")
                .value
                .trim(),

            name: entry
                .querySelector(".course-name")
                .value
                .trim(),

            reason: entry
                .querySelector(".course-reason")
                .value
                .trim()
        };
    });
}

/**
 * Collects the current professional-link values.
 *
 * @returns {Array<object>} Link data.
 */
function getLinksData() {
    return [
        {
            name: document.getElementById("link-one-name").value.trim(),
            url: document.getElementById("link-one-url").value.trim()
        },
        {
            name: document.getElementById("link-two-name").value.trim(),
            url: document.getElementById("link-two-url").value.trim()
        },
        {
            name: document.getElementById("link-three-name").value.trim(),
            url: document.getElementById("link-three-url").value.trim()
        },
        {
            name: document.getElementById("link-four-name").value.trim(),
            url: document.getElementById("link-four-url").value.trim()
        },
        {
            name: document.getElementById("link-five-name").value.trim(),
            url: document.getElementById("link-five-url").value.trim()
        }
    ];
}

/**
 * Collects all current form values.
 *
 * @returns {object} Introduction-form data.
 */
function getFormData() {
    return {
        firstName: document
            .getElementById("first-name")
            .value
            .trim(),

        middleName: document
            .getElementById("middle-name")
            .value
            .trim(),

        nickname: document
            .getElementById("nickname")
            .value
            .trim(),

        lastName: document
            .getElementById("last-name")
            .value
            .trim(),

        mascotAdjective: document
            .getElementById("mascot-adjective")
            .value
            .trim(),

        mascotAnimal: document
            .getElementById("mascot-animal")
            .value
            .trim(),

        divider: document
            .getElementById("divider")
            .value
            .trim(),

        acknowledgment: document
            .getElementById("acknowledgment")
            .value
            .trim(),

        acknowledgmentInitials: document
            .getElementById("acknowledgment-initials")
            .value
            .trim(),

        acknowledgmentDate: document
            .getElementById("acknowledgment-date")
            .value,

        picture: uploadedImageName,

        pictureCaption: document
            .getElementById("picture-caption")
            .value
            .trim(),

        personalStatement: document
            .getElementById("personal-statement")
            .value
            .trim(),

        personalBackground: document
            .getElementById("personal-background")
            .value
            .trim(),

        professionalBackground: document
            .getElementById("professional-background")
            .value
            .trim(),

        academicBackground: document
            .getElementById("academic-background")
            .value
            .trim(),

        primaryComputer: document
            .getElementById("primary-computer")
            .value
            .trim(),

        funnyThing: document
            .getElementById("funny-thing")
            .value
            .trim(),

        shareItem: document
            .getElementById("share-item")
            .value
            .trim(),

        courses: getCoursesData(),

        quote: document
            .getElementById("quote")
            .value
            .trim(),

        quoteAuthor: document
            .getElementById("quote-author")
            .value
            .trim(),

        links: getLinksData()
    };
}

/**
 * Creates the complete display name.
 *
 * @param {object} data Current form data.
 * @returns {string} Full name.
 */
function getFullName(data) {
    const nameParts = [data.firstName];

    if (data.nickname) {
        nameParts.push(`“${data.nickname}”`);
    }

    if (data.middleName) {
        nameParts.push(data.middleName);
    }

    nameParts.push(data.lastName);

    return nameParts.join(" ");
}

/**
 * Creates course-list HTML for the visible introduction.
 *
 * @param {Array<object>} courses Course data.
 * @returns {string} Course-list HTML.
 */
function getCoursesHTML(courses) {
    return courses
        .map((course) => {
            return `
                <li>
                    <strong>
                        ${escapeHTML(course.department)}
                        ${escapeHTML(course.number)}
                        – ${escapeHTML(course.name)}:
                    </strong>

                    ${escapeHTML(course.reason)}
                </li>
            `;
        })
        .join("");
}

/**
 * Creates link HTML for the visible introduction.
 *
 * @param {Array<object>} links Link data.
 * @returns {string} Link HTML.
 */
function getLinksHTML(links) {
    return links
        .map((link) => {
            return `
                <a
                    href="${escapeHTML(link.url)}"
                    target="_blank"
                    rel="noopener"
                >
                    ${escapeHTML(link.name)}
                </a>
            `;
        })
        .join("");
}

/**
 * Checks whether the form is valid.
 *
 * @returns {boolean} True when valid.
 */
function validateForm() {
    if (!form.checkValidity()) {
        form.reportValidity();
        return false;
    }

    return true;
}

/**
 * Displays the submitted introduction page.
 */
function displayIntroduction() {
    const data = getFormData();
    const fullName = escapeHTML(getFullName(data));

    const funnyThingHTML = data.funnyThing
        ? `
            <li>
                <strong>
                    Funny or Interesting Item to Remember Me By:
                </strong>

                ${escapeHTML(data.funnyThing)}
            </li>
        `
        : "";

    const shareItemHTML = data.shareItem
        ? `
            <li>
                <strong>Something Else I’d Like to Share:</strong>
                ${escapeHTML(data.shareItem)}
            </li>
        `
        : "";

    resultContainer.innerHTML = `
        <h3 class="intro-name">
            ${fullName}
            ${escapeHTML(data.divider)}
            ${escapeHTML(data.mascotAdjective)}
            ${escapeHTML(data.mascotAnimal)}
        </h3>

        <figure>
            <img
                src="${uploadedImage}"
                alt="${fullName}"
                class="intro-image"
            >

            <figcaption>
                ${escapeHTML(data.pictureCaption)}
            </figcaption>
        </figure>

        <p class="acknowledgment">
            ${escapeHTML(data.acknowledgment)}
            —
            ${escapeHTML(data.acknowledgmentInitials)},
            ${escapeHTML(formatDate(data.acknowledgmentDate))}
        </p>

        <p>
            ${escapeHTML(data.personalStatement)}
        </p>

        <ul class="introduction-list">
            <li>
                <strong>Personal Background:</strong>
                ${escapeHTML(data.personalBackground)}
            </li>

            <li>
                <strong>Professional Background:</strong>
                ${escapeHTML(data.professionalBackground)}
            </li>

            <li>
                <strong>Academic Background:</strong>
                ${escapeHTML(data.academicBackground)}
            </li>

            <li>
                <strong>Primary Computer:</strong>
                ${escapeHTML(data.primaryComputer)}
            </li>

            <li>
                <strong>Courses I’m Taking and Why:</strong>

                <ul class="course-list">
                    ${getCoursesHTML(data.courses)}
                </ul>
            </li>

            ${funnyThingHTML}
            ${shareItemHTML}

            <li class="no-bullet">
                <blockquote>
                    “${escapeHTML(data.quote)}”
                </blockquote>

                <cite>
                    — ${escapeHTML(data.quoteAuthor)}
                </cite>
            </li>
        </ul>

        <nav
            class="profile-links"
            aria-label="${fullName}'s professional links"
        >
            ${getLinksHTML(data.links)}
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

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

/**
 * Handles normal form submission.
 *
 * @param {SubmitEvent} event Form-submission event.
 */
function handleSubmit(event) {
    event.preventDefault();

    if (!validateForm()) {
        return;
    }

    displayIntroduction();
}

/**
 * Restores the original form and values.
 */
function resetProgress() {
    form.reset();

    uploadedImage = defaultImage;
    uploadedImageName = "asya-central-perk.jpg";
    pictureInput.value = "";

    formContainer.hidden = false;
    resultContainer.hidden = true;
    resultContainer.innerHTML = "";

    generatedCodeSection.hidden = true;
    generatedCode.value = "";

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

/**
 * Clears the form values.
 */
function clearForm() {
    const textFields = form.querySelectorAll(
        "input:not([type='file']):not([type='submit']):not([type='reset']), " +
        "textarea"
    );

    textFields.forEach((field) => {
        field.value = "";
    });

    pictureInput.value = "";
    uploadedImage = defaultImage;
    uploadedImageName = "asya-central-perk.jpg";

    generatedCodeSection.hidden = true;
    generatedCode.value = "";
}

/**
 * Displays generated source code in the output textarea.
 *
 * @param {string} format Generated format.
 * @param {string} code Generated source code.
 */
function showGeneratedCode(format, code) {
    generatedCodeHeading.textContent = `Generated ${format}`;
    generatedCode.value = code;
    generatedCodeSection.hidden = false;

    generatedCodeSection.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

    generatedCode.focus();
    generatedCode.select();
}

/**
 * Generates raw introduction HTML.
 *
 * @param {object} data Current form data.
 * @returns {string} Generated HTML.
 */
function generateHTMLCode(data) {
    const fullName = escapeHTML(getFullName(data));

    const funnyThingHTML = data.funnyThing
        ? `
        <li>
            <strong>Funny or Interesting Item:</strong>
            ${escapeHTML(data.funnyThing)}
        </li>`
        : "";

    const shareItemHTML = data.shareItem
        ? `
        <li>
            <strong>Something Else I’d Like to Share:</strong>
            ${escapeHTML(data.shareItem)}
        </li>`
        : "";

    const coursesHTML = data.courses
        .map((course) => {
            return `            <li>
                <strong>
                    ${escapeHTML(course.department)}
                    ${escapeHTML(course.number)}
                    – ${escapeHTML(course.name)}:
                </strong>
                ${escapeHTML(course.reason)}
            </li>`;
        })
        .join("\n");

    const linksHTML = data.links
        .map((link) => {
            return `        <a href="${escapeHTML(link.url)}">
            ${escapeHTML(link.name)}
        </a>`;
        })
        .join("\n");

    return `<section>
    <h2>Introduction</h2>

    <h3>
        ${fullName}
        ${escapeHTML(data.divider)}
        ${escapeHTML(data.mascotAdjective)}
        ${escapeHTML(data.mascotAnimal)}
    </h3>

    <figure>
        <img
            src="images/${escapeHTML(data.picture)}"
            alt="${fullName}">
        <figcaption>
            ${escapeHTML(data.pictureCaption)}
        </figcaption>
    </figure>

    <p class="acknowledgment">
        ${escapeHTML(data.acknowledgment)}
        —
        ${escapeHTML(data.acknowledgmentInitials)},
        ${escapeHTML(formatDate(data.acknowledgmentDate))}
    </p>

    <p>${escapeHTML(data.personalStatement)}</p>

    <ul>
        <li>
            <strong>Personal Background:</strong>
            ${escapeHTML(data.personalBackground)}
        </li>

        <li>
            <strong>Professional Background:</strong>
            ${escapeHTML(data.professionalBackground)}
        </li>

        <li>
            <strong>Academic Background:</strong>
            ${escapeHTML(data.academicBackground)}
        </li>

        <li>
            <strong>Primary Computer:</strong>
            ${escapeHTML(data.primaryComputer)}
        </li>

        <li>
            <strong>Courses I’m Taking and Why:</strong>

            <ul>
${coursesHTML}
            </ul>
        </li>
${funnyThingHTML}
${shareItemHTML}
    </ul>

    <blockquote>
        “${escapeHTML(data.quote)}”
    </blockquote>

    <cite>
        — ${escapeHTML(data.quoteAuthor)}
    </cite>

    <nav aria-label="${fullName}'s professional links">
${linksHTML}
    </nav>
</section>`;
}

/**
 * Generates raw introduction XML.
 *
 * @param {object} data Current form data.
 * @returns {string} Generated XML.
 */
function generateXMLCode(data) {
    const coursesXML = data.courses
        .map((course) => {
            return `        <course>
            <department>${escapeXML(course.department)}</department>
            <number>${escapeXML(course.number)}</number>
            <name>${escapeXML(course.name)}</name>
            <reason>${escapeXML(course.reason)}</reason>
        </course>`;
        })
        .join("\n");

    const linksXML = data.links
        .map((link) => {
            return `        <link>
            <name>${escapeXML(link.name)}</name>
            <url>${escapeXML(link.url)}</url>
        </link>`;
        })
        .join("\n");

    return `<?xml version="1.0" encoding="UTF-8"?>
<introduction>
    <name>
        <firstName>${escapeXML(data.firstName)}</firstName>
        <middleName>${escapeXML(data.middleName)}</middleName>
        <nickname>${escapeXML(data.nickname)}</nickname>
        <lastName>${escapeXML(data.lastName)}</lastName>
    </name>

    <mascot>
        <adjective>${escapeXML(data.mascotAdjective)}</adjective>
        <animal>${escapeXML(data.mascotAnimal)}</animal>
        <divider>${escapeXML(data.divider)}</divider>
    </mascot>

    <acknowledgment>
        <statement>${escapeXML(data.acknowledgment)}</statement>
        <initials>${escapeXML(data.acknowledgmentInitials)}</initials>
        <date>${escapeXML(data.acknowledgmentDate)}</date>
    </acknowledgment>

    <picture>
        <file>${escapeXML(data.picture)}</file>
        <caption>${escapeXML(data.pictureCaption)}</caption>
    </picture>

    <backgroundInformation>
        <personalStatement>${escapeXML(data.personalStatement)}</personalStatement>
        <personalBackground>${escapeXML(data.personalBackground)}</personalBackground>
        <professionalBackground>${escapeXML(data.professionalBackground)}</professionalBackground>
        <academicBackground>${escapeXML(data.academicBackground)}</academicBackground>
        <primaryComputer>${escapeXML(data.primaryComputer)}</primaryComputer>
        <funnyThing>${escapeXML(data.funnyThing)}</funnyThing>
        <shareItem>${escapeXML(data.shareItem)}</shareItem>
    </backgroundInformation>

    <courses>
${coursesXML}
    </courses>

    <quote>
        <text>${escapeXML(data.quote)}</text>
        <author>${escapeXML(data.quoteAuthor)}</author>
    </quote>

    <links>
${linksXML}
    </links>
</introduction>`;
}

/**
 * Generates and displays the current HTML source.
 */
function handleGenerateHTML() {
    if (!validateForm()) {
        return;
    }

    const data = getFormData();
    const htmlCode = generateHTMLCode(data);

    showGeneratedCode("HTML", htmlCode);
}

/**
 * Generates and displays the current JSON source.
 */
function handleGenerateJSON() {
    if (!validateForm()) {
        return;
    }

    const data = getFormData();
    const jsonCode = JSON.stringify(data, null, 4);

    showGeneratedCode("JSON", jsonCode);
}

/**
 * Generates and displays the current XML source.
 */
function handleGenerateXML() {
    if (!validateForm()) {
        return;
    }

    const data = getFormData();
    const xmlCode = generateXMLCode(data);

    showGeneratedCode("XML", xmlCode);
}

form.addEventListener("submit", handleSubmit);

form.addEventListener("reset", function () {
    uploadedImage = defaultImage;
    uploadedImageName = "asya-central-perk.jpg";
    pictureInput.value = "";

    generatedCodeSection.hidden = true;
    generatedCode.value = "";
});

pictureInput.addEventListener("change", readUploadedImage);

addCourseButton.addEventListener("click", createCourseEntry);

coursesContainer.addEventListener("click", deleteCourse);

clearButton.addEventListener("click", clearForm);

generateHtmlButton.addEventListener(
    "click",
    handleGenerateHTML
);

generateJsonButton.addEventListener(
    "click",
    handleGenerateJSON
);

generateXmlButton.addEventListener(
    "click",
    handleGenerateXML
);

updateCourseHeadings();