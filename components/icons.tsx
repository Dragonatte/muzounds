import * as React from "react";

import { IconSvgProps } from "@/types";
export const MoonFilledIcon = ({
  size = 24,
  width,
  height,
  ...props
}: IconSvgProps) => (
  <svg
    aria-hidden="true"
    focusable="false"
    height={size || height}
    role="presentation"
    viewBox="0 0 24 24"
    width={size || width}
    {...props}
  >
    <path
      d="M21.53 15.93c-.16-.27-.61-.69-1.73-.49a8.46 8.46 0 01-1.88.13 8.409 8.409 0 01-5.91-2.82 8.068 8.068 0 01-1.44-8.66c.44-1.01.13-1.54-.09-1.76s-.77-.55-1.83-.11a10.318 10.318 0 00-6.32 10.21 10.475 10.475 0 007.04 8.99 10 10 0 002.89.55c.16.01.32.02.48.02a10.5 10.5 0 008.47-4.27c.67-.93.49-1.519.32-1.79z"
      fill="currentColor"
    />
  </svg>
);

export const SunFilledIcon = ({
  size = 24,
  width,
  height,
  ...props
}: IconSvgProps) => (
  <svg
    aria-hidden="true"
    focusable="false"
    height={size || height}
    role="presentation"
    viewBox="0 0 24 24"
    width={size || width}
    {...props}
  >
    <g fill="currentColor">
      <path d="M19 12a7 7 0 11-7-7 7 7 0 017 7z" />
      <path d="M12 22.96a.969.969 0 01-1-.96v-.08a1 1 0 012 0 1.038 1.038 0 01-1 1.04zm7.14-2.82a1.024 1.024 0 01-.71-.29l-.13-.13a1 1 0 011.41-1.41l.13.13a1 1 0 010 1.41.984.984 0 01-.7.29zm-14.28 0a1.024 1.024 0 01-.71-.29 1 1 0 010-1.41l.13-.13a1 1 0 011.41 1.41l-.13.13a1 1 0 01-.7.29zM22 13h-.08a1 1 0 010-2 1.038 1.038 0 011.04 1 .969.969 0 01-.96 1zM2.08 13H2a1 1 0 010-2 1.038 1.038 0 011.04 1 .969.969 0 01-.96 1zm16.93-7.01a1.024 1.024 0 01-.71-.29 1 1 0 010-1.41l.13-.13a1 1 0 011.41 1.41l-.13.13a.984.984 0 01-.7.29zm-14.02 0a1.024 1.024 0 01-.71-.29l-.13-.14a1 1 0 011.41-1.41l.13.13a1 1 0 010 1.41.97.97 0 01-.7.3zM12 3.04a.969.969 0 01-1-.96V2a1 1 0 012 0 1.038 1.038 0 01-1 1.04z" />
    </g>
  </svg>
);

export const HeartFilledIcon = ({
  size = 24,
  width,
  height,
  ...props
}: IconSvgProps) => (
  <svg
    aria-hidden="true"
    focusable="false"
    height={size || height}
    role="presentation"
    viewBox="0 0 24 24"
    width={size || width}
    {...props}
  >
    <path
      d="M12.62 20.81c-.34.12-.9.12-1.24 0C8.48 19.82 2 15.69 2 8.69 2 5.6 4.49 3.1 7.56 3.1c1.82 0 3.43.88 4.44 2.24a5.53 5.53 0 0 1 4.44-2.24C19.51 3.1 22 5.6 22 8.69c0 7-6.48 11.13-9.38 12.12Z"
      fill="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
    />
  </svg>
);
export const SongActions: React.FC<IconSvgProps> = (
  props: IconSvgProps,
): React.JSX.Element => {
  const { width, height = 24 } = props;

  return (
    <svg
      fill="#e8eaed"
      height={height}
      viewBox="0 -960 960 960"
      width={width}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M480-160q-33 0-56.5-23.5T400-240q0-33 23.5-56.5T480-320q33 0 56.5 23.5T560-240q0 33-23.5 56.5T480-160Zm0-240q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm0-240q-33 0-56.5-23.5T400-720q0-33 23.5-56.5T480-800q33 0 56.5 23.5T560-720q0 33-23.5 56.5T480-640Z" />
    </svg>
  );
};

export const SearchIcon: React.FC<IconSvgProps> = (
  props: IconSvgProps,
): React.JSX.Element => {
  const { width, height = 24 } = props;

  return (
    <svg
      fill="#e8eaed"
      height={height}
      viewBox="0 -960 960 960"
      width={width}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M380-320q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l224 224q11 11 11 28t-11 28q-11 11-28 11t-28-11L532-372q-30 24-69 38t-83 14Zm0-80q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" />
    </svg>
  );
};

