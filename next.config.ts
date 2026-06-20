import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Permanent (301) redirect from the old domain to the new canonical one,
  // preserving the path. Requires name.hangulmaru.com to stay attached to the
  // Vercel project so requests reach the app.
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "name.hangulmaru.com" }],
        destination: "https://myhangulname.com/:path*",
        // Exact 301 (permanent:true would emit 308); 301 is what we want here.
        statusCode: 301,
      },
    ];
  },
};

export default nextConfig;
