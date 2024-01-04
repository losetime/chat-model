// 基础域名
export const VITE_API_DOMAIN = import.meta.env.VITE_API_DOMAIN

// 端口
export const VITE_PORT = import.meta.env.VITE_PORT

// 版本
export const VITE_VERSION = import.meta.env.VITE_VERSION

/**
 * @desc: 开发模式
 */
export const DEV_MODE = 'development'

/**
 * @desc: 生产模式
 */
export const PROD_MODE = 'production'

/**
 * @desc: 获取环境变量
 */
export const getEnv = (): string => import.meta.env.MODE

/**
 * @desc: 是否是开发模式
 */
export const isDevMode = (): boolean => import.meta.env.DEV
