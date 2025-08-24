
import type { Config } from 'tailwindcss'
export default {
  content: ['./app/**/*.{ts,tsx}','./components/**/*.{ts,tsx}','./lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: { brand: { DEFAULT:'#1e4dd8', 50:'#eff4ff',100:'#dbe6ff',200:'#b7caff',300:'#92adff',400:'#6d91ff',500:'#4874ff',600:'#2f57e0',700:'#1e4dd8',800:'#173ead',900:'#102a73' } }
    },
  },
  plugins: [],
} satisfies Config
