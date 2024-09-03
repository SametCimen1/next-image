/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        remotePatterns:[
            {
                protocol:"https",
                hostname:"avatars.githubusercontent.com"
            },
            {
                protocol:"https",
                hostname:"albertcamusbucket.s3.us-east-2.amazonaws.com"
            }
        ]
    }
};

export default nextConfig;
