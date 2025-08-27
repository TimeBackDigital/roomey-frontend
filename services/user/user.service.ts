import { UserListType } from "@/lib/type";
import axios from "axios";

export const UserService = {
  getUserList: async (params: {
    search?: string;
    startDate?: Date;
    endDate?: Date;
    take?: number;
  }) => {
    const response = await axios.get("/api/user", { params });

    if (!response.status) {
      throw new Error(response.data.message);
    }

    return response.data as {
      data: UserListType[];
      total: number;
    };
  },
};
