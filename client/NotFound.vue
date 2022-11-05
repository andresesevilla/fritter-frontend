<!-- Catch-all page for visiting invalid URLs that haven't been registered -->

<template>
  <main>
    <section>
      <h2>{{$router.currentRoute.path.startsWith('/@') ? 'User' : 'Page'}} Not Found</h2>
      <p>The requested {{$router.currentRoute.path.startsWith('/@') ? 'user' : 'page'}} does not exist.</p>
      <h3>
        <router-link to="/">
          Return to home page
        </router-link>
      </h3>
    </section>
  </main>
</template>