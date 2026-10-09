// ============================================
// GECC CAMPUS VOICE
// JAVASCRIPT
// ============================================


// ============================================
// DATA
// ============================================

let announcements =
    JSON.parse(
        localStorage.getItem("geccAnnouncements")
    ) || [

        {
            id: 1,
            category: "placement",
            title: "Campus Placement Drive",
            description:
                "A leading company will conduct campus recruitment. Eligible students can register.",
            date: "02 October 2026",
            time: "10:00 AM",
            likes: 12,
            liked: false,
            saved: false,
            comments: []
        },

        {
            id: 2,
            category: "event",
            title: "College Cultural Fest",
            description:
                "Join us for the annual college cultural fest with music, dance and exciting events.",
            date: "30 September 2026",
            time: "04:00 PM",
            likes: 8,
            liked: false,
            saved: false,
            comments: []
        },

        {
            id: 3,
            category: "academic",
            title: "Internal Assessment Schedule",
            description:
                "Internal assessments begin next Monday. Check your department timetable.",
            date: "28 September 2026",
            time: "10:30 AM",
            likes: 5,
            liked: false,
            saved: false,
            comments: []
        }

    ];


// ============================================
// ELEMENTS
// ============================================

const container =
    document.getElementById(
        "announcementContainer"
    );

const searchInput =
    document.getElementById(
        "searchInput"
    );

const categoryButtons =
    document.querySelectorAll(
        ".category-btn"
    );

const sortSelect =
    document.getElementById(
        "sortSelect"
    );

const noResults =
    document.getElementById(
        "noResults"
    );


// Form

const announcementForm =
    document.getElementById(
        "announcementForm"
    );

const newAnnouncementBtn =
    document.getElementById(
        "newAnnouncementBtn"
    );

const addAnnouncementBtn =
    document.getElementById(
        "addAnnouncementBtn"
    );

const cancelBtn =
    document.getElementById(
        "cancelBtn"
    );

const titleInput =
    document.getElementById(
        "titleInput"
    );

const categoryInput =
    document.getElementById(
        "categoryInput"
    );

const descriptionInput =
    document.getElementById(
        "descriptionInput"
    );


// Login

const loginBtn =
    document.getElementById(
        "loginBtn"
    );

const logoutBtn =
    document.getElementById(
        "logoutBtn"
    );

const loginModal =
    document.getElementById(
        "loginModal"
    );

const closeLoginBtn =
    document.getElementById(
        "closeLoginBtn"
    );

const studentLoginSubmit =
    document.getElementById(
        "studentLoginSubmit"
    );

const studentName =
    document.getElementById(
        "studentName"
    );

const studentEmail =
    document.getElementById(
        "studentEmail"
    );

const userStatus =
    document.getElementById(
        "userStatus"
    );


// ============================================
// CURRENT CATEGORY
// ============================================

let currentCategory = "all";


// ============================================
// SAVE DATA
// ============================================

function saveAnnouncements() {

    localStorage.setItem(
        "geccAnnouncements",
        JSON.stringify(
            announcements
        )
    );

}


// ============================================
// DISPLAY ANNOUNCEMENTS
// ============================================

