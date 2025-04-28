import { useQuery } from "@tanstack/react-query";
import { jsonPlaceholderApi } from "../../services/jsonplaceholder";
import axios from "axios";

const handleError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    return error;
  }

  console.error("API 호출 중 예상치 못한 에러 발생:", error);
  return error;
};

export const usePosts = () =>
  useQuery({
    queryKey: ["GET", "posts"],
    queryFn: async () => {
      try {
        return await jsonPlaceholderApi.getPosts();
      } catch (error) {
        handleError(error);
        throw error;
      }
    },
    enabled: false,
  });
