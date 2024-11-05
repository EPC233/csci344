// Part 1: Set up the helper functions:
// 1. Implement two filter functions (which should return either true or false):
//      * filterClassFull: to filter out the closed courses (if applicable)
//      * filterTermMatched: to only match courses relevant to the search term
// 2. Implement the dataToHTML function, which takes a course object as an
//    argument and returns an HTML string that represents the course.

// Part 2: Within the showData function, use the array's filter, map, join
//         methods, and any relevant DOM methods, to build the interface.
// 1. Use the array's built in "filter" method, which takes a filter
//    function as an argument and returns an array of objects that
//    match the criteria.
//          * Note that you can chain filter functions together.
// 2. Use the array's built in "map" method to generate an array of
//    HTML strings.
// 3. Join the array of strings on the empty string or new line character
//    to create one large HTML string.
// 4. Clear out the existing courses in the DOM and insert
//    the HTML string into the DOM.

const search = (ev) => {
    ev.preventDefault(); // overrides default button action

    // Get user's preferences:
    const searchTerm = document.querySelector("#search_term").value;
    const openOnly = document.querySelector("#is_open").checked;

    // Pass the user's preferences into the showData function
    showData(searchTerm, openOnly);
};

// Part 1.1a
const filterClassFull = (course) => {
    return course.EnrollmentCurrent < course.EnrollmentMax;
};

// Part 1.1b
const filterTermMatched = (course) => {
    const term = searchTerm.toLowerCase();
    return (
        course.Title.toLowerCase().includes(term) ||
        course.Department.toLowerCase().includes(term) ||
        course.Code.toLowerCase().includes(term)
    );
};

// Part 1.2
const dataToHTML = (course) => {
    const isOpen = course.EnrollmentCurrent < course.EnrollmentMax;
    const openStatusIcon = isOpen ? "fa-circle-check" : "fa-circle-xmark";
    const openStatusText = isOpen ? "Open" : "Closed";
    const seatsAvailable = isOpen ? `Seats Available: ${course.EnrollmentMax - course.EnrollmentCurrent}` : `Number on Waitlist: ${course.WaitlistAvailable}`;
    
    return `
        <section class="course">
            <h2>${course.Code}: ${course.Title}</h2>
            <p>
                <i class="fa-solid ${openStatusIcon}"></i> 
                ${openStatusText} &bull; ${course.CRN} &bull; ${seatsAvailable}
            </p>
            <p>
                ${course.Days} &bull; ${course.Location.Building} ${course.Location.Room} &bull; ${course.Hours} credit hour(s)
            </p>
            <p><strong>${course.Instructors[0].Name}</strong></p>
        </section>
    `;
};

// Part 2
const showData = (searchTerm, openOnly) => {
    console.log(searchTerm, openOnly);
    console.log(data); // imported from course-data.js
    // Your code here:
    // Step 1
    let filteredData = data;

    if (openOnly)
        filteredData = filteredData.filter(filterClassFull);

    if (searchTerm)
        filteredData = filteredData.filter((course) => filterTermMatched(course, searchTerm));

    // Step 2
    const htmlArray = filteredData.map(dataToHTML);

    // Step 3
    const htmlString = htmlArray.join("");

    // Step 4
    const courseContainer = document.querySelector("#courseContainer");
    courseContainer.innerHTML = htmlString;
};