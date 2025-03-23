const URL = "https://localhost:7279";

export default {
  Student: {
    get: (id,gradId,limit=1000000,page=1) => {
      return fetch(`${URL}/Student/${id || ""}?limit=${limit}&page=${page}${gradId}`).then((response) =>
        response.json()
      );
    },
    getAll: (limit=1000000,page=1) => {
      return fetch(`${URL}/Student?limit=${limit}&page=${page}`).then((response) =>
        response.json()
      );
    },
    getAllInCurrentClass: (classId,limit=1000000,page=1) => {
      return fetch(`${URL}/Student?limit=${limit}&page=${page}&classId=${classId}`).then((response) =>
        response.json()
      );
    },
    getStudentsByName: (key,limit=1000000,page=1) => {
      return fetch(`${URL}/Student/Filter?page=${page}&pageSize=${limit}&content=${key}`).then((response)  =>
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
  Absence : {
    get: () => {
      
    },
    post : (userIds,date) => {
      return fetch(`${URL}/Student/Absence?date=${date}` ,{
        method: "POST",
        body: JSON.stringify(userIds),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
    }
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
      },
      SpecificGrade : (gradeId) => {
        return fetch(`${URL}/Class?gradeId=${gradeId}`).then((response) =>
          response.json()
        );
      },
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
    get: {
      get : (id,limit=1000000,page=1) => {
        return fetch(`${URL}/Teacher/${id || ''}?listSize=${limit}&page=${page}`).then((response) =>
          response.json()
        );
      },
      getAll : (limit=10000000,page=1) => {
        return fetch(`${URL}/Teacher?listSize=${limit}&page=${page}`).then((response) =>
          response.json()
        );
      },
      SearchOnCurrentTeacherName: (searchKey) => {
        return fetch(`${URL}/Teacher/Filter?content=${searchKey}`).then((response) =>
          response.json()
        );
      },
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
    get: {
      specifyTeacher : (id) => {
        return fetch(`${URL}/Teacher/${id}/Class`).then((response) =>
          response.json()
        );
      },
      AllTeacher : (grade) => {
        return fetch(`${URL}/Teacher/Subject?grade=${grade}`).then((response) =>
          response.json()
        );
      }
    },
    post: (data) => {
      return fetch(`${URL}/Teacher/Subject`, {
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
      inComeBalanceInRange: (startDate,endDate) => {
        return fetch(`${URL}/Bill/Total/Income?startDate=${startDate}&endDate=${endDate}`).then((response) =>
          response.json()
        );
      },
      outComeBalanceInRange: (startDate,endDate) => {
        return fetch(`${URL}/Bill/Total/Outcome?startDate=${startDate}&endDate=${endDate}`).then((response) =>
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
      },
      showBill: (sortingType) => {
        return fetch(`${URL}/Bill?limit=1&page=1&orderBy=Date&orderingType=${sortingType}`).then((response) =>
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
      },
      AllTestInTheClasss : (classId,linkedTest,correctionTest) => {
        return fetch(`${URL}/Class/${classId}/Test?flag=${correctionTest}&showLinked=${linkedTest}`).then((response) =>{
          return response.json()}
        );
      },
      StudentTestInCurrentReport : (studentId,reportId) => {
        return fetch(`${URL}/Test/Student/${studentId}?reportId=${reportId}`).then((response) =>{
          return response.json()}
        );
      },
      StudentTestNotAddedToReport : (studentId) => {
        return fetch(`${URL}/Test/Student/${studentId}`).then((response) =>{
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
    put: {
      removeTestFromReport : (data) => {
        return fetch(`${URL}/Test`, {
          method: "PUT",
          body: JSON.stringify(data),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        });
      },
      changeMark: (testMark,testId,testDate) => {
        return fetch(`${URL}/Test/${testId}/Marks?correctionDate=${testDate}`, {
          method: "PUT",
          body: JSON.stringify(testMark),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        });
      }
    } ,
    delete: (id) => {
      return fetch(`${URL}/Student/${id}`, {
        method: "DELETE",
      });
    },
  },
  Report: {
    get: {
      AllReports : (id,queryParams = '') => {
        return fetch(`${URL}/Report/${id || ''}${queryParams}`).then((response) =>{
          return response.json()
        }
        );
      },
      spesifyReports : (gradeId) => {
        return fetch(`${URL}/Report?gradeId=${gradeId}`).then((response) =>
          response.json()
        );
      },
      AllClassReports : (classId) => {
        return fetch(`${URL}/Report?classId=${classId}`).then((response) =>
          response.json()
        );
      },
      AvgCurrentClassReport :  (reportId,classId,type) => {
        return fetch(`${URL}/Report/Class/Average?reportId=${reportId}&classId=${classId}&type=${type}`).then((response) =>
          response.json()
        );
      },
      AllStudent : (reportId,classId) => {
        return fetch(`${URL}/Report/${reportId}/Student/Result?classId=${classId}`).then((response) =>
          response.json()
        );
      },
      AllStudentsMarkInCurrentReport : (reportId,classId) => {
        return fetch(`${URL}/Report/${reportId}/Class/${classId}/Result`).then((response) =>
          response.json()
        );
      },      
      AllReportsAvgInCurrentClass : (classId) => {
        return fetch(`${URL}/Report/Class/Average?classId=${classId}`).then((response) =>
          response.json()
        );
      },      
      StudentReports : (studentId) => {
        return fetch(`${URL}/Report/Student/${studentId}/Result`).then((response) =>
          response.json()
        );
      },
      StudnetReportsAvg : (studnetId) => {
        return fetch(`${URL}/Report/Student/Average?studentId=${studnetId}`).then((response) =>
          response.json()
        );
      },
      TopOneStudents : (reportId) => {
        return fetch(`${URL}/Report/${reportId}/Top`).then((response) =>
          response.json()
        );
      },
      TopOneClasses: (reportId) => {
        return fetch(`${URL}/Report/Class/Average?reportId=${reportId}`).then((response) =>
          response.json()
        );
      },

    },
    post: (data) => {
      return fetch(`${URL}/Report`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
    },
    put: (reportId,data) => {
      return fetch(`${URL}/Report/${reportId}/Test`, {
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
  Statistics : {
    get : {
      countByType : () => {
        return fetch(`${URL}/Grade/Count`).then((response) =>
          response.json()
        );
      },
      TeacherRateBySubject: (subjectId) => {
        return fetch(`${URL}/Report/Teacher/rate?subjectId=${subjectId}&limit=200&page=1`).then((response) =>
          response.json()
        );
      }
    }
  },
  Grade : {
    get : () => {
      return fetch(`${URL}/Grade`).then((response) =>
        response.json()
      );
    },
    put: (data) => {
      return fetch(`${URL}/Grade`, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
    }
    ,
    post : (data) => {
      return fetch(`${URL}/Grade`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
    },
    delete: (gradeId) => {
      return fetch(`${URL}/Grade/${gradeId}`, {
        method: "DELETE",
      });
    },
  
  },
  Setting : {
    get : () => {
      return fetch(`${URL}/Settings`).then((response) =>
        response.json()
      );
    },
    put: (data) => {
      return fetch(`${URL}/Settings`, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
    }
  },
  Authentication : {
    post : (data) => {
      return fetch(`${URL}/User/Login`, {
        method: "POST",
        body: JSON.stringify(data), 
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
    },
    put : {
      logout : () => {
        return fetch(`${URL}/User/Logout`, {
          method: "POST",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        });
      },
      changePassword : (data) => {
        return fetch(`${URL}/User/Password`, {
          method: "POST",
          body: JSON.stringify(data), 
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        });
      },
    } 
  }
};
