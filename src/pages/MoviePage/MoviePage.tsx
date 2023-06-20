import { useState, useEffect } from "react";
import axios from "axios";
import { selectMoviesEndpoint } from "../../utils/api";

function Movie() {
  const [isLoading, setIsLoading] = useState(true);
  const [userInfo, setUserInfo] = useState("");

  useEffect(() => {
    // Here grab the token from sessionStorage and then make an axios request to profileUrl endpoint.
    // Remember to include the token in Authorization header
    const token = sessionStorage.getItem("authToken");
    axios
      .get(selectMoviesEndpoint, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setIsLoading(false);
        setUserInfo(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return isLoading ? <h1>Loading...</h1> : <h1>Welcome {userInfo}!</h1>;
}

export default Movie;
