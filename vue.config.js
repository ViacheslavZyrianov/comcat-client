module.exports = {
  pwa: {
    workboxPluginMode: 'GenerateSW',
    navigateFallback: 'index.html',
    themeColor: '#211f39',
    manifestOptions: {
      name: 'ComCat',
      short_name: 'ComCat',
      theme_color: '#211f39'
    },
    icons: [
      {
        'src': './img/icons/192x192.png',
        'sizes': '192x192', 'type': 'image/png'
      },
      {
        'src': './img/icons/512x512.png',
        'sizes': '512x512',
        'type': 'image/png'
      }
      // {
      //   'src': './img/icons/192x192.png',
      //   'sizes': '192x192',
      //   'type': 'image/png',
      //   'purpose': 'maskable'
      // },
      // {
      //   'src': './img/icons/512x512.png',
      //   'sizes': '512x512',
      //   'type': 'image/png',
      //   'purpose': 'maskable'
      // }
    ]
  }
}
