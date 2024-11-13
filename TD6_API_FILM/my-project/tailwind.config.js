/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backdropBlur: {
        BackBlur: "16px",
      },
      colors: {
        orange: "hsl(var(--clrOrange))",
        bleu: "hsl(var(--clrBleu))",
        GrisText: "hsl(var(--clrGrisText))",
        GrisDark: "hsl(var(--clrGrisDark))",
        GrisInter: "hsl(var(--clrGrisInter))",
        GrisClair: "hsl(var(--clrGrisClair))",
        GrisTresClair: "hsl(var(--clrGrisTresClair))",
        GrisMoyenClair: "hsl(var(--clrGrisMoyenClair))",
      },
      fontFamily: {
        "sf-pro": ['"SF Pro Display"', "sans-serif"],
      },
      fontWeight: {
        thin: 100,
        ultralight: 200,
        light: 300,
        regular: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
        heavy: 800,
        black: 900,
      },
    },
  },
  plugins: [
    function ({ addUtilities, theme }) {
      const newUtilities = {
        ".text-style": {
          fontSize: "16px",
          fontWeight: theme("fontWeight.light"),
          color: theme("colors.GrisText"),
          fontFamily: theme("fontFamily.sf-pro"),
        },
        ".title-style": {
          fontSize: "24px",
          fontWeight: theme("fontWeight.medium"),
          color: "white",
          fontFamily: theme("fontFamily.sf-pro"),
        },
        ".bg-card": {
          backgroundColor: theme("colors.GrisInter"),
          padding: "1.5rem",
          borderRadius: "2.6rem",
          backdropFilter: "blur(30px)",
          "-webkit-backdrop-filter": "blur(5px)",
        },
        ".bg-modal": {
          fontFamily: theme("fontFamily.sf-pro"),
          fontSize: "16px",
          color: "white",
          backgroundColor: theme("colors.GrisMoyenClair"),
          padding: "1.5rem",
          borderRadius: "2rem",
          backdropFilter: "blur(20px)",
          "-webkit-backdrop-filter": "blur(20px)",
        },
      };
      addUtilities(newUtilities, ["responsive", "hover"]);
    },
  ],
};
