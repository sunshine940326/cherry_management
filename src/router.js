import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
	routes: [
		{
			path: '/',
			name: 'index',
			meta: {
				title: '首页'
			},
			component: () => import('@/views/layout/index.vue'),
			children: [
				{
					path: '/article',
					meta: {
						title: '文章'
					},
					component: () => import('@/views/article'),
					children: [
						{
							path: 'list',
							name: 'articleList',
							meta: {
								title: '文章列表'
							},
							component: () => import('@/views/article')
						},
						{
							path: 'create',
							name: 'articleCreate',
							meta: {
								title: '创建文章'
							},
							component: () => import('@/views/article/form.vue')
						},
						{
							path: 'edit',
							name: 'articleEdit',
							meta: {
								title: '编辑文章'
							},
							component: () => import('@/views/article/form.vue')
						}]
				},
				{
					path: '/tag',
					meta: {
						title: '标签'
					},
					component: () => import('@/views/article'),
					children: [
						{
							path: 'list',
							name: 'tagList',
							meta: {
								title: '标签列表'
							},
							component: () => import('@/views/article')
						},
						{
							path: 'create',
							name: 'tagCreate',
							meta: {
								title: '创建标签'
							},
							component: () => import('@/views/article/form.vue')
						},
						{
							path: 'edit',
							name: 'tagEdit',
							meta: {
								title: '编辑标签'
							},
							component: () => import('@/views/article/form.vue')
						}]
				},
				{
					path: '/user',
					meta: {
						title: '用户'
					},
					children: [
						{
							path: 'list',
							name: 'userList',
							meta: {
								title: '用户列表'
							},
							component: () => import('@/views/article')
						},
						{
							path: 'create',
							name: 'userCreate',
							meta: {
								title: '创建用户'
							},
							component: () => import('@/views/article/form.vue')
						},
						{
							path: 'edit',
							name: 'userEdit',
							meta: {
								title: '编辑用户'
							},
							component: () => import('@/views/article/form.vue')
						}]
				}]
		}]
})