function displayAnnouncements() {

    container.innerHTML = "";


    const searchText =
        searchInput.value
            .toLowerCase()
            .trim();


    let filtered =
        announcements.filter(
            function(item) {

                const categoryMatch =
                    currentCategory === "all" ||
                    item.category === currentCategory;


                const searchMatch =
                    item.title
                        .toLowerCase()
                        .includes(searchText)

                    ||

                    item.description
                        .toLowerCase()
                        .includes(searchText);


                return (
                    categoryMatch &&
                    searchMatch
                );

            }
        );


    // SORT

    if (
        sortSelect.value ===
        "newest"
    ) {

        filtered.sort(
            (a, b) =>
                b.id - a.id
        );

    }


    if (
        sortSelect.value ===
        "oldest"
    ) {

        filtered.sort(
            (a, b) =>
                a.id - b.id
        );

    }


    if (
        sortSelect.value ===
        "likes"
    ) {

        filtered.sort(
            (a, b) =>
                b.likes - a.likes
        );

    }


    // NO RESULTS

    if (
        filtered.length === 0
    ) {

        noResults.style.display =
            "block";

        return;

    }


    noResults.style.display =
        "none";


    // CREATE CARDS

    filtered.forEach(
        function(item) {

            const card =
                document.createElement(
                    "article"
                );

            card.className =
                "announcement-card";


            card.innerHTML = `

                <span class="category">
                    ${item.category.toUpperCase()}
                </span>

                <h3>
                    ${item.title}
                </h3>

                <p>
                    ${item.description}
                </p>

                <div class="date-time">
                    📅 ${item.date}
                    &nbsp;•&nbsp;
                    ${item.time}
                </div>


                <div class="card-actions">

                    <button
                        class="card-action ${
                            item.liked
                            ? "liked"
                            : ""
                        }"
                        onclick="likeAnnouncement(${item.id})">

                        ❤️
                        <span>
                            ${item.likes}
                        </span>

                    </button>


                    <button
                        class="card-action ${
                            item.saved
                            ? "saved"
                            : ""
                        }"
                        onclick="saveAnnouncement(${item.id})">

                        🔖
                        <span>
                            ${
                                item.saved
                                ? "Saved"
                                : "Save"
                            }
                        </span>

                    </button>


                    <button
                        class="card-action"
                        onclick="addComment(${item.id})">

                        💬
                        <span>
                            ${item.comments.length}
                        </span>

                    </button>


                    <button
                        class="card-action delete-btn"
                        onclick="deleteAnnouncement(${item.id})">

                        🗑️
                        <span>
                            Delete
                        </span>

                    </button>

                </div>


                <div class="comments">

                    ${
                        item.comments
                            .map(
                                comment =>
                                    `<p class="comment">
                                        💬 ${comment}
                                    </p>`
                            )
                            .join("")
                    }

                </div>

            `;


            container.appendChild(
                card
            );

        }
    );

}


// ============================================
// SEARCH
// ============================================

searchInput.addEventListener(
    "input",
    displayAnnouncements
);


// ============================================
// FILTER
// ============================================

categoryButtons.forEach(
    function(button) {

        button.addEventListener(
            "click",
            function() {

                categoryButtons.forEach(
                    function(btn) {

                        btn.classList.remove(
                            "active"
                        );

                    }
                );


                button.classList.add(
                    "active"
                );


                currentCategory =
                    button.dataset.category;


                displayAnnouncements();

            }
        );

    }
);


// ============================================
// SORT
// ============================================

sortSelect.addEventListener(
    "change",
    displayAnnouncements
);


// ============================================
// NEW ANNOUNCEMENT
// ============================================

newAnnouncementBtn.addEventListener(
    "click",
    function() {

        announcementForm.classList.remove(
            "hidden"
        );

        titleInput.focus();

    }
);


// ============================================
// CANCEL
// ============================================

cancelBtn.addEventListener(
    "click",
    function() {

        announcementForm.classList.add(
            "hidden"
        );

        clearForm();

    }
);


// ============================================
// ADD ANNOUNCEMENT
// ============================================

addAnnouncementBtn.addEventListener(
    "click",
    function() {

        const title =
            titleInput.value.trim();

        const category =
            categoryInput.value;

        const description =
            descriptionInput.value.trim();


        if (
            title === "" ||
            description === ""
        ) {

            alert(
                "Please enter all announcement details."
            );

            return;

        }


        const now =
            new Date();


        const date =
            now.toLocaleDateString(
                "en-IN",
                {
                    day: "2-digit",
                    month: "long",
                    year: "numeric"
                }
            );


        const time =
            now.toLocaleTimeString(
                "en-IN",
                {
                    hour: "2-digit",
                    minute: "2-digit"
                }
            );


        announcements.unshift({

            id: Date.now(),

            category: category,

            title: title,

            description: description,

            date: date,

            time: time,

            likes: 0,

            liked: false,

            saved: false,

            comments: []

        });


        saveAnnouncements();


        clearForm();


        announcementForm.classList.add(
            "hidden"
        );


        currentCategory =
            "all";


        categoryButtons.forEach(
            function(btn) {

                btn.classList.remove(
                    "active"
                );

                if (
                    btn.dataset.category ===
                    "all"
                ) {

                    btn.classList.add(
                        "active"
                    );

                }

            }
        );


        displayAnnouncements();


        alert(
            "Announcement published successfully!"
        );

    }
);


