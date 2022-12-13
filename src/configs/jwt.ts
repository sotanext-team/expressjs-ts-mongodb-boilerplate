export default {
  key: process.env.JWT_SECRET || "your_random_jwt_secret_key",
  expiration: 20 * 60 * 1000, // milliseconds (e.g.: 60, "2 days", "10h", "7d")
  algorithm: "HS384", // (default: HS256)
  cache_prefix: "token:",
  allow_renew: true,
  renew_threshold: 2 * 60 * 1000,
};
