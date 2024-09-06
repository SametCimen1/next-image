
export default function getBaseURL(){
    if (typeof window !== "undefined") return ""
    if(process.env.VERCEL_URL) return `https://${process.env.DOMAIN_URL}/api/s3-upload`
    return "http://localhost:3000/api/s3-upload"
}