export const FavoriteIcon: React.FC<IconSvgProps> = (
  props: IconSvgProps,
): React.JSX.Element => {
  const { width, height = 24 } = props;

  return (
    <svg
      fill="#e8eaed"
      height={height}
      viewBox="0 -960 960 960"
      width={width}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M480-147q-14 0-28.5-5T426-168l-69-63q-106-97-191.5-192.5T80-634q0-94 63-157t157-63q53 0 100 22.5t80 61.5q33-39 80-61.5T660-854q94 0 157 63t63 157q0 115-85 211T602-230l-68 62q-11 11-25.5 16t-28.5 5Z" />
    </svg>
  );
};

export const EmptyFavoriteIcon: React.FC<IconSvgProps> = (
  props: IconSvgProps,
): React.JSX.Element => {
  const { width, height = 24 } = props;

  return (
    <svg
      fill="#e8eaed"
      height={height}
      viewBox="0 -960 960 960"
      width={width}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M480-147q-14 0-28.5-5T426-168l-69-63q-106-97-191.5-192.5T80-634q0-94 63-157t157-63q53 0 100 22.5t80 61.5q33-39 80-61.5T660-854q94 0 157 63t63 157q0 115-85 211T602-230l-68 62q-11 11-25.5 16t-28.5 5Zm-38-543q-29-41-62-62.5T300-774q-60 0-100 40t-40 100q0 52 37 110.5T285.5-410q51.5 55 106 103t88.5 79q34-31 88.5-79t106-103Q726-465 763-523.5T800-634q0-60-40-100t-100-40q-47 0-80 21.5T518-690q-7 10-17 15t-21 5q-11 0-21-5t-17-15Zm38 189Z" />
    </svg>
  );
};

export const AddIcon: React.FC<IconSvgProps> = (
  props: IconSvgProps,
): React.JSX.Element => {
  const { width, height = 24 } = props;

  return (
    <svg
      fill="#e8eaed"
      height={height}
      viewBox="0 -960 960 960"
      width={width}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M440-440H240q-17 0-28.5-11.5T200-480q0-17 11.5-28.5T240-520h200v-200q0-17 11.5-28.5T480-760q17 0 28.5 11.5T520-720v200h200q17 0 28.5 11.5T760-480q0 17-11.5 28.5T720-440H520v200q0 17-11.5 28.5T480-200q-17 0-28.5-11.5T440-240v-200Z" />
    </svg>
  );
};

export const PlayNextIcon: React.FC<IconSvgProps> = (
  props: IconSvgProps,
): React.JSX.Element => {
  const { width, height = 24 } = props;

  return (
    <svg
      fill="#e8eaed"
      height={height}
      viewBox="0 -960 960 960"
      width={width}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M160-320q-17 0-28.5-11.5T120-360q0-17 11.5-28.5T160-400h240q17 0 28.5 11.5T440-360q0 17-11.5 28.5T400-320H160Zm0-160q-17 0-28.5-11.5T120-520q0-17 11.5-28.5T160-560h400q17 0 28.5 11.5T600-520q0 17-11.5 28.5T560-480H160Zm0-160q-17 0-28.5-11.5T120-680q0-17 11.5-28.5T160-720h400q17 0 28.5 11.5T600-680q0 17-11.5 28.5T560-640H160Zm511 499q-5 3-10 3t-10-2q-5-2-8-6.5t-3-10.5v-246q0-6 3-10.5t8-6.5q5-2 10-2t10 3l184 122q5 3 7 7.5t2 9.5q0 5-2 9.5t-7 7.5L671-141Z" />
    </svg>
  );
};

export const HomeIcon: React.FC<IconSvgProps> = (
  props: IconSvgProps,
): React.JSX.Element => {
  const { width, height = 24 } = props;

  return (
    <svg
      fill="#e8eaed"
      height={height}
      viewBox="0 -960 960 960"
      width={width}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M160-200v-360q0-19 8.5-36t23.5-28l240-180q21-16 48-16t48 16l240 180q15 11 23.5 28t8.5 36v360q0 33-23.5 56.5T720-120H600q-17 0-28.5-11.5T560-160v-200q0-17-11.5-28.5T520-400h-80q-17 0-28.5 11.5T400-360v200q0 17-11.5 28.5T360-120H240q-33 0-56.5-23.5T160-200Z" />
    </svg>
  );
};

