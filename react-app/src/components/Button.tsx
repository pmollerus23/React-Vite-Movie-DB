import { useState } from "react";

interface Props {
  label: string;
}

function Button({ label }: Props) {
  const [clicked, setClicked] = useState(false);
  
  return (
    <>
      <button
        type="button"
        className={clicked ? "btn btn-primary" : "btn btn-secondary"}
        onClick={() => {
          setClicked(true);
        }}
      >
        {label}
      </button>
    </>
  );
}

export default Button;
