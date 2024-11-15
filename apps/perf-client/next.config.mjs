/** @type {import('next').NextConfig} */
const nextConfig = {
    serverExternalPackages: ['graphql', '@as-integrations/next', '@apollo/server', 'express', 'argon2', '@prisma/client'],
};

export default nextConfig;
