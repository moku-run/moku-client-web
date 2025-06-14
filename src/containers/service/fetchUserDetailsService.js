import { get } from "../../service/FetchService";

export const fetchUserDetailsService = async ({
  setUser,
  navigate,
  setLoading,
}) => {
  try {
    const result = await get("/users/details");

    if (result.success) {
      const nickname = result.data.payload.nickname;
      const loginId = result.data.payload.login_id;
      setUser({ nickname, login_id: loginId });

      navigate("/stats");
    }
  } finally {
    setLoading(false);
  }
};
