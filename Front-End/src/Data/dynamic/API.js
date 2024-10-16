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
      return fetch(`${URL}/Student/${id}`, {
        method: "DELETE",
      });
    },
  },
  Class: {
    get: {
      All : (id) => {
        return fetch(`${URL}/Class/${id || ""}`).then((response) =>
          response.json()
        );
      },
      Teacher: (classId) => {
        return fetch(`${URL}/Class/${classId}/Teacher`).then((response) =>
          response.json()
        );
      }
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
  Teacher: {
    get: (id) => {
      return  fetch(`${URL}/Teacher/${id || ''}`).then((response) =>{
        return response.json()
      }

      );
    },
    post: (data) => {
      return fetch(`${URL}/Teacher`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
    },
    put: (data) => {
      return fetch(`${URL}/Teacher`, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
    },
    delete: (id) => {
      return fetch(`${URL}/Teacher/${id}`, {
        method: "DELETE",
      });
    },
  },
  TeacherSubject : {
    get: (id) => {
      return fetch(`${URL}/Teacher/${id}/Class`).then((response) =>
        response.json()
      );
    },
    post: (teacherId,data) => {
      return fetch(`${URL}/Teacher/${teacherId}/Subject`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
    },
    put: (teacherId,subjectId ,salary) => {
      return fetch(`${URL}/Teacher/${teacherId}/Subject/${subjectId}?Salary=${salary}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
    },
    delete: (teacherSubjectId) => {
      return fetch(`${URL}/Teacher/Subject/${teacherSubjectId}`, {
        method: "DELETE",
      });
    },
  },
  TeacherClass : {
    get: (id) => {
      return fetch(`${URL}/Teacher/${id || ""}/Class`).then((response) =>
        response.json()
      );
    },
    post : (teacherSubject,classId) => {
      return fetch(`${URL}/Teacher/Subject/${teacherSubject}/class/${classId}`, {
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
    },
    delete: (teacherSubjectId,classId) => {
      return fetch(`${URL}/Teacher/Subject/${teacherSubjectId}/class/${classId}`, {
        method: "DELETE",
      });
    },
  },
  ClassSubject : {
    get: (id) => {
      return fetch(`${URL}/Class/${id}/Subject`).then((response) =>
        response.json()
      );
    },
  },
  Bill : {
    get:{
      global : (limit,type) => {
        return fetch(`${URL}/Bill?type=${type}&limit=${limit}`).then((response) =>
          response.json()
        );
      },
      class : (id) => {
          return fetch(`${URL}/Bill/Class/${id}`).then((response) =>
            response.json()
          );
      },
      teacher : {
        AllDetails : (id) => {
          return fetch(`${URL}/Bill/Teacher/${id}`).then((response) =>
            response.json()
          );
        },
        Balance: (id) => {
            return fetch(`${URL}/Bill/Teacher/${id}/balance`).then((response) =>
              response.json()
            );
        }
      },
      student : {
        AllDetails : (id) => {
          return fetch(`${URL}/Bill/Student/${id}`).then((response) =>
            response.json()
          );
        },
        Balance: (id) => {
            return fetch(`${URL}/Bill/Student/${id}/balance`).then((response) =>
              response.json()
            );
        }
      },
      inComeBill : () => {
        return fetch(`${URL}/Bill/External/in`).then((response) =>
          response.json()
        );
      },
      outComeBill : () => {
        return fetch(`${URL}/Bill/External/out`).then((response) =>
          response.json()
        );
      },
      restInComeBill : () => {
        return fetch(`${URL}/Bill/Rest/in`).then((response) =>
          response.json()
        );
      },
      restOutComeBill : () => {
        return fetch(`${URL}/Bill/Rest/out`).then((response) =>
          response.json()
        );
      },
      inComeBillBalance : () => {
        return fetch(`${URL}/Bill/Total/Income`).then((response) =>
          response.json()
        );
      },
      outComeBillBalance : () => {
        return fetch(`${URL}/Bill/Total/Outcome`).then((response) =>
          response.json()
        );
      }
    },
    post: (data) => {
      return fetch(`${URL}/Bill`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
    },
    put: (teacherId,subjectId ,salary) => {
      return fetch(`${URL}/Teacher/${teacherId}/Subject/${subjectId}?Salary=${salary}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
    },
    delete: (billId) => {
      return fetch(`${URL}/Bill/${billId}`, {
        method: "DELETE",
      });
    },
  },
  Test: {
    get: {
      AllTest : (id) => {
        return fetch(`${URL}/Test/${id || ""}`).then((response) =>
          response.json()
        );
      },
      StudentsMarks : (classId,testId) => {
        return fetch(`${URL}/Test/${testId}/Class/${classId}`).then((response) =>{
          return response.json()}
        );
      },
      ClassesTests : (testId) => {
        return fetch(`${URL}/Test/${testId}/Class`).then((response) =>{
          return response.json()}
        );
      }
    },
    post: {
      CreateNewTest : (data) => {
        return fetch(`${URL}/Test`, {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        });
      },
      ClassTest :(classId,testId) => {
        return fetch(`${URL}/Test/${testId}/Class/${classId}`, {
          method: "POST"
        });
      } 
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
      return fetch(`${URL}/Student/${id}`, {
        method: "DELETE",
      });
    },
  },
};
