module.exports = {
  branches: ["main"],
  repositoryUrl: "https://github.com/yourrepo/yourmonorepo.git",
  plugins: [
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator",
    [
      "@semantic-release/npm",
      {
        npmPublish: true,
        pkgRoot: "packages/fets-react-query-wrapper",
      },
    ],
    "@semantic-release/github",
    [
      "semantic-release-monorepo",
      {
        monorepo: {
          analyzeCommits: ["@semantic-release/commit-analyzer"],
          generateNotes: ["@semantic-release/release-notes-generator"],
        },
      },
    ],
  ],
};
