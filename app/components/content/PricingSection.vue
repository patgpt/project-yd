<template>
  <section class="pricing-section py-16">
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
      
      <!-- Pricing plans grid -->
      <div v-if="pricingPlans?.length" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <div 
          v-for="plan in pricingPlans" 
          :key="plan.slug"
          class="relative bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg border"
          :class="{
            'border-blue-500 ring-2 ring-blue-500 ring-opacity-50': plan.highlighted,
            'border-gray-200 dark:border-gray-700': !plan.highlighted
          }"
        >
          <!-- Popular badge -->
          <div v-if="plan.popular" class="absolute -top-3 left-1/2 transform -translate-x-1/2">
            <span class="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">
              Most Popular
            </span>
          </div>
          
          <!-- Plan header -->
          <div class="text-center mb-6">
            <h3 class="text-xl font-bold mb-2">{{ plan.name }}</h3>
            <p class="text-gray-600 dark:text-gray-400 mb-4">{{ plan.description }}</p>
            <div class="mb-4">
              <span class="text-4xl font-bold">{{ plan.price }}</span>
              <span class="text-gray-600 dark:text-gray-400">/ {{ plan.billingCycle }}</span>
            </div>
          </div>
          
          <!-- Features list -->
          <ul class="space-y-3 mb-8">
            <li v-for="feature in plan.features" :key="feature" class="flex items-center">
              <svg class="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
              </svg>
              <span>{{ feature }}</span>
            </li>
          </ul>
          
          <!-- CTA Button -->
          <div class="text-center">
            <a 
              :href="plan.buttonLink"
              class="inline-block w-full py-3 px-6 rounded-lg font-medium transition-colors"
              :class="{
                'bg-blue-500 hover:bg-blue-600 text-white': plan.highlighted,
                'bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white': !plan.highlighted
              }"
            >
              {{ plan.buttonText }}
            </a>
          </div>
        </div>
      </div>
      
      <!-- Fallback content -->
      <div v-else class="text-center py-8">
        <p class="text-gray-500">No pricing plans available.</p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useAsyncData } from 'nuxt/app';

interface Props {
  pricingRefs?: string[]
}

const props = withDefaults(defineProps<Props>(), {
  pricingRefs: () => []
})

// Query pricing plans based on references or all plans
const { data: pricingPlans } = await useAsyncData('pricing-plans', async () => {
  if (props.pricingRefs.length > 0) {
    // Query specific pricing plans by slug
    return await queryCollection('pricingPlans')
      .where('slug', 'IN', props.pricingRefs)
      .order('order', 'ASC')
      .all()
  } else {
    // Get all pricing plans
    return await queryCollection('pricingPlans')
      .order('order', 'ASC')
      .all()
  }
})
</script>