const path = require('path')

module.exports = {
  title: 'Blog',
  base: '/blog/',
  theme: '@vuepress/theme-blog',
  themeConfig: {
    nav: [
      {
        text: 'Home',
        link: '/'
      },
      {
        text: 'Blog',
        link: '/blog/'
      },
      {
        text: 'Tags',
        link: '/tag/'
      }
    ],
    footer: {
      contact: [ // 联系方式，显示在页脚的左侧。
        {
          type: 'github',
          link: 'https://github.com/vuejs/vuepress',
        },
        {
          type: 'twitter',
          link: 'https://github.com/vuejs/vuepress',
        }
      ],
      copyright: [
        {
          text: 'Privacy Policy',
          link: 'https://policies.google.com/privacy?hl=en-US',
        },
        {
          text: 'MIT Licensed | Copyright © 2018-present Vue.js',
        },
      ],
    },
    directories: [
      // { // demo
      //   id: 'writing', // Unique id for current classifier
      //   dirname: '_writings', // Matched directory name
      //   path: '/writings/', // Entry page for current classifier
      //   title: '隨筆', // Entry and pagination page titles for current classifier.
      //   layout: 'IndexWriting', // Layout component name for entry page.
      //   frontmatter:{ //Front matter for entry page.
      //     tag: 'vuepress'
      //   },
      //   itemLayout: 'Writing', // Layout for matched pages.
      //   itemPermalink: '/writings/:year/:month/:day/:slug', // Permalink for matched pages.
      //   pagination: { // Pagination behavior
      //     lengthPerPage: 2,
      //   },
      // },
      {
        id: 'blog',
        dirname: 'blog',
        title: '博客',
        path: '/blog/',
        itemPermalink: '/blog/:year/:month/:day/:slug',
        pagination: {
          lengthPerPage: 10,
        },
      },
    ],
    globalPagination: {
      prevText:'上一頁', // Text for previous links.
      nextText:'下一頁', // Text for next links.
      lengthPerPage:'10', // Maximum number of posts per page.
      layout:'Pagination', // Layout for pagination page
    },
    smoothScroll: true,
  },
  alias: {
    "@assets": path.resolve(__dirname, "../assets")
  }
}
