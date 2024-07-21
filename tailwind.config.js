module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],

  theme: {
    extend: {
      margin: {
        128: "32rem", // 128 * 0.25rem = 32rem
        136: "34rem", // 중간값
        144: "36rem", // 중간값
        152: "38rem", // 144와 160 사이의 중간값
        160: "40rem", // 160 * 0.25rem = 40rem
        192: "48rem", // 192 단위로 48rem (768px)
        256: "64rem", // 256 단위로 64rem (1024px)
      },
      width: {
        104: "26rem", // w-104
        112: "28rem", // w-112
        120: "30rem", // w-120
        128: "32rem", // w-128
        136: "34rem", // w-136
        144: "36rem", // w-144
        152: "38rem", // w-152
        160: "40rem", // w-160
        168: "42rem", // w-168
        176: "44rem", // w-176
      },
      colors: {
        lettersColor: "#EEF0E2",
        dateColor: "#FCFEF0",
        dateTextColor: "#5F5151",
        dateHoverColor: "#FFCFC3",
        postboxNameColor: "#885050",
      },
      borderRadius: {
        "4xl": "2rem",
        "100px": "100px",
      },
      fontFamily: {
        NoticiaText: ["NoticiaText"],
        MoonFlower: ["MoonFlower"],
        syndinaroo: ["syndinaroo"],
      },
      screens: {
        'iphone' : { 'max' : '450px' },
        // => @media (max-width: 450px) {...}, 450px 이하
        'laptop' : '450px',
        // => @media (min-width: 450px) {...}, 450px 이상

      },
    },
  },
  plugins: [
    function ({ addBase }) {
      addBase({
        ".scrollbar::-webkit-scrollbar": {
          width: "16px",
        },
        ".scrollbar::-webkit-scrollbar-track": {
          background: "#f1f1f1",
          borderRadius: "8px",
        },
        ".scrollbar::-webkit-scrollbar-thumb": {
          backgroundColor: "#888",
          borderRadius: "8px",
          border: "3px solid #f1f1f1",
        },
        ".scrollbar::-webkit-scrollbar-thumb:hover": {
          background: "#555",
        },

        ".scrollbar2::-webkit-scrollbar": {
          width: "16px",
        },
        ".scrollbar2::-webkit-scrollbar-track": {
          background: "#f1f1f1",
          borderRadius: "8px",
        },
        ".scrollbar2::-webkit-scrollbar-thumb": {
          backgroundColor: "#888",
          borderRadius: "8px",
          border: "3px solid #f1f1f1",
        },
        ".scrollbar2::-webkit-scrollbar-thumb:hover": {
          background: "#555",
        },
      });
    },
  ],
};
