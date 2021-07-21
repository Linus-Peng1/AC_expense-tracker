// // confirm edit/new record
// const form = document.querySelector('#form')
// const submitButton = document.querySelector('#submit-btn')

// form.addEventListener('submit', function onFormSubmitted(event) {
//   if (!form.checkValidity()) {
//     event.stopPropagation()
//     event.preventDefault()
//     alert('Form invalid')  //驗證不通過，就跳 alert
//   }
// })

// submitButton.addEventListener('click', function onSubmitButtonClicked(event) {
//   form.classList.add('was-validated')
// })

// delete record
document.querySelector('#data-panel').addEventListener('click', function deleteButtonClicked(event) {
  const recordId = event.target.dataset.id
  if (event.target.id === 'delete-btn') {
    document.querySelector('#modal-delete').action = `/records/${recordId}?_method=DELETE`
  }
})