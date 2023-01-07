module.exports = {
  base: '/kdu-i18n/',
  locales: {
    '/': {
      lang: 'en-US',
      title: 'Kdu I18n',
      description: 'Kdu I18n is internationalization plugin for Kdu.js'
    },
  },
  head: [
    ['meta', { name: 'theme-color', content: '#03a9f4' }],
  ],
  serviceWorker: false,
  themeConfig: {
    repo: 'khanhduy1407/kdu-i18n',
    editLinks: true,
    docsDir: 'kdupress',
    locales: {
      '/': {
        label: 'English',
        selectText: 'Languages',
        editLinkText: 'Edit this page on GitHub',
        lastUpdated: 'Last Updated',
        nav: [
          {
            text: 'Learn',
            items: [
              {
                text: 'Guide',
                link: '/guide/formatting',
              },
              {
                text: 'API',
                link: '/api/'
              }
            ]
          },
        ],
        sidebar: [
          '/introduction',
          '/started',
          '/installation',
          {
            title: 'Guide',
            collapsable: false,
            children: [
              '/guide/formatting',
              '/guide/pluralization',
              '/guide/datetime',
              '/guide/number',
              '/guide/messages',
              '/guide/fallback',
              '/guide/component',
              '/guide/directive',
              '/guide/interpolation',
              '/guide/sfc',
              '/guide/hot-reload',
              '/guide/locale',
              '/guide/lazy-loading'
            ]
          }
        ]
      },
    }
  }
}

