import { vitePluginForArco } from '@arco-plugins/vite-react'

export default {
  
  plugins: [
    vitePluginForArco(options),
    [
        'babel-plugin-import',
        {
          libraryName: '@arco-design/web-react',
          libraryDirectory: 'es',
          camel2DashComponentName: false,
          style: true, // 样式按需加载
        },
        {
            libraryName: '@arco-design/web-react/icon',
            libraryDirectory: 'react-icon',
            camel2DashComponentName: false,
          },
      ],
  ],
}