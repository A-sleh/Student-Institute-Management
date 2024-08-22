const URL = "https://localhost:7279";

export default {
  Student: {
    get: (id) => {
      return fetch(`${URL}/Student/${id || ""}`).then((response) =>
        response.json()
      );
    },
    post: (data) => {
      return fetch(`${URL}/Student`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
    },
    put: (data) => {
      return fetch(`${URL}/Student`, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
    },
    delete: (id) => {
      console.log(id)
      return fetch(`${URL}/Student/${id}`, {
        method: "DELETE",
      });
    },
  },
  Class: {
    get: (id) => {
      return fetch(`${URL}/Class/${id || ""}`).then((response) =>
        response.json()
      );
    },
    post: (data) => {
      return fetch(`${URL}/Class`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
    },
    put: (data) => {
      return fetch(`${URL}/Class`, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
    },
    delete: (id) => {
      return fetch(`${URL}/Class/${id || ''}`, {
        method: "DELETE",
      });
    },
  },
  Subject: {
    get: (id) => {
      return fetch(`${URL}/Subject/${id || ""}`).then((response) =>
        response.json()
      );
    },
    post: (data) => {
      return fetch(`${URL}/Subject`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
    },
    put: (data) => {
      return fetch(`${URL}/Subject`, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
    },
    delete: (id) => {
      return fetch(`${URL}/Subject/${id}`, {
        method: "DELETE",
      });
    },
  },
};
