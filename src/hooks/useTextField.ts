import { useState } from "react";

const useTextField = (initialValue?: string) => {
  const [text, setText] = useState(initialValue ?? "");

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setText(value);
  };

  return [text, onChange] as const;
};

export default useTextField;
