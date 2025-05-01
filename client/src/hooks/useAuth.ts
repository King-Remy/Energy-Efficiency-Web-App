import axiosInstance from "@/api/axios"
import Cookie from "universal-cookie"
import { useDispatch } from "react-redux"
import { setUser, clearUser } from "@/store/authSlice"

const cookie = new Cookie()

const useAuth =  () => {

    const dispatch = useDispatch()

    const login = async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }) => {
      const response = await axiosInstance.post("/api/users/login", {
        email,
        password
      });
      const {token, user} = response.data;
      cookie.set("session_token", token)
      dispatch(
        setUser({
            email: user.email,
            username: user.usernmae
        })
      )
      return response.data;
    };
    const signup = async({ email,
        password, username
      }: {
        email: string;
        password: string;
        username: string;
    }) => {
        const response = await axiosInstance.post("/api/users/register", {
            email,
            password,
            username
          });
          return response.data;
    };
    const fetchUser = async () => {

        const sessionToken = cookie.get("session_token")

        try {
            const response = await axiosInstance.get("/api/users/me", {
                headers: {
                    ...(sessionToken) ? {Authorization: `Bearer ${sessionToken}`} : {}
                }
              });
              const {user} = response.data

              if (!user) {
                return dispatch(clearUser())
              }
              dispatch(
                setUser({
                    email: user.email,
                    username: user.username
                })
              )
        } catch (error) {
            
        }
    };

    const logout = async () => {
      cookie.remove("session_token")
      dispatch(clearUser())
    };
    return {signup, login, fetchUser, logout}
} ;

export default useAuth;