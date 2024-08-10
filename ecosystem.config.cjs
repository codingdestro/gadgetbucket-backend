module.exports = {
  apps: [
    {
      name: "bun-app",
      script: "bun",
      args: "run ./dist/main.js", // Adjust this based on your entry point
      interpreter: "none", // 'none' because Bun is an interpreter itself
      watch: false, // Enable this if you want to watch for file changes
    },
  ],
};
