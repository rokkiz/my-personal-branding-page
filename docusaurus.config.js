const { themes } = require('prism-react-renderer');

const code_themes = {
  light: themes.github,
  dark: themes.dracula,
};

/** @type {import('@docusaurus/types').Config} */
module.exports = {
  title: 'My Personal Branding',
  tagline: 'Explore comprehensive documentation and personal branding projects.',
  url: 'https://rokkiz.github.io', 
  baseUrl: '/my-personal-branding-page/', 
  projectName: 'my-personal-branding-page', 
  organizationName: 'rokkiz', 
  trailingSlash: false,
  favicon: '/favicon.ico',

  themes: ['@docusaurus/theme-live-codeblock', '@docusaurus/theme-mermaid'],
  
  markdown: {
    mermaid: true,
  },

  presets: [
    [
      '@docusaurus/preset-classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          path: 'docs', // Trỏ trực tiếp về thư mục docs thô của bạn
          routeBasePath: '/', // Biến các file docs thành trang chủ luôn
          sidebarPath: require.resolve('./sidebars-default.js'),
        },
        blog: false,
        theme: {
          customCss: [],
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      colorMode: {
        defaultMode: 'light',
      },
      navbar: {
        title: 'My Personal Branding',
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'defaultSidebar', // Đảm bảo ID này trùng với cấu hình trong file sidebars-default.js của bạn
            position: 'left',
            label: 'Docs',
          },
        ],
      },
      footer: {
        style: 'dark',
        copyright: `Copyright © ${new Date().getFullYear()} rokkiz. Built with Docusaurus.`,
      },
      prism: {
        theme: code_themes.light,
        darkTheme: code_themes.dark,
      },
    }),
};