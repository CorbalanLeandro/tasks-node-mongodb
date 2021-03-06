window.addEventListener('load', ()=>{

    //Seleccting elements
    const addTaskForm = document.querySelector('.addTaskForm');
    const editTaskForms = document.querySelectorAll('.editTaskForm');
    const editTitleInputs = document.querySelectorAll('.editTitleInput');
    const editDescriptionInputs = document.querySelectorAll('.editDescriptionInput');
    const editTaskTitleErrorDivs = document.querySelectorAll('.editTaskTitleError');
    const editTaskDescriptionErrorDivs = document.querySelectorAll('.editTaskDescriptionError');
    const deleteTaskForms = document.querySelectorAll('.deleteTaskForm');
    const newTaskTitleError = document.getElementById('newTaskTitleError');
    const newTaskDescriptionError = document.getElementById('newTaskDescriptionError');
    
    //Destructuring
    const { addTaskTitle, addTaskDescription } = addTaskForm.elements;

    //Events
    addTaskForm.addEventListener('submit', addTaskFormHandler);

    //Functions
    let checkMinLength = (value, minLength) => (value.trim()).length < minLength;
    let checkMaxLength = (value, maxLength) => value.length > maxLength;

    //Handlers
    function addTaskFormHandler (event) {
        let titleError = null;
        let descriptionError = null;
        if ( checkMinLength(addTaskTitle.value, 2) ) {
            titleError = 'The task title must be longer than 2 characters';
        } else if ( checkMaxLength(addTaskTitle.value, 15) ) {
            titleError = 'The task title must be shorter than 15 characters';
        }
        if ( checkMinLength(addTaskDescription.value, 2) ) {
            descriptionError = 'The task description must be longer than 2 characters';
        } else if ( checkMaxLength(addTaskDescription.value, 150) ) {
            descriptionError = 'The task description must be shorter than 150 characters';
        }
        if ( titleError ) {
            event.preventDefault();
            addTaskTitle.classList.add('is-invalid');
            newTaskTitleError.innerText = titleError;
        } else {
            newTaskTitleError.innerText = '';
            addTaskTitle.classList.remove('is-invalid');
            addTaskTitle.classList.add('is-valid');
        }
        if ( descriptionError ) {
            event.preventDefault();
            addTaskDescription.classList.add('is-invalid');
            newTaskDescriptionError.innerText = descriptionError;
        } else {
            newTaskDescriptionError.innerText = '';
            addTaskDescription.classList.remove('is-invalid');
            addTaskDescription.classList.add('is-valid');
        }
    }
    //A dinamic solution for the edit forms.
    for (let i = 0 ; i < editTaskForms.length ; i++) {
        editTaskForms[i].addEventListener('submit', function (event) {
            let titleError = null;
            let descriptionError = null;
            if ( checkMinLength(editTitleInputs[i].value, 2) ) {
                titleError = 'The task title must be longer than 2 characters';
            } else if( checkMaxLength(editTitleInputs[i].value, 15) ) {
                titleError = 'The task title must be shorter than 15 characters';
            }
            if ( checkMinLength(editDescriptionInputs[i].value, 2) ) {
                descriptionError = 'The task description must be longer than 2 characters';
            } else if ( checkMaxLength(editDescriptionInputs[i].value, 150) ) {
                descriptionError = 'The task description must be shorter than 150 characters';
            }
            if ( titleError ) {
                event.preventDefault();
                editTitleInputs[i].classList.add('is-invalid');
                editTaskTitleErrorDivs[i].innerText = titleError;
            } else {
                editTaskTitleErrorDivs[i].innerText = '';
                editTitleInputs[i].classList.remove('is-invalid');
                editTitleInputs[i].classList.add('is-valid');
            }
            if ( descriptionError ) {
                event.preventDefault();
                editDescriptionInputs[i].classList.add('is-invalid');
                editTaskDescriptionErrorDivs[i].innerText = descriptionError;
            } else {
                editTaskDescriptionErrorDivs[i].innerText = '';
                editDescriptionInputs[i].classList.remove('is-invalid');
                editDescriptionInputs[i].classList.add('is-valid');
            }
        });
    }
    //A dinamic solution for the delete task button.
    for (let i = 0 ; i < deleteTaskForms.length ; i++) {
        deleteTaskForms[i].addEventListener('submit', async function (event) {
            event.preventDefault();
            const answer = await swal({title: 'Delete task?', dangerMode: true, buttons: true, icon: 'warning' });
            if ( answer ) {
                const confirmation = await swal({title: 'Task Deleted', icon: 'success'});
                if ( confirmation || !confirmation ) {
                    deleteTaskForms[i].submit()
                }                
            }
        })        
    }
})