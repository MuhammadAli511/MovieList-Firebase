// importing the firebase using CDN
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { addDoc, collection, deleteDoc, doc, getDocs, getFirestore, query, where } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";

export async function firebaseFunc() {



    // here you can insert your own firebase config to change it to your firestore
    const firebaseConfig = {
        apiKey: "AIzaSyDcqIk5L9-xkYqpG3XsCnPsI8JyHCbj9Go",
        authDomain: "de-ve-de-e9f99.firebaseapp.com",
        projectId: "de-ve-de-e9f99",
        storageBucket: "de-ve-de-e9f99.appspot.com",
        messagingSenderId: "294521339132",
        appId: "1:294521339132:web:9f792fdaace238f0686b79"
    };
    // setting up the firebase and firestore
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    // getting all the movies to display them when the page is loaded for first time
    const movies = await getDocs(collection(db, "movies"));
    movies.forEach((doc) => {
        let newMovie = document.createElement("li");
        newMovie.innerHTML = doc.data().title + " (" + doc.data().releaseDate + ") - " + doc.data().genre;
        let movieList = document.getElementById("movie-list");
        movieList.appendChild(newMovie);
    });



    // getting all the movies to display them but as a function to call anytime required
    async function getMovies() {
        const movies = await getDocs(collection(db, "movies"));
        movies.forEach((doc) => {
            let newMovie = document.createElement("li");
            newMovie.innerHTML = doc.data().title + " (" + doc.data().releaseDate + ") - " + doc.data().genre;
            let movieList = document.getElementById("movie-list");
            movieList.appendChild(newMovie);
        });
    }

    // create a funciton to empty list where movies are displayed
    function emptyList() {
        let movieList = document.getElementById("movie-list");
        while (movieList.firstChild) {
            movieList.removeChild(movieList.firstChild);
        }
    }



    // listener on the add button
    document.getElementById("addButton").addEventListener("click", async function () {

        // check if all fields are filled
        if (document.getElementById("title").value == "" || document.getElementById("genre").value == "" || document.getElementById("release-date").value == "") {
            alert("Please fill all fields");
            return;
        }



        // check if the movie is already in the list
        let isMovieInList = false;
        const movies = await getDocs(collection(db, "movies"));
        movies.forEach((doc) => {
            if (doc.data().title == document.getElementById("title").value) {
                alert("Movie already in the list");
                isMovieInList = true;
                return;
            }
        });


        // if the movie is not in the list, add it to the list
        if (isMovieInList == false) {
            let title = document.getElementById("title").value;
            let genre = document.getElementById("genre").value;
            let releaseDate = document.getElementById("release-date").value;

            await addDoc(collection(db, "movies"), {
                title: title,
                genre: genre,
                releaseDate: releaseDate
            });
        }

        // empty the list and get all the movies again
        emptyList();
        getMovies();

        // empty the input fields
        document.getElementById("title").value = "";
        document.getElementById("genre").value = "";
        document.getElementById("release-date").value = "";

    })

    // listener on the delete button
    document.getElementById("deleteButton").addEventListener("click", async function () {
        // check if the title field is filled
        if (document.getElementById("title2").value == "") {
            alert("Please fill the title field");
            return;
        }

        // check if the movie is in the list
        let isMovieInList = false;
        const movies = await getDocs(collection(db, "movies"));
        movies.forEach((doc) => {
            if (doc.data().title == document.getElementById("title2").value) {
                isMovieInList = true;
                return;
            }
        });

        // if the movie is not in the list, alert the user
        if (isMovieInList == false) {
            alert("Movie not in the list");
            return;
        }

        // if the movie is in the list, delete it by getting the id of the movie
        let movieId = "";
        const movies2 = await getDocs(collection(db, "movies"));
        movies2.forEach((doc) => {
            if (doc.data().title == document.getElementById("title2").value) {
                movieId = doc.id;
                return;
            }
        });
        deleteDoc(doc(db, "movies", movieId));


        // empty the list and get all the movies again
        emptyList();
        getMovies();

        // empty the input fields
        document.getElementById("title2").value = "";
    })
}