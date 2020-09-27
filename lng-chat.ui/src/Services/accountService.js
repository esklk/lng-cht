import { BehaviorSubject } from "rxjs";
import { api } from "./apiService";

const currentUserSubject = new BehaviorSubject(
  JSON.parse(localStorage.getItem("currentUser"))
);

export const accountService = {
  authenticate,
  logout,
  currentUser: currentUserSubject.asObservable(),
  get currentUserValue() {
    return currentUserSubject.value;
  },
};

function authenticate(token) {
  return api
    .httpGet("account", { token }, true)
    .then((response) => {
      return response.json().then((account) => {
        account.isNew = response.status === 201;
        return account;
      });
    })
    .then((accountData) => {
      if (accountData) {
        localStorage.setItem(
          "currentUser",
          JSON.stringify(accountData)
        );
        currentUserSubject.next(accountData);
        return accountData;
      }
    })
    .catch((error) => {
      console.error(error);
      return null;
    });
}

function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem("currentUser");
  currentUserSubject.next(null);
}
