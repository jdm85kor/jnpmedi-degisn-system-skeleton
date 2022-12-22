export type IconTypes = "none" | "eraser";

export interface GrIconProps {
  name: IconTypes;
}

export function GrIcon(props: GrIconProps) {
  const css = {
    width: "20px",
    height: "20px",
    margin: "0 0.5rem",
  };

  return (
    <span css={css}>
      <svg
        width="22"
        height="20"
        viewBox="0 0 22 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M4.37139 9.31431L12.6857 1L14.1529 2.46723L19.5328 7.84707L21 9.31431L13.1748 17.1395H17.0874V19.0958H11.2185H5.34954C5.34954 19.0958 3.3932 17.1395 1.92601 15.6723C0.458808 14.2051 0.947866 12.7378 1.92601 11.7597C2.90415 10.7815 4.37139 9.31431 4.37139 9.31431ZM7.30585 9.31431L12.7312 14.6487L17.9988 9.381L12.6857 3.93446L7.30585 9.31431ZM3.39324 13.2269C3.5427 13.0775 5.83862 10.7815 5.83862 10.7815L11.2185 16.1614L10.2403 17.1395H6.3277C6.3277 17.1395 3.5558 14.3739 3.39324 14.2051C3.23068 14.0363 3.24378 13.3764 3.39324 13.2269Z"
          fill="#21282B"
          stroke="black"
          stroke-width="0.1"
        />
      </svg>
    </span>
  );
}
