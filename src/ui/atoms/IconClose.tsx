type IconCloseProps = {
  className?: string;
};

export function IconClose({ className = "h-5 w-5" }: IconCloseProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M18 6L6 18M6 6l12 12" />
    </svg>
  );
}
