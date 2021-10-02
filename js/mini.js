//
//
// UI Vars declaration :
//
//
saveBtn = document.querySelector("section.save div.round");
visitBtn = document.querySelector("section.visit div.round");
hiddenSection = document.querySelector("div.hidden");
mainSection = document.querySelector("main");
//
//
// Here inserting all events listener:
//
//
function allEventListener(){
    saveBtn.addEventListener('mouseover', saveFuncOpen);
    visitBtn.addEventListener('mouseover', visitFuncOpen);
    mainSection.addEventListener('mouseleave', saveFuncClose);
    hiddenSection.addEventListener('submit', saveToBookmarks);
}
//
//
// Loading the function allEventListener()
//
//
allEventListener();

//
//
// saveFuncOpen()
//
//
function saveFuncOpen(e){
    hiddenSection.style.display = "block";
    hiddenSection.innerHTML = `
    <form id="save-form">
        <section class="section-url">
            <h3>URL :</h3>
            <div class="mini-container">
                <input type="url" name="inputUrl" id="inputUrl" value="" placeholder="Ex: &quot;https://google.com&quot;" autocomplete="off" required>
                <aside></aside>
            </div>    
        </section>
        <section class="section-name">
            <h3>Name :</h3>
            <div class="mini-container">
                <input type="text" name="inputName" id="inputName" placeholder="Ex: &quot;Google&quot;" autocomplete="off" required>
                <aside></aside>
            </div>
        </section>
        <input id="saveBookmark-button" type="submit" value="Save Bookmark">
    </form>
    `;
    
    // console.log("yes !");
    e.preventDefault();
}
//
//
// visitFuncOpen()
//
//
function visitFuncOpen(e) {
    // Make div.hidden appears
    hiddenSection.style.display = "block";
    // Create table
    hiddenSection.innerHTML = `
    <form id="visit-form">
        <div class="header">
            <h3>Filter :</h3>
            <div id="group1">
                <input id="filterBox" type="text" value="" placeholder="Ex: &quot;Google&quot;">
                <aside></aside>
            </div>
        </div>
        <div class="body-table">
            <table class="table">
                <thead class="thead-light">
                    <tr>
                    <th scope="col" style="padding-right: 10px;">#</th>
                    <th scope="col">Bookmarks</th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
        </div>
    </form>
    `;

    let bookmarksList;
        if (localStorage.getItem("bookmarksList") === null) {
            return bookmarksList = [];
        } else {
            bookmarksList = JSON.parse(localStorage.getItem("bookmarksList"))
        }
    let counter = 1;
    for (let index = 0; index < bookmarksList.length; index++) {
        const arrayUnsplit = bookmarksList[index].split(", ");
        const arraySplit = arrayUnsplit[0].split(": ")[1];
        
        // Insert content to bookmarkElement
        const bookmarkElement = document.createElement("tr");
        bookmarkElement.innerHTML = `
        <th scope="row">${counter++}</th>
        <td>${arraySplit}<span><a href=${bookmarksList[index].split(", ")[1].split(": ")[1]} target="_blank" rel="noopener noreferrer">Visit</a></span></td>
        `;

        // Appending the bookmarkElement to the table
        const appending = document.querySelector("tbody");
        appending.append(bookmarkElement);

        // Stringify it back to the array
        localStorage.setItem("bookmarksList", JSON.stringify(bookmarksList));
    }

    const filterField = document.querySelector("#filterBox");
    filterField.addEventListener("keyup", function(e) {
        let text = e.target.value.toLowerCase();    

        hiddenSection.querySelectorAll("tbody td").forEach(function (item) {
            let eq = item.innerHTML.split("<span>")[0]; 
            if (eq.toLowerCase().includes(text)) {
                item.parentElement.style.display = "";
            } else {
                item.parentElement.style.display = "none"
            }
            // console.log(item);
            })
    })
}
//
//
// saveToBookmarks()
//
//
function saveToBookmarks(e) {
    let addFormName = document.querySelectorAll("div.mini-container input")[1];
    let addFormUrl = document.querySelectorAll("div.mini-container input")[0];
    // Store to local storage function
    function storeToLocalStorage(bookName, bookUrl) {
        let bookmarksList;
        if (localStorage.getItem("bookmarksList") === null) {
            bookmarksList = [];
        } else {
            bookmarksList = JSON.parse(localStorage.getItem("bookmarksList"));
        }
        // Add element to bookmarksList array
        bookmarksList.push(`name: ${bookName}, url: ${bookUrl}`);
        // Stringify it back to the array
        localStorage.setItem("bookmarksList", JSON.stringify(bookmarksList));
    }
    // Load the function
    storeToLocalStorage(addFormName.value, addFormUrl.value);
    // // Loader on Timeout function
    // setTimeout(function() {
    //     // Loading wheel
    //     let loadingWheel = document.getElementsByClassName("loader")[0];
    //     loadingWheel.style.cssText = `
    //         position = relative;
    //         display = block;
    //         right = 100px;
    //         top = 200px;
    //         border-radius: 50%;
    //         border-right: 4px solid yellow;
    //         border-left: 4px solid yellow;
    //         border-top: 4px solid #3498db;
    //         border-bottom: 4px solid #3498db;
    //         width: 20px;
    //         height: 20px;
    //         -webkit-animation: spin 2s linear infinite; /* Safari */
    //         animation: spin 2s linear infinite;
    //         z-index: 500;
    //     `;
    // }, 1500)
    hiddenSection.style.display = "none";

    
    e.preventDefault();
}
//
//
// saveFuncClose()
//
//
function saveFuncClose(e) {
    hiddenSection.style.display = "none";
    // console.log();
    e.preventDefault();
}