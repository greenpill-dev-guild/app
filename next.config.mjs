import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        NEXT_WEB3_STORAGE_TOKEN: process.env.NEXT_WEB3_STORAGE_TOKEN
    }
};

export default withNextIntl(nextConfig);