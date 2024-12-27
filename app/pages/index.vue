<script setup lang="ts">
// 使用asyncData异步获取页面数据
const { data: page } = await useAsyncData('index', () => queryContent('/').findOne())
// 如果页面数据为空，则抛出404错误
if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}

// 使用SeoMeta设置页面的SEO信息
useSeoMeta({
  titleTemplate: '', // 标题模板
  title: page.value.title, // 页面标题
  ogTitle: page.value.title, // Open Graph标题
  description: page.value.description, // 页面描述
  ogDescription: page.value.description // Open Graph描述
})
</script>

<template>
  <div v-if="page">
    <!-- ULandingHero组件用于显示页面的英雄区块 -->
    <ULandingHero
      :title="page.hero.title"
      :description="page.hero.description"
      class="custom-bg"
    >
      <div class="absolute inset-0 landing-grid z-[-1] [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]" />

    </ULandingHero>

    <!-- ULandingSection组件用于显示页面的陆地区块 -->
     <!-- ImagePlaceholder用于占位图片 -->
    <!-- <ULandingSection class="!pt-0">
      <ImagePlaceholder />
    </ULandingSection>  -->

    <!-- 循环显示页面的各个区块 -->
    <!-- <ULandingSection
      v-for="(section, index) in page.sections"
      :key="index"
      :title="section.title"
      :description="section.description"
      :align="section.align"
      :features="section.features"
    > 
    <ImagePlaceholder />
    </ULandingSection> -->

    <!-- 显示页面的特征区块 -->
    <ULandingSection
      :title="page.features.title"
      :description="page.features.description"
    >
      <UPageGrid>
        <ULandingCard
          v-for="(item, index) in page.features.items"
          :key="index"
          v-bind="item"
        >
 
          <div class="mb-4 flex space-x-2"> <!-- 添加flex布局并设置间距 -->
            <a v-if="item" :href="item.tgurl" target="_blank" class="text-center font-medium focus-within:ring-4 focus-within:outline-none inline-flex items-center justify-center px-5 py-2.5 text-sm text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-r focus:ring-cyan-300 dark:focus:ring-cyan-800 rounded-lg mb-2 md:mb-0 w-full sm:w-auto" role="button">
              Telegram
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" class="ml-2" style="fill:rgba(255, 255, 255, 1);transform:;-ms-filter:;" data-v-41733f5a=""><path d="M20.665,3.717l-17.73,6.837c-1.21,0.486-1.203,1.161-0.222,1.462l4.552,1.42l10.532-6.645 c0.498-0.303,0.953-0.14,0.579,0.192l-8.533,7.701l0,0l0,0H9.841l0.002,0.001l-0.314,4.692c0.46,0,0.663-0.211,0.921-0.46 l2.211-2.15l4.599,3.397c0.848,0.467,1.457,0.227,1.668-0.785l3.019-14.228C22.256,3.912,21.474,3.351,20.665,3.717z" data-v-41733f5a=""></path></svg>
            </a>
            
            <NuxtLink :to="`/bots/${item.slug}`" class="text-center font-medium focus-within:ring-4 focus-within:outline-none inline-flex items-center justify-center px-5 py-2.5 text-sm text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 focus-within:ring-gray-200 dark:focus-within:ring-gray-700 rounded-lg w-full sm:w-auto" role="button">
              Read more
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" class="shrink-0 w-3.5 h-3.5 ms-2 text-slate-500" role="img" aria-label="arrow right outline" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 12H5m14 0-4 4m4-4-4-4"></path></svg>
            </NuxtLink>
          </div>

        </ULandingCard>
      </UPageGrid>

      
    </ULandingSection> 

   

    
  </div>
</template>

<style scoped>
/* 定义landing-grid样式 */
.landing-grid {
  background-size: 100px 100px;
  background-image:
    linear-gradient(to right, rgb(var(--color-gray-200)) 1px, transparent 1px),
    linear-gradient(to bottom, rgb(var(--color-gray-200)) 1px, transparent 1px);
}
/* 定义dark模式下的landing-grid样式 */
.dark {
  .landing-grid {
    background-image:
      linear-gradient(to right, rgb(var(--color-gray-800)) 1px, transparent 1px),
      linear-gradient(to bottom, rgb(var(--color-gray-800)) 1px, transparent 1px);
  }
}

.custom-bg {
  background: linear-gradient(to bottom right, #a0c4ff, #b9fbc0); /* 使用截图中的颜色 */
}
</style>
