/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'objectstorage.*.oraclecloud.com',
            },
        ],
    },
};

export default nextConfig;
