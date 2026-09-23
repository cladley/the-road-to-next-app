import { LucideMessageSquareWarning } from "lucide-react";
import { cloneElement } from "react";

type PlaceholderProps = {
  label: string;
  icon?: React.ReactElement<any>;
  button?: React.ReactNode;
};

export const Placeholder = ({
  label,
  button = <div className="h-10" />, // div placeholder by default for layout. Same size as a button
  icon = <LucideMessageSquareWarning />,
}: PlaceholderProps) => {
  return (
    <div className="flex-1 self-center flex flex-col items-center justify-center gap-y-2">
      {cloneElement(icon, { className: "w-16 h-16" })}
      <h2 className="text-lg text-center">{label}</h2>
      {button}
    </div>
  );
};
