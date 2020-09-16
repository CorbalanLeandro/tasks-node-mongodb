window.addEventListener('load', ()=>{

    /*fetch('/api/users/list')
        .then(response => response.json())
        .then(result => {})*/
    //Seleccting elements
    const addTaskForm = document.querySelector('.addTaskForm');
    const editTaskForm = document.querySelector('.editTaskForm');
    const deleteTaskForm = document.querySelector('.deleteTaskForm');
    const signOutBtn = document.querySelector('.signOutBtn');
    const signInForm = document.querySelector('.signInForm');
    const signUpForm = document.querySelector('.signUpForm');

    //Destructuring
    const { title, description } = addTaskForm.elements;
    const { editTitle, editDescription } = editTaskForm.elements;
    const { userOrEmail , loginPassword} = signInForm.elements;
    const { userName, firstName, lastName, email, password, confirmPassword } = signUpForm.elements;

    //Events
    addTaskForm.addEventListener('submit', addTaskFormHandler);
    editTaskForm.addEventListener('submit', editTaskFormHandler);
    deleteTaskForm.addEventListener('submit', deleteTaskFormHandler);
    signOutBtn.addEventListener('click', signOutBtnHandler);
    signInForm.addEventListener('submit', signInFormHandler);
    signUpForm.addEventListener('submit', signUpFormHandler);
    userName.addEventListener('keyup', userNameHandler);
    email.addEventListener('keyup', emaiHandler);

    //Functions
    

})