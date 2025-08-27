import { PlanList } from "@/lib/type";
import axios from "axios";

const PlanService = {
  getPlanList: async (params: {
    page: number;
    skip: number;
    orderBy: string;
    sortBy: string;
    type?: string;
    role?: string;
  }) => {
    const response = await axios.get(`/api/plan/list`, { params });

    if (!response.status) {
      throw new Error(response.data.message);
    }

    return response.data as {
      data: PlanList[];
      total: number;
    };
  },
};

export default PlanService;
