/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = nextConfig

// Open Chrome automatically in development
if (process.env.NODE_ENV === 'development') {
  require('child_process').exec('start chrome http://localhost:3000')
}