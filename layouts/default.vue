<template>
  <div>
    <nuxt/>
    <svg @click="goto" class="love saved side" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50"><path class="lovefill" d="M24.85 10.126c2.018-4.783 6.628-8.125 11.99-8.125 7.223 0 12.425 6.179 13.079 13.543 0 0 .353 1.828-.424 5.119-1.058 4.482-3.545 8.464-6.898 11.503L24.85 48 7.402 32.165c-3.353-3.038-5.84-7.021-6.898-11.503-.777-3.291-.424-5.119-.424-5.119C.734 8.179 5.936 2 13.159 2c5.363 0 9.673 3.343 11.691 8.126z" fill="#c03a2b"/><path d="M6 18.078a1 1 0 01-1-1c0-5.514 4.486-10 10-10a1 1 0 110 2c-4.411 0-8 3.589-8 8a1 1 0 01-1 1z" fill="#ed7161"/></svg>
    <div @click="toggle" class=" saved side dark">
      <svg v-if="dark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 302.4 302.4"><path d="M204.8 97.6C191.2 84 172 75.2 151.2 75.2s-40 8.4-53.6 22.4c-13.6 13.6-22.4 32.8-22.4 53.6s8.8 40 22.4 53.6c13.6 13.6 32.8 22.4 53.6 22.4s40-8.4 53.6-22.4c13.6-13.6 22.4-32.8 22.4-53.6s-8.4-40-22.4-53.6zM151.2 51.6c5.6 0 10.4-4.8 10.4-10.4V10.4c0-5.6-4.8-10.4-10.4-10.4-5.6 0-10.4 4.8-10.4 10.4v30.8c0 5.6 4.8 10.4 10.4 10.4zM236.4 80.8l22-22c4-4 4-10.4 0-14.4s-10.4-4-14.4 0l-22 22c-4 4-4 10.4 0 14.4 3.6 4 10 4 14.4 0zM292 140.8h-30.8c-5.6 0-10.4 4.8-10.4 10.4 0 5.6 4.8 10.4 10.4 10.4H292c5.6 0 10.4-4.8 10.4-10.4 0-5.6-4.8-10.4-10.4-10.4zM236 221.6c-4-4-10.4-4-14.4 0s-4 10.4 0 14.4l22 22c4 4 10.4 4 14.4 0s4-10.4 0-14.4l-22-22zM151.2 250.8c-5.6 0-10.4 4.8-10.4 10.4V292c0 5.6 4.8 10.4 10.4 10.4 5.6 0 10.4-4.8 10.4-10.4v-30.8c0-5.6-4.8-10.4-10.4-10.4zM66 221.6l-22 22c-4 4-4 10.4 0 14.4s10.4 4 14.4 0l22-22c4-4 4-10.4 0-14.4-3.6-4-10-4-14.4 0zM51.6 151.2c0-5.6-4.8-10.4-10.4-10.4H10.4c-5.6 0-10.4 4.8-10.4 10.4s4.8 10.4 10.4 10.4h30.8c5.6 0 10.4-4.8 10.4-10.4zM66 80.8c4 4 10.4 4 14.4 0s4-10.4 0-14.4l-22-22c-4-4-10.4-4-14.4 0s-4 10.4 0 14.4l22 22z"/></svg>
      <svg v-if="!dark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 312.812 312.812"><path d="M305.2 178.159c-3.2-.8-6.4 0-9.2 2-10.4 8.8-22.4 16-35.6 20.8-12.4 4.8-26 7.2-40.4 7.2-32.4 0-62-13.2-83.2-34.4-21.2-21.2-34.4-50.8-34.4-83.2 0-13.6 2.4-26.8 6.4-38.8 4.4-12.8 10.8-24.4 19.2-34.4 3.6-4.4 2.8-10.8-1.6-14.4-2.8-2-6-2.8-9.2-2-34 9.2-63.6 29.6-84.8 56.8-20.4 26.8-32.4 60-32.4 96 0 43.6 17.6 83.2 46.4 112s68 46.4 112 46.4c36.8 0 70.8-12.8 98-34 27.6-21.6 47.6-52.4 56-87.6 1.6-5.6-1.6-11.2-7.2-12.4z"/></svg>
    </div>
    <transition name="slide-left">
      <svg v-if="showtop" class="side up"  @click="scrolltop" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path style="transform: rotate(-90deg); transform-origin: center;" d="M423.386 248.299l-256-245.327c-4.208-4.021-10.833-3.958-14.927.167l-64 63.998a10.655 10.655 0 00.219 15.291L272.47 256.007 88.678 429.586a10.655 10.655 0 00-.219 15.291l64 63.998a10.634 10.634 0 007.542 3.125c2.656 0 5.313-.979 7.385-2.958l256-245.327a10.696 10.696 0 000-15.416z"/></svg>
    </transition>
  </div>
</template>

<script>
export default {
  data(){
    return{
      dark: false,
      showtop: false,
    }
  },
  methods:{
    goto(){
      this.$router.push({ path: `/collection`})
    },
    toggle(){
      if(this.dark == true){
        this.dark = false
        document.documentElement.setAttribute('data-theme', 'lighttheme')
      }
      else {
        this.dark = true
        document.documentElement.setAttribute('data-theme', 'darktheme')
      }
    },
    scrolltop(){
      window.scroll({
        top: 0,
        left:0,
        behavior: 'smooth'
      }
      )
    },
  },
  mounted(){
    if(window.matchMedia('(prefers-color-scheme: dark)').matches){
      this.dark = true
      document.documentElement.setAttribute('data-theme', 'darktheme')
    }
    else{document.documentElement.setAttribute('data-theme', 'lighttheme')}
    this.$store.dispatch('saved/getdata')

    window.addEventListener('scroll', ()=>{
      if(window.scrollY > 1000){
        this.showtop = true
      }
      else{ this.showtop = false}

    })
  }

}
</script>

<style>

</style>
