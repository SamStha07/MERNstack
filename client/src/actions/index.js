import axios from "axios";

import { FETCH_USER } from "./Types";

//fetching the current login user
export const fetchUser = () => {
  return async function (dispatch) {
    const response = await axios.get("/api/current_user");
    dispatch({
      type: FETCH_USER,
      payload: response.data,
    });
  };
};

// Using this method to logout makes more sense which helps to not reload the page
// export const logoutUser = (id) => {
//     return async function(dispatch){
//         const response = await axios.get('/api/logout')
//     }
// }
