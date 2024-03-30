/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: {
            allowedOrigins: [`${process.env.DOMAIN}`, `${process.env.DOMAIN}login`, 
            `${process.env.DOMAIN}register`, `${process.env.DOMAIN}profile`
            ],
        },
    },
};

export default nextConfig;
