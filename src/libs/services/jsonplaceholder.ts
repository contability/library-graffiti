import axios from "axios";
import { apiClient } from "./api-client";
import { Post } from "../../types/api/jsonplaceholder";

const handleApiError = (error: unknown, apiName: string) => {
  if (axios.isAxiosError(error)) {
    throw error;
  }

  console.error(`${apiName} 호출 중 예상치 못한 에러 발생:`, error);
  throw error;
};

export const jsonPlaceholderApi = {
  getPosts: async () => {
    try {
      const response = await apiClient.get<Array<Post>>(
        "https://jsonplaceholder.typicode.com/posts"
      );
      return response.data;
    } catch (error) {
      handleApiError(error, "getPosts");
    }
  },
};
