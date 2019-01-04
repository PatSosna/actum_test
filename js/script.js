document.getElementById('ContactForm').onsubmit = e => {
  e.preventDefault();
  sendData();
};

function sendData() {
  const url = 'https://actum-form-ulcrunoxba.now.sh/api/submit';
  const data = {
    name: document.getElementById('inputName').value,
    surname: document.getElementById('inputSurname').value,
    date: document.getElementById('inputDate').value,
    date: document.getElementById('inputDate').value,
    email: document.getElementById('inputEmail').value,
    gender: document.querySelector('.form-check-input:checked').value,
    children: document.getElementById('inputChildrens').value
  };
  /*  console.log(data); */

  if (
    isEmail(data.email) &&
    !isEmpty(data.name) &&
    !isEmpty(data.surname) &&
    data.name.toLowerCase() != 'john'
  ) {
    fetch(url, {
      method: 'POST',
      body: data,
      // body: JSON.stringify(data),
      headers: {
        'content-type': 'application/x-www-form-urlencoded'
      }
    })
      .then(res => res.json())
      .catch(error => {
        showAlert(error.message, 'danger');
      })
      .then(response => showAlert(response.message, 'success'));
  } else {
    showAlert('Something wrong!', 'danger');
  }
}

function showAlert(message, alertType) {
  let body = document.body;
  body.insertAdjacentHTML(
    'beforeend',
    `<div id="alert" class="alert alert-${alertType}">
      <a class="close" data-dismiss="alert">×</a>
      <span>
        ${message}
      </span></div>`
  );

  setTimeout(() => {
    document.getElementById('alert').remove();
  }, 5000);
}

/* valid inputs */
const form = document.getElementById('ContactForm');
const inputs = form.getElementsByTagName('input');
for (let i = 0; i < inputs.length; i++) {
  inputs[i].onblur = () => {
    let inputErr = inputs[i].getAttribute('data-error');
    let prev = inputs[i].previousElementSibling;
    if (inputs[i].hasAttribute('required') && inputs[i].id === 'inputEmail') {
      /* valie emaul */
      prev.innerHTML =
        isEmail(inputs[i].value) && prev.classList.contains('with-errors')
          ? ''
          : inputErr;
    } else if (inputs[i].hasAttribute('required')) {
      /* valid empty inputs */
      prev.innerHTML =
        !isEmpty(inputs[i].value) && prev.classList.contains('with-errors')
          ? ''
          : inputErr;
    }
  };
}

const isEmail = (email = null) => {
  const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return regex.test(email);
};

const isEmpty = str => {
  return !str.replace(/\s+/, '').length;
};

/* valid email */
/* const email = document.getElementById('inputEmail');
const emailErr = document.getElementsByClassName('error-email')[0];
const emailErrMsg = email.getAttribute('data-error');
email.onblur = () => {
  if (isEmail(email.value)) {
    emailErr.innerHTML = '';
  } else {
    emailErr.innerHTML = emailErrMsg;
  }
}; */

/* const name = document.getElementById('inputName');
const nameErr = document.getElementsByClassName('error-name')[0];
const nameErrMsg = name.getAttribute('data-error');
name.onblur = () => {
  if (!isEmpty(name.value)) {
    nameErr.innerHTML = '';
  } else {
    nameErr.innerHTML = nameErrMsg;
  }
}; */
