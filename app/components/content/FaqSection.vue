<template>
  <section class="faq-section py-16">
    <div class="container mx-auto px-4">
      <!-- Title slot -->
      <div v-if="$slots.title" class="text-center mb-4">
        <h2 class="text-3xl font-bold">
          <slot name="title" mdc-unwrap="p" />
        </h2>
      </div>
      
      <!-- Description slot -->
      <div v-if="$slots.description" class="text-center mb-12">
        <p class="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          <slot name="description" mdc-unwrap="p" />
        </p>
      </div>
      
      <!-- FAQ accordion -->
      <div v-if="faqs?.length" class="max-w-3xl mx-auto">
        <div 
          v-for="(faq, index) in faqs" 
          :key="faq.id"
          class="border-b border-gray-200 dark:border-gray-700"
        >
          <button
            class="w-full py-6 text-left flex justify-between items-center hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            @click="toggleFaq(index)"
          >
            <h3 class="text-lg font-medium pr-4">{{ faq.question }}</h3>
            <svg 
              class="w-5 h-5 transform transition-transform"
              :class="{ 'rotate-180': openFaqs.includes(index) }"
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <div 
            v-show="openFaqs.includes(index)"
            class="pb-6 text-gray-600 dark:text-gray-300 leading-relaxed"
          >
            <div v-text="faq.answer" />
          </div>
        </div>
      </div>
      
      <!-- Fallback content -->
      <div v-else class="text-center py-8">
        <p class="text-gray-500">No FAQs available.</p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface Props {
  faqRefs?: string[]
  category?: string
  limit?: number
}

withDefaults(defineProps<Props>(), {
  faqRefs: () => [],
  limit: 10
})

// Reactive state for accordion
const openFaqs = ref<number[]>([])

const toggleFaq = (index: number) => {
  if (openFaqs.value.includes(index)) {
    openFaqs.value = openFaqs.value.filter(i => i !== index)
  } else {
    openFaqs.value.push(index)
  }
}

// Query FAQs - for now, return empty array until we have data
const { data: faqs } = await useAsyncData('faqs', async () => {
  try {
    // Try to query the faqs collection if it exists
    return await queryCollection('faqs').all()
  } catch (error) {
    // Return empty array if collection doesn't exist yet
    console.warn('FAQs collection not found:', error)
    return []
  }
})
</script>