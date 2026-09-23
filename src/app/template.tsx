import { RedirectToast } from "@/components/redirect-toast";

type RootTemplateProps = {
  children: React.ReactNode;
};

// template.tsx file should rerender on every url change which
// doesn't happen with the layout.tsx page which will only run once.
// For this reason we put the RedirectToast here as we want to
// check the cookies on every path change to see if we should
// show the toast. Because of a bug in NextJs template.tsx file,
// I still need to check the path in the RedirectToast hook
// to determine to show the toast. If there was no bug, we could
// remove the pathname in the useEffect in RedirectToast

export default function RootTemplate({ children }: RootTemplateProps) {
  return (
    <>
      <>{children}</>
      <RedirectToast />
    </>
  );
}
