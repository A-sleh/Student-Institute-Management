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
    put: (data) => {
      fetch(`${URL}/Student`, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
    },
    delete: (id) => {
      return fetch(`${URL}/Student/${id || ""}`, {
        method: "DELETE",
      });
    },
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
