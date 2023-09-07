import axios from "axios";

//authenticate function

export async function autheticate(username) {
  try {
    return await axios.post("/api/authenticate", { username });
  } catch (error) {
    return { error: "Username doesn't exist" };
  }
}

//get user details

export async function getUser({ username }) {
  try {
    const { data } = await axios.get(`/api/user/${username}`);
    return data;
  } catch (error) {
    return { error: "password doesn't match" };
  }
}

//register the user

export async function registerUser(credentials) {
  try {
    const {
      data: { msg },
      status,
    } = await axios.post("/api/register", credentials);

    let { username, email } = credentials;
    if (status === 201) {
      await axios.post("/api/registerMail", {
        username,
        userEmail: email,
        text: msg,
      });
    }
    return Promise.resolve(msg);
  } catch (error) {
    return Promise.reject({ error });
  }
}

//login function

export async function verifyPassword({ username, password }) {
  try {
    if (username) {
      const { data } = await axios.post("/api/login", { username, password });

      return Promise.resolve({ data });
    }
  } catch (error) {
    return Promise.reject({ error: "password doesn't match" });
  }
}

export async function updateUser(response) {
  try {
    const token = await localStorage.getItem("token");
    const data = await axios.put("/api/updateuser", response,{
        headers : { 
            "Authorization" : `Bearer ${token}`
        }
    });
  } catch (error) {
    return Promise.reject({ error: "could not able to update" });
  }
}
