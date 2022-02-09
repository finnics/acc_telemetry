import React, { memo } from "react";

const CarChasis = ({ carDamage }) => {
  const [front, rear, left, right, center] = carDamage;

  const dynamicColor = (damage) => {
    let color;
    if (damage > 100) {
      color = "red";
    } else if (damage > 50 && damage <= 100) {
      color = "orange";
    } else if (damage > 1 && damage <= 50) {
      color = "#8ddb00";
    } else {
      color = "black";
    }
    return color;
  };

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="250"
      height="250"
      version="1.1"
    >
      <g>
        <path
          id="tyre__RL"
          fill="black3"
          d="m82.11,196.59999c0.18,1.72 0.98,3.61 2.02,4.79c0.29,0.33 0.88,0.83 1.31,1.1c1.41,0.92 1.31,0.9 9.37,0.86c7.11,-0.04 7.16,-0.04 7.8,-0.31c1.55,-0.67 2.89,-2.11 3.61,-3.84c0.61,-1.49 0.71,-2.17 0.7,-5.09l0,-2.5l1.57,0l1.57,0l0,-3.96l0,-3.96l-1.57,0l-1.57,0l0,-1.92l0,-1.92l1.57,0l1.57,0l0,-3.96l0,-3.96l-1.57,0l-1.57,0l0,-2.51c0,-2.77 -0.1,-3.57 -0.58,-4.77c-0.9,-2.25 -2.48,-3.81 -4.33,-4.31c-0.6,-0.15 -1.77,-0.17 -7.84,-0.14c-7.06,0.04 -7.13,0.04 -7.76,0.31c-2.36,1.02 -4,3.54 -4.31,6.61c-0.13,1.27 -0.11,28.26 0.01,29.48z"
        ></path>
        <path
          id="tyre__FL"
          fill="black3"
          d="m82.11,77.15999c0.18,1.72 0.98,3.61 2.02,4.79c0.29,0.33 0.88,0.83 1.31,1.1c1.41,0.92 1.31,0.9 9.37,0.86c7.11,-0.04 7.16,-0.04 7.8,-0.31c1.55,-0.67 2.89,-2.11 3.61,-3.84c0.61,-1.49 0.71,-2.17 0.7,-5.09l0,-2.5l1.57,0l1.57,0l0,-3.96l0,-3.96l-1.57,0l-1.57,0l0,-1.92l0,-1.92l1.57,0l1.57,0l0,-3.96l0,-3.96l-1.57,0l-1.57,0l0,-2.51c0,-2.77 -0.1,-3.57 -0.58,-4.77c-0.9,-2.25 -2.48,-3.81 -4.33,-4.31c-0.6,-0.15 -1.77,-0.17 -7.84,-0.14c-7.06,0.04 -7.13,0.04 -7.76,0.31c-2.36,1.02 -4,3.54 -4.31,6.61c-0.13,1.27 -0.11,28.26 0.01,29.48z"
        ></path>
        <path
          id="tyre__FR"
          fill="black3"
          d="m176.89,47.56999c-0.17,-1.72 -0.96,-3.62 -2,-4.8c-0.29,-0.34 -0.88,-0.83 -1.3,-1.11c-1.41,-0.92 -1.3,-0.91 -9.37,-0.91c-7.11,0.01 -7.16,0.01 -7.8,0.28c-1.55,0.66 -2.91,2.09 -3.63,3.82c-0.62,1.48 -0.72,2.16 -0.73,5.09l-0.01,2.5l-1.57,-0.01l-1.57,-0.01l-0.02,3.96l-0.02,3.96l1.57,0.01l1.57,0.01l-0.01,1.92l-0.01,1.92l-1.57,-0.01l-1.57,-0.01l-0.02,3.96l-0.02,3.96l1.57,0.01l1.57,0.01l-0.01,2.51c-0.01,2.77 0.08,3.57 0.56,4.77c0.89,2.26 2.45,3.82 4.31,4.33c0.6,0.15 1.77,0.18 7.84,0.18c7.06,-0.01 7.13,-0.01 7.76,-0.28c2.37,-1.01 4.02,-3.52 4.35,-6.59c0.11,-1.25 0.25,-28.24 0.13,-29.47z"
        ></path>
        <path
          id="tyre__RR"
          fill="black3"
          d="m176.02,167.52999c-0.2,-1.72 -1.04,-3.6 -2.1,-4.76c-0.3,-0.33 -0.9,-0.82 -1.32,-1.08c-1.43,-0.9 -1.32,-0.89 -9.38,-0.74c-7.1,0.13 -7.16,0.13 -7.8,0.41c-1.54,0.69 -2.86,2.14 -3.55,3.89c-0.58,1.49 -0.67,2.18 -0.63,5.1l0.04,2.5l-1.57,0.02l-1.57,0.02l0.06,3.96l0.06,3.96l1.57,-0.02l1.57,-0.02l0.03,1.92l0.03,1.92l-1.57,0.02l-1.57,0.02l0.06,3.96l0.06,3.96l1.57,-0.02l1.57,-0.02l0.04,2.51c0.04,2.77 0.16,3.56 0.66,4.76c0.94,2.24 2.53,3.78 4.4,4.25c0.6,0.14 1.77,0.15 7.84,0.05c7.05,-0.13 7.13,-0.13 7.76,-0.41c2.35,-1.05 3.95,-3.59 4.21,-6.67c0.11,-1.28 -0.32,-28.27 -0.47,-29.49z"
        ></path>
        <g>
          <path
            id="body__front"
            fill={dynamicColor(front)}
            d="m178.46,36.90999l-98.11,0c0,0 -3.59,-9.89 0,-14.08s95.54,-3.85 98.11,0c1.71,2.94 0,14.08 0,14.08z"
          ></path>
          <text x="50%" y="33" fill="white" fontSize={10}>
            {front}
          </text>
        </g>
        <g>
          <path
            id="body__rear"
            fill={dynamicColor(rear)}
            d="m79.52,207.28999l98.11,0c0,0 3.59,9.89 0,14.08c-3.59,4.19 -95.54,3.85 -98.11,0c-1.71,-2.94 0,-14.08 0,-14.08z"
          ></path>
          <text x="50%" y="220" fill="white" fontSize={10}>
            {rear}
          </text>
        </g>
        <rect
          id="chasis__center"
          fill={"black"}
          transform="matrix(1.03683 0 0 -0.90142 -1182.11 8244.71)"
          height="68.7"
          width="38.7"
          y="8979.50151"
          x="1245.77204"
        ></rect>
        <rect
          id="chasis__front"
          fill="black"
          transform="matrix(1.03047 0 0 -1.07399 -1175.47 10375.1)"
          height="51"
          width="38.7"
          y="9577.28639"
          x="1247.09834"
        ></rect>
        <g>
          <rect
            id="body__left"
            fill={dynamicColor(left)}
            transform="matrix(1.01931 0 0 -0.909149 -1450.79 8283.83)"
            height="68.7"
            width="27"
            y="8944.45422"
            x="1504.2976"
          ></rect>
          <text x="93" y="50%" fill="white" fontSize={10}>
            {left}
          </text>
        </g>
        <rect
          id="chasis__back"
          fill="black"
          transform="matrix(1.03047 0 0 -1.13453 -1175.47 10951.5)"
          height="51"
          width="38.7"
          y="9469.90674"
          x="1247.3504"
        ></rect>
        <g>
          <rect
            id="body__right"
            fill={dynamicColor(right)}
            transform="matrix(1.01931 0 0 -0.909149 -1450.79 8283.83)"
            height="68.7"
            width="27"
            y="8944.61597"
            x="1569.36469"
          ></rect>
          <text x="160" y="50%" fill="white" fontSize={10}>
            {right}
          </text>
        </g>
      </g>
    </svg>
  );
};

export default memo(CarChasis);
