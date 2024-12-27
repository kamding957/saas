<script setup lang="ts">
import { withoutTrailingSlash } from 'ufo'
import type { BlogPost } from '~/types'

const route = useRoute()

const { data: post } = await useAsyncData(route.path, () => queryContent<BlogPost>(route.path).findOne())
if (!post.value) {
  throw createError({ statusCode: 404, statusMessage: 'Post not found', fatal: true })
}

const { data: surround } = await useAsyncData(`${route.path}-surround`, () => queryContent('/bots')
  .where({ _extension: 'md' })
  .without(['body', 'excerpt'])
  .sort({ date: -1 })
  .findSurround(withoutTrailingSlash(route.path))
, { default: () => [] })

const title = post.value.head?.title || post.value.title
const description = post.value.head?.description || post.value.description

useSeoMeta({
  title,
  ogTitle: title,
  description,
  ogDescription: description
})

if (post.value.image?.src) {
  defineOgImage({
    url: post.value.image.src
  })
} else {
  defineOgImageComponent('Saas', {
    headline: 'bots'
  })
}
</script>

<template>
  <UContainer v-if="post">
    <UPageHeader
      :title="post.title"
      :description="post.description"
    >
      <template #headline>
        <UBadge
          v-bind="post.badge"
          variant="subtle"
        />
        <span class="text-gray-500 dark:text-gray-400">&middot;</span>
        <time class="text-gray-500 dark:text-gray-400">{{ new Date(post.date).toLocaleDateString('en', { year: 'numeric', month: 'short', day: 'numeric' }) }}</time>
      </template>

      <div class="flex flex-wrap items-center gap-3 mt-4">
        <UButton
          v-for="(author, index) in post.authors"
          :key="index"
          :to="author.to"
          color="white"
          target="_blank"
          size="sm"
        >
          <UAvatar
            v-bind="author.avatar"
            alt="Author avatar"
            size="2xs"
          />

          {{ author.name }}
        </UButton>
      </div>
    </UPageHeader>

    <UPage>
      <UPageBody prose>
        <ContentRenderer
          v-if="post && post.body"
          :value="post"
        />

        <hr v-if="surround?.length">

        <UContentSurround :surround="surround" />
      </UPageBody>

      <template #right>
        <UContentToc
          v-if="post.body && post.body.toc"
          :links="post.body.toc.links"
        />
      </template>
    </UPage>
  </UContainer>
</template>


<!-- <script setup>
const route = useRoute()
const { data: bot } = await useAsyncData(`bot-${route.params.slug}`, () =>
  queryContent(`/bots/${route.params.slug}`).findOne()
)

useHead({
  title: bot.value?.title,
  meta: [
    { name: 'description', content: bot.value?.description }  
  ]
})
</script>

<template>
  <main>
    <header class="mb-8">
      <h1 class="text-4xl font-bold">{{ bot.title }}</h1>
      <p class="text-xl text-gray-600 dark:text-gray-400">{{ bot.description }}</p>
    </header>
    
    <ContentRenderer :value="bot" class="prose max-w-none" />
  </main>  
</template>  -->