import React, { useRef, useEffect } from "react";

const useNotOnStartEffect = (func, deps) => {
  const didMount = useRef(false);

  useEffect(() => {
    if (didMount.current) func();
    else didMount.current = true;
  }, deps);
};

export default useNotOnStartEffect;
