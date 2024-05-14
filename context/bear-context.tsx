import { createContext } from "react";
import { BearStore } from "@/stores/bear-store";

export const BearContext = createContext<BearStore | null>(null);
