function firebase_login(enteredLogin, enteredPassword) {
  return fetch(
    "https://finance-app-2adfa-default-rtdb.firebaseio.com/login.json"
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      for (const key in data) {
        if (
          data[key].login == enteredLogin &&
          data[key].password == enteredPassword
        ) {
          return data[key];
        }
      }
      return "not found";
    });
}

export default firebase_login;
