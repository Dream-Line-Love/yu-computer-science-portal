import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      injectRegister: "auto",
      devOptions: {
        enabled: true,
      },
      workbox: {
        globPatterns: [
          "**/*.{js,css,html,ico,png,svg,jpg,ttf,jsx,ts,tsx,scss}",
        ],
      },
      includeAssets: ["favicon.ico", "apple-touch-icon.png"],
      manifest: {
        name: "UY CS Portal",
        short_name: "CS Portal",
        description:
          "Student portal and faculty dashboard for first year first semester Computer Science major at University of Yangon starting in 2022 November.",
        icons: [
          {
            src: "/android-chrome-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/android-chrome-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "/android-chrome-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "/android-chrome-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
        start_url: "https://yu-computer-science-portal.vercel.app",
        // start_url: "/localhost:5173",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#ffffff",
        screenshots: [
          {
            src: "landing_page_screenshot.jpg",
            sizes: "1058x1986",
            type: "image/jpeg",
          },
          {
            src: "/portal_home_screenshot_1.jpg",
            sizes: "1059x1986",
            type: "image/jpeg",
          },
        ],
      },
    }),
  ],
});
