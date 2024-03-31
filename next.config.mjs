/** @type {import('next').NextConfig} */ 
const nextConfig = {
    experimental: {
        serverActions: {
            allowedOrigins: [
            process.env.NEXT_PUBLIC_DOMAIN, 
            process.env.NEXT_PUBLIC_DOMAIN.endsWith('/') ? 
                `${process.env.NEXT_PUBLIC_DOMAIN}login` 
                : 
                `${process.env.NEXT_PUBLIC_DOMAIN}/login`, 
            
            process.env.NEXT_PUBLIC_DOMAIN.endsWith('/') ? 
                `${process.env.NEXT_PUBLIC_DOMAIN}register` 
                : 
                `${process.env.NEXT_PUBLIC_DOMAIN}/register`,
            process.env.NEXT_PUBLIC_DOMAIN.endsWith('/') ? 
                `${process.env.NEXT_PUBLIC_DOMAIN}profile` 
                : 
                `${process.env.NEXT_PUBLIC_DOMAIN}/profile`,
            ],
        },
    },
};

export default nextConfig;
