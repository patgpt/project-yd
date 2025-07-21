<template>
  <VSheet class="py-16" color="grey-lighten-4">
    <VContainer>
      <VRow justify="center" align="center">
        <VCol cols="12" md="8" class="text-center">
          <h2 class="text-h3 font-weight-bold mb-4">
            Subscribe to Our Newsletter
          </h2>
          <p class="text-h6 font-weight-light mb-8">
            Get the latest news and updates delivered straight to your inbox.
          </p>
          <VForm ref="form" @submit.prevent="subscribe">
            <VRow justify="center">
              <VCol cols="12" md="6">
                <VTextField
                  v-model="email"
                  :rules="emailRules"
                  label="Enter your email"
                  variant="solo-filled"
                  required
                  class="mb-4"
                />
              </VCol>
              <VCol cols="12" md="auto">
                <VBtn
                  :loading="loading"
                  type="submit"
                  color="primary"
                  size="x-large"
                  class="w-100"
                >
                  Subscribe
                </VBtn>
              </VCol>
            </VRow>
          </VForm>
        </VCol>
      </VRow>
    </VContainer>
    <VSnackbar v-model="snackbar.show" :color="snackbar.color" :timeout="3000">
      {{ snackbar.text }}
      <template #actions>
        <VBtn color="white" variant="text" @click="snackbar.show = false">
          Close
        </VBtn>
      </template>
    </VSnackbar>
  </VSheet>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const email = ref("");
const loading = ref(false);
const form = ref<HTMLFormElement | null>(null);

const snackbar = ref({
  show: false,
  text: "",
  color: "",
});

const emailRules = [
  (v: string) => !!v || "E-mail is required",
  (v: string) => /.+@.+\..+/.test(v) || "E-mail must be valid",
];

async function subscribe() {
  if (form.value) {
    const { valid } = await form.value.validate();
    if (!valid) return;

    try {
      const { data, error, status, pending } = await useFetch(
        "/api/subscribe",
        {
          method: "POST",
          body: { email: email.value },
        },
      );
      loading.value = pending.value;
      if (status.value === "success") {
        snackbar.value = {
          show: true,
          text: "Subscription successful!",
          color: "success",
        };
        form.value.reset();
        console.log("Subscription successful:", data.value);
      } else {
        snackbar.value = {
          show: true,
          text:
            error.value?.message || "Subscription failed. Please try again.",
          color: "error",
        };
      }
    } catch (error) {
      console.error(error);
      snackbar.value = {
        show: true,
        text: "An error occurred. Please try again.",
        color: "error",
      };
    } finally {
      form.value?.reset();
    }
  }
}
</script>
