import * as Toast from "@radix-ui/react-toast";

export default function SuccessToast({
  message,
  open,
  setOpen,
}: {
  message: string;
  open: boolean;
  setOpen: (val: boolean) => void;
}) {
  return (
    <Toast.Provider swipeDirection="right">
      <Toast.Root
        open={open}
        onOpenChange={setOpen}
        className="bg-green-500 text-white px-4 py-2 rounded shadow-lg flex items-center gap-2"
        duration={3000}
      >
        <Toast.Title className="font-bold">Success</Toast.Title>
        <Toast.Description>{message}</Toast.Description>
        <Toast.Close className="ml-auto cursor-pointer">×</Toast.Close>
      </Toast.Root>
      <Toast.Viewport className="fixed top-4 left-1/2 -translate-x-1/2 flex flex-col gap-2 w-auto z-50" />
    </Toast.Provider>
  );
}
