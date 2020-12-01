import moment from "moment";
import Cookies from 'universal-cookie';
const cookies = new Cookies();


export default () => {
  let user = cookies.get("user");
  let apiToken = cookies.get('api-token');
  let projectType = cookies.get('project-type')

  const setAuth = ({ token, user } = {}) => {
    const options = {
      path: "/",
      //maxAge: 86400 * 365
      expires: moment().add(1, "years").toDate(),
    };
    cookies.set("api-token", apiToken, options);
    cookies.set("project-type", projectType, options);
    cookies.set("user", user, options);
  };
  const logout = () => {
    cookies.remove("api-token", {
      path: "/",
    });
    cookies.remove("user", {
      path: "/",
    });
    cookies.remove("project-type", {
      path: "/",
    });
  };
  return {
    user,
    apiToken,
    projectType,
    setAuth,
    logout,
  };
};
