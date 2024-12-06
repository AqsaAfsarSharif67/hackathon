import { createUserWithEmailAndPassword, getAuth } from "./firebase.js"; // Import Firebase functions
import { db } from './firebase.js';
import { collection, query, where, orderBy, getDocs } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

document.addEventListener("DOMContentLoaded", () => {
    // Get references to the form fields
    const firstName = document.getElementById("firstName");
    const lastName = document.getElementById("lastName");
    const signupEmail = document.getElementById("signupEmail");
    const phone = document.getElementById("phone");
    const signupPassword = document.getElementById("signupPassword");
    const confirmPassword = document.getElementById("confirmPassword");
    const signupBtn = document.getElementById("signupBtn");

    // Add event listener to signup button
    if (signupBtn) {
        signupBtn.addEventListener("click", () => {
      
            if (firstName.value.trim() === "" || lastName.value.trim() === "" || signupEmail.value.trim() === "" || phone.value.trim() === "" || signupPassword.value.trim() === "" || confirmPassword.value.trim() === "") {
                Swal.fire({
                    icon: 'error',
                    title: 'Missing Data',
                    text: 'Please fill in all fields.',
                });
                return;  
            }

            if (signupPassword.value !== confirmPassword.value) {
                Swal.fire({
                    icon: 'error',
                    title: 'Password Mismatch',
                    text: 'The passwords do not match. Please try again.',
                });
                return;  
            }

            const auth = getAuth();


            createUserWithEmailAndPassword(auth, signupEmail.value, signupPassword.value)
                .then((userCredential) => {
                    const user = userCredential.user;
                    console.log("User created:", user);

                    Swal.fire({
                        icon: 'success',
                        title: 'Registration Successful',
                        text: 'You have successfully created your account!',
                    });

                    setTimeout(() => {
                        location.href = "signin.html";
                    }, 1500);
                })
                .catch((error) => {
                    const errorMessage = error.message;
                    console.error("Error:", errorMessage);


                    Swal.fire({
                        icon: 'error',
                        title: 'Registration Failed',
                        text: errorMessage,
                    });
                });
        });
    }
});



// Select the posts containers for each category
const healthPostsContainer = document.getElementById('health-posts-container');
const generalPostsContainer = document.getElementById('general-posts-container');
const educationPostsContainer = document.getElementById('education-posts-container');
const politicsPostsContainer = document.getElementById('politics-posts-container');

// Function to fetch posts from Firestore based on category
async function fetchPostsByCategory(category, postsContainer) {
  postsContainer.innerHTML = '';  

 
  const postsQuery = query(
    collection(db, "posts"),
    where("category", "==", category),  
    orderBy("timestamp", "desc")  
  );

  const querySnapshot = await getDocs(postsQuery);

  // Check if any posts are fetched
  if (querySnapshot.empty) {
    postsContainer.innerHTML = `<p>No posts available in the ${category} category.</p>`;
  } else {

    querySnapshot.forEach((doc) => {
      const post = doc.data();
      const postElement = document.createElement("div");
      postElement.classList.add("post");
      postElement.innerHTML = `
        <h3>${post.title}</h3>
        <p class="category">${post.category}</p>
        <p>${post.content}</p>
        <p><small>Posted on: ${new Date(post.timestamp.seconds * 1000).toLocaleString()}</small></p>
      `;
      postsContainer.appendChild(postElement);
    });
  }
}

// Function to display posts based on categories
async function displayCategoryPosts() {

  await fetchPostsByCategory("Health", healthPostsContainer);
  await fetchPostsByCategory("General", generalPostsContainer);
  await fetchPostsByCategory("Education", educationPostsContainer);
  await fetchPostsByCategory("Politics", politicsPostsContainer);
}


displayCategoryPosts(healthPostsContainer);