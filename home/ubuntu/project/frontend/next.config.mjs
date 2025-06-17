/** @type {import("next").NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  output: 'export',
  trailingSlash: true,
  distDir: 'dist',
  env: {
    NEXT_PUBLIC_API_URL: 'https://8000-i7ww4zjh1nb8p9taehvs2-857394c6.manus.computer',
  },
}

export default nextConfig

