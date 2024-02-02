module.exports = {
  branches: ["main"],
  plugins: [
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator",
    [
      "@semantic-release/exec",
      {
        prepareCmd:
          "cd packages/fets-react-query-wrapper && pnpm version ${nextRelease.version} --no-git-tag-version",
        publishCmd:
          "cd packages/fets-react-query-wrapper && pnpm publish --no-git-checks",
      },
    ],
    [
      "@semantic-release/npm",
      {
        npmPublish: false,
      },
    ],
    "@semantic-release/github",
  ],
};
