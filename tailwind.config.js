module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      margin: {
        128: "32rem", // 128 * 0.25rem = 32rem
        144: "36rem", // 중간값
        160: "40rem", // 160 * 0.25rem = 40rem
      },
    },
  },
  plugins: [],
};
