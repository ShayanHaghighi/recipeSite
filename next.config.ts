import type {NextConfig} from "next";

const nextConfig: NextConfig = {
    /* config options here */
    output: 'export',
    images: {
        unoptimized: true, // Add this to fix static image paths
    },
    turbopack: {
        rules: {
            "*.css": {
                loaders: ["@tailwindcss/turbopack"],
                as: "*.css",
            },
        },
    },
};

export default nextConfig;
