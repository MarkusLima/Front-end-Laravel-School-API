<template>
  <footer>
    <div class="container">
      <router-link class="logo-font" :to="{ name: 'home', params: {} }">
        Mkbits
      </router-link>
      <span class="attribution">
        <a rel="noopener noreferrer" target="blank" href="https://mkbits.com.br"
          >Developers</a>
      </span>
    </div>
  </footer>
</template>

<script>
export default {
  name: "RwvFooter"
};
</script>
