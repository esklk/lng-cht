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
  set currentUserValue(newUserValue) {
    setCurrentUserAccount(newUserValue);
  },
};

function authenticate(token) {
  return api
    .httpGet("accounts", { token }, true)
    .then((response) => {
      return response.json().then((account) => {
        account.isNew = response.status === 201;
        return account;
      });
    })
    .then((accountData) => {
      if (accountData) {
        localStorage.setItem("currentUser", JSON.stringify(accountData));
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

function setCurrentUserAccount(account) {
  var currentUserData = currentUserSubject.value;
  currentUserData.account = account;
  localStorage.setItem("currentUser", JSON.stringify(currentUserData));
}
