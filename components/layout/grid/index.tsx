import { cn } from "@/lib/utils";

type GridProps = {
  children: React.ReactNode;
  className?: string;
  cols?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
  xxl?: number;
  gap?: number;
};

export const Grid = ({
  children,
  cols,
  sm,
  md,
  lg,
  xl,
  xxl,
  gap = 0,
  className,
}: GridProps) => {
  const small = sm ? `sm:grid-cols-${sm}` : "";
  const medium = md ? `md:grid-cols-[${md}rem_1fr]` : "";
  const large = lg ? `lg:grid-cols-${lg}` : "";
  const extraLarge = xl ? `xl:grid-cols-${xl}` : "";
  const extraExtraLarge = xxl ? `2xl:grid-cols-${xxl}` : "";
  const gapSize = gap ? `gap-${gap}` : "";

  const responsive = `${small} ${medium} ${large} ${extraLarge} ${extraExtraLarge} ${gapSize}`;

  return (
    <>
      <div
        className={cn(
          [`grid w-full grid-cols-${cols} ${responsive}`],
          className,
        )}
      >
        {children}
      </div>
    </>
  );
};
