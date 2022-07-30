const colors = require("tailwindcss/colors");

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "white",
          secondary: "#d33d53",
          accent: "#f35070",
          neutral: "#F2D1D1",
          "base-100": "#FFE6E6",
          info: "#FF869E",
          success: "#FF869E",
          warning: "#f95c84",
          error: "#E87C69",
          "holo-100":
            "radial-gradient(hsla((220 13% 69%)/.2) 0.5px,hsla((220 17% 17%)/1) 0.5px)",
        },
      },
    ],
    fontFamily: {
      poppins: ["Poppins", "sans-serif"],
    },
    backgroundImage: {
      'hero-pattern': "url('/img/hero-pattern.svg')",
      'footer-texture': "url('/img/footer-texture.png')",
    }
  },
  plugins: [require("@tailwindcss/forms"), require("daisyui")],
};
