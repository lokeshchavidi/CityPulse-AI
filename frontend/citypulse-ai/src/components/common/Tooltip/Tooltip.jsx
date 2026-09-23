import { createPortal } from "react-dom";

/**
 * Fixed hex colors — theme-remapped slate would make the tooltip light in
 * dark mode and white label text would disappear.
 */
const Tooltip = ({ text, x, y, visible }) => {
  if (!visible) return null;

  return createPortal(
    <div
      style={{
        position: "fixed",
        left: x,
        top: y,
        transform: "translateY(-50%)",
      }}
      className="
        pointer-events-none
        z-[9999]

        rounded-xl
        bg-[#0f172a]
        px-3
        py-2

        text-xs
        font-medium
        text-white
        whitespace-nowrap

        shadow-2xl
        shadow-black/30

        backdrop-blur-sm

        animate-in
        fade-in
        duration-150
      "
      role="tooltip"
    >
      {text}

      {/* Arrow */}
      <div
        className="
          absolute
          -left-1
          top-1/2
          h-2
          w-2
          -translate-y-1/2
          rotate-45
          bg-[#0f172a]
        "
      />
    </div>,
    document.body,
  );
};

export default Tooltip;