export const EditIcon: React.FC<IconSvgProps> = (
  props: IconSvgProps,
): React.JSX.Element => {
  const { width, height = 24 } = props;

  return (
    <svg
      fill="#232323"
      height={height}
      viewBox="0 -960 960 960"
      width={width}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M160-120q-17 0-28.5-11.5T120-160v-97q0-16 6-30.5t17-25.5l505-504q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L313-143q-11 11-25.5 17t-30.5 6h-97Zm544-528 56-56-56-56-56 56 56 56Z" />
    </svg>
  );
};

export const VolumeIcon: React.FC<IconSvgProps> = (
  props: IconSvgProps,
): React.JSX.Element => {
  const { width, height = 24 } = props;

  return (
    <svg
      fill="#e8eaed"
      height={height}
      viewBox="0 -960 960 960"
      width={width}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M760-481q0-83-44-151.5T598-735q-15-7-22-21.5t-2-29.5q6-16 21.5-23t31.5 0q97 43 155 131.5T840-481q0 108-58 196.5T627-153q-16 7-31.5 0T574-176q-5-15 2-29.5t22-21.5q74-34 118-102.5T760-481ZM280-360H160q-17 0-28.5-11.5T120-400v-160q0-17 11.5-28.5T160-600h120l132-132q19-19 43.5-8.5T480-703v446q0 27-24.5 37.5T412-228L280-360Zm380-120q0 42-19 79.5T591-339q-10 6-20.5.5T560-356v-250q0-12 10.5-17.5t20.5.5q31 25 50 63t19 80Z" />
    </svg>
  );
};

export const PlayIcon: React.FC<IconSvgProps> = (
  props: IconSvgProps,
): React.JSX.Element => {
  const { width, height = 24 } = props;

  return (
    <svg
      fill="#e8eaed"
      height={height}
      viewBox="0 -960 960 960"
      width={width}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M320-273v-414q0-17 12-28.5t28-11.5q5 0 10.5 1.5T381-721l326 207q9 6 13.5 15t4.5 19q0 10-4.5 19T707-446L381-239q-5 3-10.5 4.5T360-233q-16 0-28-11.5T320-273Z" />
    </svg>
  );
};

export const PauseIcon: React.FC<IconSvgProps> = (
  props: IconSvgProps,
): React.JSX.Element => {
  const { width, height = 24 } = props;

  return (
    <svg
      fill="#e8eaed"
      height={height}
      viewBox="0 -960 960 960"
      width={width}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M640-200q-33 0-56.5-23.5T560-280v-400q0-33 23.5-56.5T640-760q33 0 56.5 23.5T720-680v400q0 33-23.5 56.5T640-200Zm-320 0q-33 0-56.5-23.5T240-280v-400q0-33 23.5-56.5T320-760q33 0 56.5 23.5T400-680v400q0 33-23.5 56.5T320-200Z" />
    </svg>
  );
};

export const PreviousIcon: React.FC<IconSvgProps> = (
  props: IconSvgProps,
): React.JSX.Element => {
  const { width, height = 24 } = props;

  return (
    <svg
      fill="#e8eaed"
      height={height}
      viewBox="0 -960 960 960"
      width={width}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M220-280v-400q0-17 11.5-28.5T260-720q17 0 28.5 11.5T300-680v400q0 17-11.5 28.5T260-240q-17 0-28.5-11.5T220-280Zm458-1L430-447q-9-6-13.5-14.5T412-480q0-10 4.5-18.5T430-513l248-166q5-4 11-5t11-1q16 0 28 11t12 29v330q0 18-12 29t-28 11q-5 0-11-1t-11-5Z" />
    </svg>
  );
};

export const NextIcon: React.FC<IconSvgProps> = (
  props: IconSvgProps,
): React.JSX.Element => {
  const { width, height = 24 } = props;

  return (
    <svg
      fill="#e8eaed"
      height={height}
      viewBox="0 -960 960 960"
      width={width}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M660-280v-400q0-17 11.5-28.5T700-720q17 0 28.5 11.5T740-680v400q0 17-11.5 28.5T700-240q-17 0-28.5-11.5T660-280Zm-440-35v-330q0-18 12-29t28-11q5 0 11 1t11 5l248 166q9 6 13.5 14.5T548-480q0 10-4.5 18.5T530-447L282-281q-5 4-11 5t-11 1q-16 0-28-11t-12-29Z" />
    </svg>
  );
};
