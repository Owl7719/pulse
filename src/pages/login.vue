<script setup lang="ts">
import Card from '@/components/ui/card/Card.vue';
import CardHeader from '@/components/ui/card/CardHeader.vue';
import CardTitle from '@/components/ui/card/CardTitle.vue';
import CardDescription from '@/components/ui/card/CardDescription.vue';
import CardContent from '@/components/ui/card/CardContent.vue';
import Button from '@/components/ui/button/Button.vue';
import Separator from '@/components/ui/separator/Separator.vue';
import Label from '@/components/ui/label/Label.vue';
import Input from '@/components/ui/input/Input.vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { login } from '@/utils/supaAuth';
import { useFormErrors } from '@/composables/formErrors';

const formData = ref({
  email: '',
  password: '',
});

const { serverError, handleServerError, realTimeErrors, handleLoginForm } = useFormErrors();

const router = useRouter();

const signin = async () => {
  const { error } = await login(formData.value);

  if (!error) return router.push('/');

  handleServerError(error);
};
</script>

<template>
  <div class="mx-auto flex w-full justify-center items-center p-10 text-center -mt-20 min-h-[90vh]">
    <Card class="max-w-sm w-full mx-auto">
      <CardHeader>
        <CardTitle class="text-2xl"> Login </CardTitle>
        <CardDescription> Login to your account </CardDescription>
      </CardHeader>
      <CardContent>
        <div class="flex flex-col gap-4 mb-4 justify-center items-center">
          <Button variant="outline" class="w-full"> Register with Google </Button>
          <Separator label="Or" />
        </div>

        <form class="grid gap-4" @submit.prevent="signin">
          <div class="grid gap-2">
            <Label id="email" class="text-left">Email</Label>

            <Input
              type="email"
              placeholder="johndoe19@example.com"
              required
              v-model="formData.email"
              :class="{ 'border-red-500': serverError }"
              @input="handleLoginForm(formData)"
            />

            <ul v-if="realTimeErrors?.email.length" class="text-sm text-left text-red-500">
              <li v-for="error in realTimeErrors.email" :key="error" class="list-disc">
                {{ error }}
              </li>
            </ul>
          </div>
          <div class="grid gap-2">
            <div class="flex items-center">
              <Label id="password">Password</Label>
              <a href="#" class="inline-block ml-auto text-xs underline"> Forgot your password? </a>
            </div>

            <Input
              id="password"
              type="password"
              autocomplete
              required
              v-model="formData.password"
              :class="{ 'border-red-500': serverError }"
            />

            <ul v-if="realTimeErrors?.password.length" class="text-sm text-left text-red-500">
              <li v-for="error in realTimeErrors.password" :key="error" class="list-disc">
                {{ error }}
              </li>
            </ul>
          </div>
          <ul v-if="serverError" class="text-sm text-left text-red-500">
            <li class="list-disc">{{ serverError }}</li>
          </ul>
          <Button type="submit" class="w-full"> Login </Button>
        </form>
        <div class="mt-4 text-sm text-center">
          Don't have an account?
          <RouterLink to="/register" class="underline"> Register </RouterLink>
        </div>
      </CardContent>
    </Card>
  </div>
</template>
