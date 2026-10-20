<template>
  <header
    class="fixed inset-x-0 top-0 z-50 flex h-16 items-center justify-between px-8 py-4 border-b transition-colors duration-300"
    :class="shouldShowBackground ? 'bg-cyan-700 border-cyan-800' : 'bg-transparent border-transparent'">
    <div class="text-2xl font-semibold text-white">
      {{ t('home.title') }}
    </div>

    <div class="flex gap-3">
      <el-button link @click="goToHome">
        <span class="text-lg text-white">{{ t('home.buttons.home') }}</span>
      </el-button>

      <el-button link @click="goToSearch">
        <span class="text-lg text-white">{{ t('home.buttons.search') }}</span>
      </el-button>

      <el-button link>
        <span class="text-lg text-white">{{ t('home.buttons.about') }}</span>
      </el-button>

      <el-dropdown>
        <el-button class="m-2" link>
          <span class="text-lg text-white">{{ t('home.buttons.language.title') }}</span>
          <el-icon class="el-icon--right">
            <ArrowDown class="text-white"/>
          </el-icon>
        </el-button>

        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="switchLocale('en-US')">
              {{ t('home.buttons.language.options.en-US') }}
            </el-dropdown-item>
            <el-dropdown-item @click="switchLocale('zh-CN')">
              {{ t('home.buttons.language.options.zh-CN') }}
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ArrowDown } from '@element-plus/icons-vue'
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'

import type { SupportedLocale } from '@/i18n/translator'

const { t, locale } = useI18n()
const route = useRoute()
const router = useRouter()

const headerRef = ref<HTMLElement | null>(null)
const isScrolled = ref(false)
const isHome = computed(() => route.path === '/')
const shouldShowBackground = computed(() => !isHome.value || isScrolled.value)

const updateHeaderBackground = () => {
  const headerHeight = headerRef.value?.offsetHeight ?? 0
  isScrolled.value = window.scrollY > headerHeight
}

const switchLocale = (nextLocale: SupportedLocale) => {
  locale.value = nextLocale
}

const goToHome = () => {
  router.push('/')
}

const goToSearch = () => {
  router.push('/search')
}

onMounted(() => {
  updateHeaderBackground()
  window.addEventListener('scroll', updateHeaderBackground, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', updateHeaderBackground)
})
</script>
