import { defineConfig } from '@umijs/max';

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {
    title: '@umijs/max',
  },
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      name: '首页',
      path: '/home',
      component: './Home',
    },
    {
      name: '权限演示',
      path: '/access',
      component: './Access',
    },
    {
      name: ' CRUD 示例',
      path: '/table',
      component: './Table',
    },
    {
      name: '轮播图',
      path: '/rotationChart',
      component: './RotationChart',
    },
    {
      name: '自定义table',
      path: '/customtable',
      component: './CustomTable',
    },
    {
      name: '地图',
      path: '/map',
      component: './Map',
    },
  ],
  npmClient: 'yarn',
});
