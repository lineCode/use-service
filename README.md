<p>
    <h1 align="center">use-services-hook</h1>
</p>

<p align="center">
  An easy and compact way to fetch data using hooks 🚀
</p>

<p align="center">
  <img alt="Maintenance" src="https://img.shields.io/badge/Maintained%3F-yes-greencolor=42b883.svg" />          
  <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellowcolor=42b883.svg" />
</p>

<br/>
<br/>

## Installation

### npm

```sh
npm install use-services-hook
```

### yarn

```sh
yarn add use-services-hook
```

---

## Hooks

General documentation

### :white_check_mark: `useService(Service);`

Takes each service's method and wraps it. This way we can handle its lifecycle and manage the request state.

```js
    ...state,
    ...serviceMethods,
    data: state.response?.data,
    isLoading: state.status === 'loading',
    hasError: state.status === 'error',
    wasSuccessful: state.status === 'success',
```

```js
const { serviceMethods, data, isLoading, hasError, wasSuccessful } =
  useService2(Service);
```

- `serviceMethods` **get**, **delete**, **post**, **put**, **patch** methods.
- `data` is the response that was provided by the service.
- `isLoading` - status **loading**.
- `hasError` - status **error**.
- `wasSuccessful` - status **success**

#### 📝 Usage Example

**Service.js**

```js
import Http from "./Http"; //axios configuration
const endpoint = "...";

const Service = {
  getData() {
    return Http.get(`${endpoint}`);
  },
};

export default Service;
```

**App.js**

```js
import Service from "./Service.js";

function App() {
  const { getData, data, isLoading, hasError, wasSuccessful } =
    useService2(Service);

  React.useEffect(() => {
    getData();
  }, []);

  return (
    <div className="App">
      {isLoading && <div>loading ...</div>}
      {wasSuccessful && <div>{data.map((props) => {})}</div>}
      {hasError && <div>error</div>}
    </div>
  );
}

export default App;
```

---

## **:handshake: Contributing**

- Fork it!
- Create your feature branch: `git checkout -b my-new-feature`
- Commit your changes: `git commit -am 'Add some feature'`
- Push to the branch: `git push origin my-new-feature`
- Submit a pull request

---

### **:busts_in_silhouette: Credits**

- [Chris Michael](https://github.com/ChrisMichaelPerezSantiago) (Project Leader, and Developer)

---

### **:anger: Troubleshootings**

This is just a personal project created for study / demonstration purpose and to simplify my working life, it may or may
not be a good fit for your project(s).

---

### **:heart: Show your support**

Please :star: this repository if you like it or this project helped you!\
Feel free to open issues or submit pull-requests to help me improving my work.

---

### **:robot: Author**

_*Chris Michael*_

> You can follow me on
> [github](https://github.com/ChrisMichaelPerezSantiago)&nbsp;&middot;&nbsp;[twitter](https://twitter.com/Chris5855M)

---

Copyright ©2021 [use-services-hook](https://github.com/ChrisMichaelPerezSantiago/use-services-hook).
