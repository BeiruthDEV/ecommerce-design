/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          '"Plus Jakarta Sans"',
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          '"Segoe UI"',
          "sans-serif",
        ],
      },
      colors: {
        ink: "#111111",
        paper: "#f8f7f3",
        moss: "#2f7d5b",
        mossDark: "#1f4d3a",
        muted: "#5f665f",
        clay: "#c4663a",
        line: "#ddd8ce",
      },
      boxShadow: {
        card: "0 18px 50px rgba(17, 17, 17, 0.08)",
        cardHover: "0 28px 70px rgba(17, 17, 17, 0.13)",
        active: "0 12px 30px rgba(47, 125, 91, 0.24)",
        button: "0 14px 28px rgba(47, 125, 91, 0.22)",
        soft: "0 18px 55px rgba(17, 17, 17, 0.10)",
      },
    },
  },
  plugins: [],
};
