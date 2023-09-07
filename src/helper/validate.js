import toast from "react-hot-toast";

export async function passwordValidate(values) {
  const errors = passwordVerify({}, values);
  return errors;
}

function passwordVerify(errors = {}, values) {
  const regExpression = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;

  if (!values.password) {
    errors.password = toast.error("password required");
  } else if (values.password.includes(" ")) {
    errors.password = toast.error("Invalid password");
  } else if (values.password.length < 6) {
    errors.password = toast.error("password must be greater than 6");
  } else if (!regExpression.test(values.password)) {
    errors.password = toast.error(
      "password must include one capital , special and number "
    );
  }
  return errors;
}

export async function usernameValidate(values) {
  const errors = usernameVerify({}, values);
  return errors;
}

function usernameVerify(error = {}, values) {
  if (!values.username) {
    error.username = toast.error("Username is Required");
  } else if (values.username.includes(" ")) {
    error.username = toast.error("Invalid Username");
  }
  return error;
}

export async function resetPasswordValidation(values) {
  const errors = passwordVerify({}, values);
  if (values.password !== values.confirmPassword) {
    errors.exist = toast.error("password should match");
  }
  return errors;
}

export async function registerValidation(values) {
  const errors = usernameVerify({}, values);
  passwordVerify(errors, values);
  emailVerify(errors, values);
  return errors;
}

function emailVerify(error = {}, values) {
  if (!values.email) {
    error.email = toast.error("Email is required");
  } else if (values.email.includes(" ")) {
    error.email = toast.error("invalid Email");
  } else if (
    !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/i.test(
      values.email
    )
  ) {
    error.email = toast.error("Invalid email address");
  }
  return error;
}

export async function profileValidation(values) {
  const errors = emailVerify({}, values);
  return errors;
}
