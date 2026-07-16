import { useRef, useState } from "react";

const useTooltip = () => {
  const ref = useRef(null);

  const [position, setPosition] = useState({
    x: 0,
    y: 0,
    visible: false,
  });

  const showTooltip = () => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();

    setPosition({
      visible: true,
      x: rect.right + 12,
      y: rect.top + rect.height / 2,
    });
  };

  const hideTooltip = () => {
    setPosition((previous) => ({
      ...previous,
      visible: false,
    }));
  };

  return {
    ref,
    position,
    showTooltip,
    hideTooltip,
  };
};

export default useTooltip;
