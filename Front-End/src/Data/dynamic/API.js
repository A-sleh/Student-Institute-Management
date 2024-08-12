const URL = "https://localhost:7279";

export default {
  Student : {
    get : {
        students : () => {
           return fetch(`${URL}/Student`)
           .then( response => response.json() ) ;
       },
       student : (id) =>{
           return fetch(`${URL}/Student/${id}`)
           .then( response => response.json() );
       } 
    },
    post: () => {},
    put: () => {},
    delete: () => {},
  },

};


