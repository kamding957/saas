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
      <!-- UPageGrid用于显示网格布局 -->
      <UPageGrid>
        <ULandingCard
          v-for="(item, index) in page.features.items"
          :key="index"
          v-bind="item"
        />
      </UPageGrid>
    </ULandingSection> 

    <!-- 显示页面的客户评价区块 -->
    <!-- <ULandingSection
      :title="page.testimonials.title"
      :description="page.testimonials.description"
    >
      <UPageColumns class="xl:columns-4">
        <div
          v-for="(testimonial, index) in page.testimonials.items"
          :key="index"
          class="break-inside-avoid"
        >
          <ULandingTestimonial
            v-bind="testimonial"
            class="bg-gray-100/50 dark:bg-gray-800/50"
          />
        </div>
      </UPageColumns>
    </ULandingSection> -->

    <!-- 显示页面的行动号召区块 -->
     <!-- ULandingCTA用于显示行动号召 -->
    <!-- <ULandingSection>
      <ULandingCTA
        v-bind="page.cta"
        class="bg-gray-100/50 dark:bg-gray-800/50"
      />
    </ULandingSection> -->
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
