import { useState } from "react";

const useToggle = (initialState?: boolean) => {
  const [open, setOpen] = useState(initialState ?? false);

  const toggle = (nextState?: boolean) => {
    setOpen((prev) => (nextState ? nextState : !prev));
  };

  return [open, toggle, setOpen] as const;
};

export default useToggle;
