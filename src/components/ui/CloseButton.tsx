"use client";

interface CloseButtonProps {
  label?: string;
  onClick?: () => void;
}

export default function CloseButton({
  label = "Close Tab",
  onClick,
}: CloseButtonProps) {
  const handleClick = () => {
    if (onClick) onClick();
    else window.close();
  };

  return (
    <button
      type="button" // explicit type
      onClick={handleClick}
      className="close-btn noselect"
      aria-label={label}
    >
      <span className="close-text">{label}</span>

      <span className="close-icon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          role="img"
          aria-labelledby="closeButtonIconTitle"
        >
          <title id="closeButtonIconTitle">Close Icon</title>

          <path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z" />
        </svg>
      </span>
    </button>
  );
}
