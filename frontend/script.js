const API_URL = "http://localhost:8080/api/books";

const bookForm = document.getElementById("bookForm");
const editForm = document.getElementById("editForm");
const booksContainer = document.getElementById("booksContainer");
const message = document.getElementById("message");

const editModal = document.getElementById("editModal");
const deleteModal = document.getElementById("deleteModal");

const token = sessionStorage.getItem("jwtToken");

if (!token) {
    window.location.href = "login.html";
}

const authHeader = "Bearer " + token;

let bookToDelete = null;

loadBooks();


async function loadBooks() {

    try {

        message.textContent = "Loading books...";

        const response = await fetch(API_URL, {
            method: "GET",
            headers: {
                "Authorization": authHeader
            }
        });

        if (response.status === 401) {
            logout();
            return;
        }

        if (!response.ok) {
            throw new Error("Failed to load books");
        }

        const books = await response.json();

        displayBooks(books);

        message.textContent = "";

    } catch (error) {

        message.textContent = "Unable to load books.";
        console.error(error);

    }
}


function displayBooks(books) {

    booksContainer.innerHTML = "";

    if (books.length === 0) {

        booksContainer.innerHTML = `
            <div class="empty-message">
                <p>📚 No books available.</p>
            </div>
        `;

        return;
    }

    books.forEach(book => {

        const bookCard = document.createElement("div");

        bookCard.className = "book-card";

        bookCard.innerHTML = `
            <div class="book-info">

                <h3>📖 ${escapeHtml(book.title)}</h3>

                <p>
                    <strong>Author:</strong>
                    ${escapeHtml(book.author)}
                </p>

                <p>
                    <strong>Price:</strong>
                    ₹${Number(book.price).toFixed(2)}
                </p>

            </div>

            <div class="book-actions">

                <button
                    class="edit-btn"
                    onclick="openEditModal(${book.id}, '${escapeJs(book.title)}', '${escapeJs(book.author)}', ${book.price})">
                    Edit
                </button>

                <button
                    class="delete-btn"
                    onclick="openDeleteModal(${book.id})">
                    Delete
                </button>

            </div>
        `;

        booksContainer.appendChild(bookCard);

    });
}


/* ADD BOOK */

bookForm.addEventListener("submit", async function(event) {

    event.preventDefault();

    const title = document.getElementById("title").value.trim();
    const author = document.getElementById("author").value.trim();
    const price = Number(document.getElementById("price").value);

    const book = {
        title: title,
        author: author,
        price: price
    };

    try {

        const response = await fetch(API_URL, {

            method: "POST",

            headers: {
                "Content-Type": "application/json",
                "Authorization": authHeader
            },

            body: JSON.stringify(book)

        });

        if (response.status === 401) {
            logout();
            return;
        }

        if (!response.ok) {
            throw new Error("Failed to add book");
        }

        bookForm.reset();

        await loadBooks();

        alert("Book added successfully!");

    } catch (error) {

        alert("Failed to add book.");
        console.error(error);

    }

});


/* OPEN EDIT MODAL */

function openEditModal(id, title, author, price) {

    document.getElementById("editId").value = id;
    document.getElementById("editTitle").value = title;
    document.getElementById("editAuthor").value = author;
    document.getElementById("editPrice").value = price;

    editModal.style.display = "flex";
}


/* CLOSE EDIT MODAL */

function closeEditModal() {

    editModal.style.display = "none";

}


/* UPDATE BOOK */

editForm.addEventListener("submit", async function(event) {

    event.preventDefault();

    const id = document.getElementById("editId").value;

    const updatedBook = {

        title: document.getElementById("editTitle").value.trim(),

        author: document.getElementById("editAuthor").value.trim(),

        price: Number(document.getElementById("editPrice").value)

    };

    try {

        const response = await fetch(`${API_URL}/${id}`, {

            method: "PUT",

            headers: {
                "Content-Type": "application/json",
                "Authorization": authHeader
            },

            body: JSON.stringify(updatedBook)

        });

        if (response.status === 401) {
            logout();
            return;
        }

        if (!response.ok) {
            throw new Error("Failed to update book");
        }

        closeEditModal();

        await loadBooks();

        alert("Book updated successfully!");

    } catch (error) {

        alert("Failed to update book.");
        console.error(error);

    }

});


/* OPEN DELETE MODAL */

function openDeleteModal(id) {

    bookToDelete = id;

    deleteModal.style.display = "flex";

}


/* CLOSE DELETE MODAL */

function closeDeleteModal() {

    deleteModal.style.display = "none";

    bookToDelete = null;

}


/* DELETE BOOK */

async function confirmDelete() {

    if (!bookToDelete) {
        return;
    }

    try {

        const response = await fetch(
            `${API_URL}/${bookToDelete}`,
            {
                method: "DELETE",
                headers: {
                    "Authorization": authHeader
                }
            }
        );

        if (response.status === 401) {
            logout();
            return;
        }

        if (!response.ok) {
            throw new Error("Failed to delete book");
        }

        closeDeleteModal();

        await loadBooks();

        alert("Book deleted successfully!");

    } catch (error) {

        alert("Failed to delete book.");
        console.error(error);

    }

}


/* LOGOUT */

function logout() {

    sessionStorage.removeItem("jwtToken");

    window.location.href = "login.html";

}


/* CLOSE MODALS WHEN CLICKING OUTSIDE */

window.addEventListener("click", function(event) {

    if (event.target === editModal) {
        closeEditModal();
    }

    if (event.target === deleteModal) {
        closeDeleteModal();
    }

});


/* SECURITY HELPERS */

function escapeHtml(value) {

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


function escapeJs(value) {

    return String(value)
        .replace(/\\/g, "\\\\")
        .replace(/'/g, "\\'")
        .replace(/\n/g, "\\n")
        .replace(/\r/g, "\\r");

}