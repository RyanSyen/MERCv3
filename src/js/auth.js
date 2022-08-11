//listen for auth status change
// when the page loads or refreshes this fires up and the service will see this first as a change in status
auth.onAuthStateChanged(user => {
    //check whether user exist -> true if user logged in, false if user logged out
    if (user) {
        console.log('user logged in: ', user);
      } else {
        console.log('user logged out');
      }
});

//sign up
const signupForm = document.querySelector('#signup-form');

// add a submit event listener and disable auto submit which will refresh the page. We want it to stay on that same page
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();

    //get user info
    const username = signupForm['username'].value;
    const email = signupForm['email'].value;
    const password = signupForm['password'].value;

    console.log(username, email, password);

    // sign up the user
    auth.createUserWithEmailAndPassword(email, password).then(cred => {
        console.log(cred.user);
        // close the signup modal & reset form
        // const modal = document.querySelector('#modal-signup');
        // M.Modal.getInstance(modal).close();
        signupForm.reset();
    });
});

// logout
const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
    e.preventDefault();
    auth.signOut();
});

//sign in
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    //get user info
    const email = loginForm['login-email'].value;
    const password = loginForm['login-password'].value;

    auth.signInWithEmailAndPassword(email, password).then((cred) => {
        loginForm.reset();
    });
});