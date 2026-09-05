const nextConfig = {
  allowedDevOrigins: ["192.168.18.62"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "vftjwhyjghtrppxavscj.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
};

export default nextConfig;