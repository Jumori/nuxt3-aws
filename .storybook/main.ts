import type { StorybookConfig } from '@storybook/vue3-vite'
import { mergeConfig, UserConfig as ViteConfig, loadConfigFromFile } from 'vite'
import { fileURLToPath } from 'node:url'
import { join } from 'node:path'
import vuePlugin from '@vitejs/plugin-vue'
import viteJsxPlugin from '@vitejs/plugin-vue-jsx'
import path from 'path'

const vuePlugins = {
  'vite:vue': [vuePlugin, 'vue'],
  'vite:vue-jsx': [viteJsxPlugin, 'vueJsx']
} as const

async function useNuxtViteConfig() {
  const { loadNuxt, buildNuxt } = await import('@nuxt/kit')
  const nuxt = await loadNuxt({
    ready: false,
    dev: process.env.NODE_ENV === 'development',
    overrides: {
      ssr: false,
      app: {
        rootId: 'nuxt-test'
      },
      pages: false
    }
  })

  if ((nuxt.options.builder as string) !== '@nuxt/vite-builder') {
    throw new Error(
      `Storybook addon Nuxt only supports Vite bundler, but Nuxt builder is currently set to '${nuxt.options.builder}'.`
    )
  }

  const runtimeDir = fileURLToPath(new URL('./runtime', import.meta.url))
  nuxt.options.build.templates.push(
    {
      src: join(runtimeDir, 'composables.mjs'),
      filename: 'storybook/composables.mjs'
    },
    {
      src: join(runtimeDir, 'components.mjs'),
      filename: 'storybook/components.mjs'
    }
  )

  nuxt.hook('app:templates', app => {
    app.templates = app.templates.filter(
      template => template.filename !== 'app-component.mjs'
    )
    app.templates.push({
      src: join(runtimeDir, 'app-component.mjs'),
      filename: 'app-component.mjs'
    })
  })

  nuxt.hook('imports:sources', presets => {
    const stubbedComposables = ['useNuxtApp']
    const appPreset = presets.find(p => p.from === '#app')

    if (appPreset) {
      appPreset.imports = appPreset.imports.filter(
        i => typeof i !== 'string' || !stubbedComposables.includes(i)
      )
    }

    presets.push({
      from: '#build/storybook/composables.mjs',
      imports: stubbedComposables
    })
  })

  return {
    viteConfig: await new Promise<ViteConfig>((resolve, reject) => {
      nuxt.hook('modules:done', () => {
        nuxt.hook('components:extend', components => {
          for (const name of ['NuxtLink']) {
            Object.assign(components.find(c => c.pascalName === name) || {}, {
              export: name,
              filePath: '#build/storybook/components.mjs'
            })
          }
        })

        nuxt.hook('vite:extendConfig', (config, { isClient }) => {
          if (isClient) {
            for (const name in vuePlugins) {
              if (!config.plugins?.some(p => (p as any)?.name === name)) {
                const [plugin, key] =
                  vuePlugins[name as keyof typeof vuePlugins]
                // @ts-ignore
                config.plugins.push(plugin(config[key]))
              }
            }

            resolve({
              ...config
            })
          }
        })
      })

      nuxt
        .ready()
        .then(() => buildNuxt(nuxt))
        .catch(err => {
          if (!err.toString().includes('_stop_')) {
            reject(err)
          }
        })
    }),
    nuxt
  }
}
const config: StorybookConfig = {
  stories: ['../stories/**/*.mdx', '../stories/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-mdx-gfm'
  ],
  framework: {
    name: '@storybook/vue3-vite',
    options: {}
  },
  docs: {
    autodocs: 'tag'
  },
  async viteFinal(baseConfig) {
    const nuxtViteConfig = await useNuxtViteConfig()
    const { viteConfig } = nuxtViteConfig

    const mergedConfigs = mergeConfig(baseConfig, {
      resolve: viteConfig.resolve,
      optimizeDeps: viteConfig.optimizeDeps,
      plugins: viteConfig.plugins?.filter(plugin => {
        if (
          plugin !== null &&
          typeof plugin === 'object' &&
          'name' in plugin &&
          plugin.name === 'vite:vue'
        ) {
          return false
        }

        return true
      }),
      define: {
        ...viteConfig.define,
        module: { hot: null },
        'process.env': {
          NUXT_APP_CDN_URL: '',
          NUXT_PUBLIC_API_BASE: 'http://localhost:3333/',
          NUXT_PUBLIC_API_ENV: 'dev'
        }
      }
    })

    return mergedConfigs
  }
}

export default config
