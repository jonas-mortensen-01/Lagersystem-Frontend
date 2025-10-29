<template>
    <main class="bg-gray-50 min-h-screen">
        <!-- Main About Section -->
        <section class="container mx-auto py-16 px-4 text-center">
            <!-- Introduction -->
            <div class="mb-12">
                <h1 class="text-4xl font-bold text-gray-800 mb-6">About Us</h1>
                <p class="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                    Welcome to our project! Our goal was to create a highly reactive and modular system for managing
                    products efficiently.
                    We focused on responsive design, maintainable code, and a shared vision for how we wanted to achieve
                    this.
                </p>
            </div>

            <!-- Frontend Section -->
            <div class="mb-12 text-left max-w-3xl mx-auto">
                <h2 class="text-2xl font-semibold text-gray-800 mb-4">Frontend</h2>
                <p class="text-gray-600 mb-2">
                    The frontend is built using <span class="font-semibold">HTML, CSS, Vue 3, and Nuxt 3</span>.
                    Styling is handled with <span class="font-semibold">Tailwind CSS</span>, and application state is
                    managed using <span class="font-semibold">Pinia</span>.
                </p>
                <p class="text-gray-600">
                    We focused on creating a modular, reactive interface that is easy to maintain and extend.
                    Components are reusable and responsive, ensuring a smooth experience for both developer and user.
                </p>
            </div>

            <!-- Backend Section -->
            <div class="text-left max-w-3xl mx-auto">
                <h2 class="text-2xl font-semibold text-gray-800 mb-4">Backend</h2>
                <p class="text-gray-600 mb-2">
                    The backend is implemented with <span class="font-semibold">Entity Framework</span> for database
                    management.
                    The application is containerized using <span class="font-semibold">Docker</span> to ensure
                    consistent environments
                    across development and production.
                </p>
                <p class="text-gray-600">
                    Our backend is designed to be scalable and maintainable, providing a robust API for the
                    frontend
                    to interact with efficiently.
                </p>
            </div>
        </section>

        <!-- Team Section -->
        <section class="container mx-auto py-16 px-4">
            <h2 class="text-3xl font-bold text-gray-800 text-center mb-12">Our Team</h2>

            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                <PersonDisplay name="Mikkel Jacobsen" role="Backend Developer" :image="null" />
                <PersonDisplay name="Emil Nordahn" role="Backend Developer" :image="null" />
                <PersonDisplay name="Jonas Kristoffer Mortensen" role="Frontend / UI Developer" :image="null" />
            </div>
        </section>
    </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

// Components
import PersonDisplay from '../../components/about/PersonDisplay.vue'

export default defineComponent({
    name: 'ProductPage',
    components: { PersonDisplay },
})
</script>
