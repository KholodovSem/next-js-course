/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    mongodb_username: "sem1101",
    mongodb_password: "12345qwert",
    mongodb_cluster: "cluster0",
    mongodb_database: "my-site"
  }
}

module.exports = nextConfig
