<template>
  <section class="testimonials-section py-16">
    <div class="container mx-auto px-4">
      <!-- Title slot with unwrap support -->
      <div v-if="$slots.title" class="text-center mb-4">
        <h2 class="text-3xl font-bold">
          <slot name="title" mdc-unwrap="p" />
        </h2>
      </div>
      
      <!-- Description slot with unwrap support -->
      <div v-if="$slots.description" class="text-center mb-12">
        <p class="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          <slot name="description" mdc-unwrap="p" />
        </p>
      </div>
      
      <!-- Testimonials grid -->
      <div v-if="testimonials?.length" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div 
          v-for="testimonial in testimonials" 
          :key="testimonial.slug"
          class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg"
        >
          <div class="flex items-center mb-4">
            <img 
              :src="testimonial.avatar" 
              :alt="testimonial.name"
              class="w-12 h-12 rounded-full mr-4"
            >
            <div>
              <h3 class="font-semibold">{{ testimonial.name }}</h3>
              <p class="text-sm text-gray-600 dark:text-gray-400">
                {{ testimonial.role }} at {{ testimonial.company }}
              </p>
            </div>
          </div>
          <p class="text-gray-700 dark:text-gray-300 mb-4">{{ testimonial.content }}</p>
          <div class="flex">
            <span v-for="star in testimonial.rating" :key="star" class="text-yellow-400">★</span>
          </div>
        </div>
      </div>
      
      <!-- Fallback content -->
      <div v-else class="text-center py-8">
        <p class="text-gray-500">No testimonials available.</p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
 
interface Props {
  testimonialRefs?: string[]
  limit?: number
}

const props = withDefaults(defineProps<Props>(), {
  testimonialRefs: () => [],
  limit: 6
})

// Query testimonials based on references or featured testimonials
const { data: testimonials } = await useAsyncData('testimonials', async () => {
  if (props.testimonialRefs.length > 0) {
    // Query specific testimonials by slug
    return queryCollection('testimonials')
      .where('slug', 'IN', props.testimonialRefs)
      .order('order', 'ASC')
      .limit(props.limit)
      .all()
  } else {
    // Fallback to featured testimonials
    return await queryCollection('testimonials')
      .where('featured', '=', true)
      .order('order', 'ASC')
      .limit(props.limit)
      .all()
  }
})
</script>