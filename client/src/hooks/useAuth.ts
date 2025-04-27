import axiosInstance from "@/api/axios"

const useAuth =  () => {
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
    }
    const fetchUser = () => {

    }
    return {signup, login, fetchUser}
} ;

export default useAuth;