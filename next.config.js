/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		domains: [
			'res.cloudinary.com',
			'images.unsplash.com',
			'ci.encar.com',
			'inv.assets.sincrod.com',
			'd3.indown.io',
			'www.bmw.is',
			'static.tcimg.net',
		],
	},
	// output: 'export',
}

module.exports = nextConfig
