const URL = "https://localhost:7279";

export default {
  Student: {
    get: (id) => {
      return fetch(`${URL}/Student/${id || ""}`).then((response) =>
        response.json()
      );
    },
    post: (data) => {
      fetch(`${URL}/Student`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
    },
    put: () => {},
    delete: () => {},
  },
  Class: {
    get: (id) => {
      return fetch(`${URL}/class/${id || ""}`).then((response) =>
        response.json()
      );
    },
    post: () => {},
    put: () => {},
    delete: () => {},
  },
};