// ============================================
// CLEAR FORM
// ============================================

function clearForm() {

    titleInput.value = "";

    descriptionInput.value = "";

    categoryInput.value =
        "academic";

}


// ============================================
// LIKE
// ============================================

function likeAnnouncement(id) {

    const item =
        announcements.find(
            a => a.id === id
        );


    if (!item) return;


    if (item.liked) {

        item.likes--;

        item.liked = false;

    } else {

        item.likes++;

        item.liked = true;

    }


    saveAnnouncements();

    displayAnnouncements();

}


// ============================================
// SAVE
// ============================================

function saveAnnouncement(id) {

    const item =
        announcements.find(
            a => a.id === id
        );


    if (!item) return;


    item.saved =
        !item.saved;


    saveAnnouncements();

    displayAnnouncements();

}


// ============================================
// COMMENT
// ============================================

function addComment(id) {

    const comment =
        prompt(
            "Enter your comment:"
        );


    if (
        comment === null ||
        comment.trim() === ""
    ) {

        return;

    }


    const item =
        announcements.find(
            a => a.id === id
        );


    if (!item) return;


    item.comments.push(
        comment.trim()
    );


    saveAnnouncements();

    displayAnnouncements();

}


// ============================================
// DELETE
// ============================================

function deleteAnnouncement(id) {

    const confirmDelete =
        confirm(
            "Delete this announcement?"
        );


    if (!confirmDelete) {

        return;

    }


    announcements =
        announcements.filter(
            item =>
                item.id !== id
        );


    saveAnnouncements();

    displayAnnouncements();

}


// ============================================
// LOGIN
// ============================================

loginBtn.addEventListener(
    "click",
    function() {

        loginModal.classList.remove(
            "hidden"
        );

        studentName.focus();

    }
);


// ============================================
// CLOSE LOGIN
// ============================================

closeLoginBtn.addEventListener(
    "click",
    function() {

        loginModal.classList.add(
            "hidden"
        );

    }
);


// Close when clicking outside

loginModal.addEventListener(
    "click",
    function(event) {

        if (
            event.target ===
            loginModal
        ) {

            loginModal.classList.add(
                "hidden"
            );

        }

    }
);


// ============================================
// LOGIN SUBMIT
// ============================================

studentLoginSubmit.addEventListener(
    "click",
    function() {

        const name =
            studentName.value.trim();

        const email =
            studentEmail.value.trim();


        if (
            name === "" ||
            email === ""
        ) {

            alert(
                "Please enter your name and email."
            );

            return;

        }


        localStorage.setItem(
            "geccUser",
            JSON.stringify({
                name: name,
                email: email
            })
        );


        studentName.value = "";

        studentEmail.value = "";


        loginModal.classList.add(
            "hidden"
        );


        updateLoginStatus();

    }
);


// ============================================
// LOGOUT
// ============================================

logoutBtn.addEventListener(
    "click",
    function() {

        localStorage.removeItem(
            "geccUser"
        );


        updateLoginStatus();

    }
);


// ============================================
// UPDATE LOGIN STATUS
// ============================================

function updateLoginStatus() {

    const user =
        JSON.parse(
            localStorage.getItem(
                "geccUser"
            )
        );


    if (user) {

        userStatus.textContent =
            "Welcome, " + user.name;

        loginBtn.classList.add(
            "hidden"
        );

        logoutBtn.classList.remove(
            "hidden"
        );

    } else {

        userStatus.textContent =
            "Not logged in";

        loginBtn.classList.remove(
            "hidden"
        );

        logoutBtn.classList.add(
            "hidden"
        );

    }

}


// ============================================
// START APPLICATION
// ============================================

updateLoginStatus();

displayAnnouncements();