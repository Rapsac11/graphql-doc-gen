module.exports = {
  siteMetadata: {
    title: 'Graphql Documentation',
  },
  plugins: [
    {
      resolve: `gatsby-plugin-page-creator`,
      options: {
        path: `${__dirname}/src/pages/generated`
      },
    },
  ],
};
