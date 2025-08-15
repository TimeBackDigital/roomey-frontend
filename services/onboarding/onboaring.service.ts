import { RoleKey } from "@/lib/type";
import axios from "axios";

const OnboardingService = {
  createOnboarding: async (params: {
    role: RoleKey;
    profilePhoto: string;
    allowMarketing?: boolean;
    allowVerification?: boolean;
  }) => {
    const response = await axios.post(`/api/user/onboarding`, params, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.status) {
      throw new Error(response.data.message);
    }

    return response.data;
  },
};

export default OnboardingService;
