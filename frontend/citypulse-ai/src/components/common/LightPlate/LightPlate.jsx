/**
 * Keeps logos/illustrations readable in dark mode by placing them on a
 * white plate. Padding is applied in both modes so theme switches do not
 * resize or "zoom" the image.
 */
const paddingMap = {
  none: "",
  sm: "p-1.5",
  md: "p-3",
  lg: "p-4",
};

const LightPlate = ({
  children,
  className = "",
  padding = "md",
  rounded = "rounded-xl",
}) => {
  return (
    <div
      className={`inline-flex items-center justify-center bg-transparent dark:bg-white ${rounded} ${paddingMap[padding] ?? paddingMap.md} ${className}`}
    >
      {children}
    </div>
  );
};

export default LightPlate;
