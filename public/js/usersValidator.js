window.addEventListener('load', async ()=>{
    
    //Seleccting elements        
    const signInForm = document.querySelector('.signInForm');
    const signUpForm = document.querySelector('.signUpForm');    
    const userOrEmailErrorDiv = document.getElementById('userOrEmailError');
    const signInPasswordErrorDiv = document.getElementById('signInPasswordError');
    const userNameErrorDiv = document.getElementById('userNameError');
    const firstNameErrorDiv = document.getElementById('firstNameError');
    const lastNameErrorDiv = document.getElementById('lastNameError');
    const emailErrorDiv = document.getElementById('emailError');
    const passwordErrorDiv = document.getElementById('passwordError');
    const confirmPasswordErrorDiv = document.getElementById('confirmPasswordError');
    
    //Destructuring   
    const { userOrEmail , signInPassword } = signInForm.elements;
    const { userName, firstName, lastName, email, password, confirmPassword } = signUpForm.elements;

    //Regular expresions
    const emailRegex = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    const noSpacesRegex = /\s/

    //Getting users from data base
    async function fetchUsers () {
        const response = await fetch('/api/users/list');
        const results = await response.json();
        return results.data;
    }
    const dataInDb = await fetchUsers();
    const dataInDbInLowerCase = dataInDb.map(el => el.toLowerCase());
    const emailsInDb = dataInDbInLowerCase.filter(el => emailRegex.test(el));
    const usersInDb = dataInDbInLowerCase.filter(el => !emailRegex.test(el));

    //Events
    userName.addEventListener('keyup', userNameHandler);
    userName.addEventListener('input', userNameHandler);
    email.addEventListener('keyup', emailHandler);
    email.addEventListener('input', emailHandler);
    signInForm.addEventListener('submit', signInFormHandler);
    signUpForm.addEventListener('submit', signUpFormHandler);

    //Functions
    let checkRegex = (reg, value) => reg instanceof RegExp ? reg.test(value) : console.error('invalid regex');
    let checkInDb = (array, value) => array.find(element => element == value.toLowerCase());
    let checkMinLength = (value, minLength) => value.length < minLength;
    let checkMaxLength = (value, maxLength) => value.length > maxLength;

    //Handlers
    function signInFormHandler (event) {
        let userOrEmailError = null;
        let signInPasswordError = null;
        if ( checkRegex(noSpacesRegex, userOrEmail.value) ) {
            userOrEmailError = 'This field cannot contain spaces';
        } else if ( checkMinLength(userOrEmail.value, 2) ) {
            userOrEmailError = 'The user name or email must be longer than 2 characters';
        }
        if ( checkMinLength(signInPassword.value, 8) ) {
            signInPasswordError = 'The password must be longer than 8 characters';
        }
        if (userOrEmailError) {
            event.preventDefault();
            userOrEmail.classList.add('is-invalid');
            userOrEmail.classList.remove('is-valid');
            userOrEmailErrorDiv.innerText = userOrEmailError;
        } else {
            userOrEmailErrorDiv.innerText = '';
            userOrEmail.classList.remove('is-invalid');
            userOrEmail.classList.add('is-valid');
        }
        if (signInPasswordError) {
            event.preventDefault();
            signInPassword.classList.add('is-invalid');
            userOrEmail.classList.remove('is-valid');
            signInPasswordErrorDiv.innerText = signInPasswordError;
        } else {
            signInPasswordErrorDiv.innerText = '';
            signInPassword.classList.remove('is-invalid');
            signInPassword.classList.add('is-valid');
        }
    }
    function userNameHandler (){
        let userNameError = null;
        if ( checkRegex(noSpacesRegex, userName.value) ) {
            userNameError = 'The user name cannot contains spaces';          
        } else if ( checkMinLength(userName.value, 2) ){
            userNameError = 'The user name must be longer than 2 characters'
        } else if ( !checkMinLength(userName.value, 2) && !checkMaxLength(userName.value, 15) ) {
            if ( checkInDb(usersInDb, userName.value) ) {
                userNameError = `This user name is already in use`;
            }
        } else if ( checkMaxLength(userName.value, 15) ) {
            userNameError = 'The user name must be shorter than 15 characters';
        } 

        if ( userNameError ) {            
            userName.classList.add('is-invalid');
            userName.classList.remove('is-valid');
            userNameErrorDiv.innerText = userNameError;
            return false;
        } else {
            userNameErrorDiv.innerText = '';
            userName.classList.remove('is-invalid');
            userName.classList.add('is-valid');
            return true;
        }        
    }
    function emailHandler (){
        let emailError = null; 
        const emailToMatch = emailsInDb.find( user => user == email.value.toLowerCase() );
        if ( !checkRegex(emailRegex, email.value) ) {
            emailError = 'Must be a valid email';        
        } else if ( checkInDb(emailsInDb, email.value) ) {
            emailError = 'This email is already in use';
        }

        if ( emailError ) {
            email.classList.add('is-invalid');
            emailErrorDiv.innerText = emailError;
            return false;
        } else {
            emailErrorDiv.innerText = '';
            email.classList.remove('is-invalid');
            email.classList.add('is-valid');
            return true
        }        
    }
    function signUpFormHandler (event) {
        let firstNameError = null;
        let lastNameError = null;
        let passwordError = null;
        let confirmPasswordError = null;
        if ( checkMinLength((firstName.value).trim(), 2) ) {
            firstNameError = 'The first must be longer than 2 characters';
        } else if ( checkMaxLength(firstName.value, 50)) {
            firstNameError = 'The first name must be shorter than 50 characters';
        }
        if ( checkMinLength((lastName.value).trim(), 2) ) {
            lastNameError = 'The last name must be longer than 2 characters';
        } else if ( checkMaxLength(lastName.value, 2)) {
            lastNameError = 'The last name must be shorter than 50 characters';
        }
        if ( checkMinLength(password.value, 8) ) {
            passwordError = 'The password must be longer than 8 characters';
        }
        if ( checkMinLength(confirmPassword.value, 1) ) {
            confirmPasswordError = `This field can't be empty`;
        } else if ( password.value != confirmPassword.value ) {
            confirmPasswordError = `The passwords doesn't match`;
        }
        
        if ( firstNameError ) {
            event.preventDefault();
            firstName.classList.add('is-invalid');
            firstNameErrorDiv.innerText = firstNameError;
        } else {
            firstNameErrorDiv.innerText = '';
            firstName.classList.remove('is-invalid');
            firstName.classList.add('is-valid');
        }        
        if ( lastNameError ) {
            event.preventDefault();
            lastName.classList.add('is-invalid');
            lastNameErrorDiv.innerText = lastNameError;
        } else {
            lastNameErrorDiv.innerText = '';
            lastName.classList.remove('is-invalid');
            lastName.classList.add('is-valid');
        }
        if ( passwordError ) {
            event.preventDefault();
            password.classList.add('is-invalid');
            passwordErrorDiv.innerText = passwordError;
        } else {
            passwordErrorDiv.innerText = '';
            password.classList.remove('is-invalid');
            password.classList.add('is-valid');
        }
        if ( confirmPasswordError ) {
            event.preventDefault();
            confirmPassword.classList.add('is-invalid');
            confirmPasswordErrorDiv.innerText = confirmPasswordError;
        } else {
            confirmPasswordErrorDiv.innerText = '';
            confirmPassword.classList.remove('is-invalid');
            confirmPassword.classList.add('is-valid');
        }
        if ( !emailHandler() && !userNameHandler() ) {
            event.preventDefault();
        }
    }
})
window.addEventListener('load', () => {

    //Seleccting element
    const signOutBtn = document.querySelector('.signOutBtn');

    //Event
    signOutBtn.addEventListener('click', signOutBtnHandler);

    //Function        
    async function signOutBtnHandler (event) {
        event.preventDefault()
        const answer = await swal({ title: 'Are you sure you want to log out?', dangerMode: true, buttons: true, icon: 'warning' });
        if ( answer ) {
            window.location.href = 'http://localhost:3000/users/logOut'
        }
    }
})