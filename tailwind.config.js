module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],

  theme: {
    extend: {
      margin: {
        128: "32rem", // 128 * 0.25rem = 32rem
        144: "36rem", // 중간값
        152: "38rem", // 144와 160 사이의 중간값
        160: "40rem", // 160 * 0.25rem = 40rem
        192: "48rem", // 192 단위로 48rem (768px)
        256: "64rem", // 256 단위로 64rem (1024px)
      },
      colors: {
        lettersColor: "#EEF0E2",
        dateColor: "#FCFEF0",
        dateTextColor: "#5F5151",
      },
      borderRadius: {
        "4xl": "2rem",
        "100px": "100px",
      },
      fontFamily: {
        NoticiaText: ["NoticiaText"],
      },
    },
  },
  plugins: [],
};
