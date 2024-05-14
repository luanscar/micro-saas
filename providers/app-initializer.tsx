"use client";

import { useStore } from "@/store/user-store";

export default function AppInitializer({ user, children }) {
  useStore.setState({
    user,
    // ...
  });

  // ...
  return children;
}
