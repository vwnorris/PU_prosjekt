// eslint-disable-next-line no-undef
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      green: "#8bb174",
      "green-lighter": "#b5ca8d",
      beige: "#e3dbc3",
      purple: "#a266c7",
      "purple-lighter": "#caaded",
      whiteish: "#FDFAF2",
      white: "#fff",
    },
    extend: {
      fontFamily: {
        sspro: ["Source Sans Pro", "sans-serif"],
      },
      scale: {
        102: "1.02",
      },
    },
    daisyui: {
      themes: [
        {
          mytheme: {
            primary: "#8bb174",
            secondary: "#a266c7",
            accent: "#e3dbc3",
            neutral: "#2A2E37",
            "base-100": "#3D4451",
            info: "#3ABFF8",
            success: "#36D399",
            warning: "#FBBD23",
            error: "#F87272",
          },
        },
      ],
    },
    plugins: [require("daisyui")],
  },
};
