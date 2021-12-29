# React Application - Online Virtual Store

## 🛠 Libraries and tools used
- [React](https://reactjs.org/)
- [HTML5](https://developer.mozilla.org/en-US/docs/Glossary/HTML5)
- [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)
- [Font Awesome](https://fontawesome.com/v5.15/how-to-use/on-the-web/using-with/react)
- [TypeScript](https://www.typescriptlang.org/)
- [React Router v5](https://reactrouter.com/)
- [Redux](https://redux.js.org/)
- [React Redux](https://react-redux.js.org/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Redux Persist](https://github.com/rt2zz/redux-persist)
- [REST API](https://github.com/MihailValkov/shared-trips/blob/main/server/readMe.md)

## Getting Started
Clone this repository and install dependencies
```
> git clone https://github.com/MihailValkov/virtual-store.git
> cd client
> npm install
> npm start
> cd ../server
> npm install
> npm start
> go to http://localhost:5500
```
**NOTE: Don't forget to read the documentation about the CUSTOM API, you can find it [here](https://github.com/MihailValkov/virtual-store/blob/main/server/readMe.md).**


## Application Overview
The application allows visitors to browse through the products catalog and add products to favorites and cart, but only logged-in users can make orders.
Guest users may register with an `email`, and `password` which allows them to `purchase` products, rate products, and edit their own profile information. Each logged-in `user` should be able to view their own profile by clicking `[Profile]` in the navigation bar. 
The profile page is containing detailed information about the user, and the opportunity to edit their own profile information.
Only the admin users can add new products.


# Permissions:

| **Permissions** | Guest   | Logged in User  | Admin           |
| --------------- | -----   | --------------  | --------------  |
| Login/ Register | ✅     | ❌              | ❌              |
| Catalog         | ✅     | ✅              | ✅              |
| Details         | ✅     | ✅              | ✅              |
| Profile         | ❌     | ✅              | ✅              |
| Favorites       | ✅     | ✅              | ✅              |
| Cart            | ✅     | ✅              | ✅              |
| Checkout        | ❌     | ✅              | ✅              |
| Orders          | ❌     | ✅              | ✅              |
| Rate Product    | ❌     | ✅              | ✅              |
| Create Product  | ❌     | ❌              | ✅              |
