module.exports = {
  images: {
    domains: ["links.papareact.com", "fakestoreapi.com"],
  },
  flags: {
    DEV_SSR: false,
  },
  env: {
    stripe_public_key: process.env.STRIPE_PUBLIC_KEY,
  },
};
