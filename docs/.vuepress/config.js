module.exports = {
  title: 'q-former',
  base: '/q-former/',
  description: 'q-former 帮你快速搞定vue form',
  head: [
    ['link', { rel: 'icon', href: '/img/logo.ico' }],
    ['link', { rel: 'manifest', href: '/manifest.json' }],
  ],
  themeConfig: {
    nav: [
      // { text: '指南', link: '/' },
      // { text: '组件', link: '/' },
      // { text: '使用手册', link: '/' },
      // { text: '教程', link: '/' },
      { text: 'Github', link: 'https://github.com/Venusjason/vuejs-form-creator' },
    ],
    sidebar: [
      {
        title: '开发指南',
        path: '/guide/',
        // sidebarDepth: 1,
        collapsable: false,
        children: [
          {
            title: '安装',
            path: '/guide/install',
            // sidebarDepth: 2,
          },
          {
            title: '快速上手',
            path: '/guide/quickStart',
          }
        ]
      },
      {
        title: '使用说明',
        path: '/apis/',
        collapsable: false,
        children: [
          {
            title: '配置option',
            path: '/apis/option',
          },
          {
            title: '表单域field',
            path: '/apis/field',
          },
        ],
      },
      {
        title: '配套工具',
        path: '/tools/',
        collapsable: false,
        children: [
          {
            title: '内置rules',
            path: '/tools/rules',
          },
        ],
      }
    ],
    displayAllHeaders: true,
  },
  plugins: [
    ['@vuepress/search', {
      searchMaxSuggestions: 10
    }],
  ],
}