<template>
  <VContainer>
    <VRow justify="center">
      <VCol cols="12" md="8">
        <VCard class="pa-4">
          <VCardTitle class="text-h5 text-center mb-4">Contact Us</VCardTitle>
          <VCardSubtitle class="text-center"
            >We'd love to hear from you!</VCardSubtitle
          >
          <VCardText>
            <VForm ref="form" v-model="valid" lazy-validation>
              <VTextField
                v-model="name"
                :rules="nameRules"
                label="Name"
                required
                variant="outlined"
                class="mb-4"
              />

              <VTextField
                v-model="email"
                :rules="emailRules"
                label="E-mail"
                required
                variant="outlined"
                class="mb-4"
              />

              <VTextarea
                v-model="message"
                :rules="messageRules"
                label="Message"
                required
                variant="outlined"
                class="mb-4"
              />

              <div class="d-flex justify-end">
                <VBtn color="secondary" class="mr-4" @click="clear">
                  Clear
                </VBtn>
                <VBtn :disabled="!valid" color="primary" @click="submit">
                  Submit
                </VBtn>
              </div>
            </VForm>
          </VCardText>
        </VCard>
      </VCol>
    </VRow>
    <VSnackbar v-model="snackbar" :timeout="3000" color="success">
      Form submitted successfully!
      <template #actions>
        <VBtn color="white" variant="text" @click="snackbar = false">
          Close
        </VBtn>
      </template>
    </VSnackbar>
  </VContainer>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const valid = ref(true);
const form = ref<HTMLFormElement | null>(null);
const snackbar = ref(false);

const name = ref("");
const nameRules = [(v: string) => !!v || "Name is required"];

const email = ref("");
const emailRules = [
  (v: string) => !!v || "E-mail is required",
  (v: string) => /.+@.+\..+/.test(v) || "E-mail must be valid",
];

const message = ref("");
const messageRules = [(v: string) => !!v || "Message is required"];

async function submit() {
  if (form.value) {
    const { valid } = await form.value.validate();
    if (valid) {
      // Handle form submission, e.g., send data to a server
      console.log("Form submitted:", {
        name: name.value,
        email: email.value,
        message: message.value,
      });
      snackbar.value = true;
    }
  }
}

function clear() {
  form.value?.reset();
}
</script>
