module.exports = {
  images: {
    domains: [
      "links.papareact.com",
      "fakestoreapi.com",
      "https://imgur.com/",
      "i.imgur.com",
    ],
  },
  flags: {
    DEV_SSR: false,
  },
  env: {
    stripe_public_key: process.env.STRIPE_PUBLIC_KEY,
  },
};
