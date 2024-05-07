import React, { PropsWithChildren } from "react";

export default function Grid({ children }: PropsWithChildren) {
  return <div className="grid w-full grid-cols-[14rem_1fr]">{children}</div>;
}
