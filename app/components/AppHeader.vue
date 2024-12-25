<script setup lang="ts">
import type { NavItem } from '@nuxt/content'

const navigation = inject<Ref<NavItem[]>>('navigation', ref([]))

const links = [
{
  label: 'Home',
  to: '/'
}
// ,
// {
//   label: 'Docs',
//   to: '/docs'
// }
, 
{
  label: 'FAQ',
  to: '/faqs'
}
// ,  
// {
//   label: 'Pricing',
//   to: '/pricing'
// }, {
//   label: 'Blog',
//   to: '/blog'
// }
]
</script>

<template>
  <UHeader :links="links">
    <template #logo>
      <img
        src="/favicon.svg"
        alt="Logo"
        class="me-0.5 h-8"
      />
      Telegram Bots
      <!-- <UBadge
        label="Telegram Bots"
        variant="subtle"
        class="mb-0.5 text-lg"
      /> -->
    </template>

    <template #right>

      <!-- <UColorModeButton size="sm" /> -->

      <!-- <UButton
        label="Sign in"
        color="gray"
        to="/login"
      />
      <UButton
        label="Sign up"
        icon="i-heroicons-arrow-right-20-solid"
        trailing
        color="black"
        to="/signup"
        class="hidden lg:flex"
      /> -->
    </template>

    <template #panel>
      <UNavigationTree
        :links="mapContentNavigation(navigation)"
        default-open
      />
    </template>
  </UHeader>
</template>

<style scoped>
.custom-bg {
  background: linear-gradient(to bottom right, #a0c4ff, #b9fbc0); /* 使用截图中的颜色 */
}
</style>