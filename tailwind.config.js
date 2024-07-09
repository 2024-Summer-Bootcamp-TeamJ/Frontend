module.exports = {

  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],

  theme: {
    extend: {
      margin: {
        128: "32rem", // 128 * 0.25rem = 32rem
        144: "36rem", // 중간값
        152: "38rem", // 144와 160 사이의 중간값

        160: "40rem", // 160 * 0.25rem = 40rem
      },
    },
  },
  plugins: [],

};

