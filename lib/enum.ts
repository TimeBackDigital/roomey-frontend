export const ROLE_SLUG = {
  admin: "s",
  seeker: "",
  lister: "l",
} as const;

export const READY_TO_FIND_CARD = {
  seeker: {
    title: "Ready to Find Your New Place?",
    description:
      "Your profile's ready—time to find a room that fits your vibe and meet future housemates.",
    cta: "Search Available Rooms",
  },
  lister: {
    title: "Find the Perfect Housemate",
    description:
      "You’re all set! Start browsing tenant profiles and connect with those who match your listing.",
    cta: "Browse Seekers",
  },
} as const;

export const COMPLETE_PROFILE_CARD = {
  seeker: {
    title: "Profile Complete!",
    header: "Profile Completed",
    description: "You're all set to start your search.",
  },
  lister: {
    title: "Listing Complete!",
    header: "Listing Complete",
    description: "Your listing is live—start connecting with tenants today! 🎉",
  },
} as const;
