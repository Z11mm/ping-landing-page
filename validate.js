const emailField = document.querySelector('input[type="email"]');

/* disable native form validation in js so that if script fails,
  native validation kicks in */
const form = document.querySelector('.validate');
form.setAttribute('novalidate', true);

// Validate the field
const hasError = field => {
  // Don't validate submits, buttons, file and reset inputs, and disabled fields
  if (
    field.disabled ||
    field.type === 'file' ||
    field.type === 'reset' ||
    field.type === 'submit'
  )
    return;

  // Get validity
  const validity = field.validity;

  // If valid, return null
  if (validity.valid) return;

  // If field is required and empty
  if (validity.valueMissing) return 'Please fill out this field.';

  // If not the right type
  if (validity.typeMismatch) {
    if (field.type === 'email')
      // Email
      return 'Please enter a valid email address.';
  }

  // If all else fails, return a generic catchall error
  return 'The value you entered for this field is invalid.';
};

// Show the error message
const showError = (field, error) => {
  // Add error class to field
  field.classList.add('error');

  // Get field id or name
  var id = field.id || field.name;
  if (!id) return;

  // Check if error message field already exists
  // If not, create one
  var message = field.form.querySelector('.error-message#error-for-' + id);
  if (!message) {
    message = document.createElement('div');
    message.className = 'error-message';
    message.id = 'error-for-' + id;
    field.parentNode.insertBefore(message, field.nextSibling);
  }

  // Add ARIA role to the field
  field.setAttribute('aria-describedby', 'error-for-' + id);

  // Update error message
  message.textContent = error;
};

// listen for blur events
emailField.addEventListener(
  'blur',
  event => {
    // only run if the field is in a form to be validated
    if (!event.target.form.classList.contains('validate')) return;

    // validate the field
    const error = hasError(event.target);
    showError(emailField, error);
  },
  true
);

document.querySelector('button').addEventListener(
  'click',
  event => {
    event.preventDefault();
    if (emailField.value === '') {
      const error = hasError(emailField);
      showError(emailField, error);
    }
  },
  true
);
