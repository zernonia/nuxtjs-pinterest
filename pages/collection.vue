<template>
  <div class="content">
    <div class="header">
      <h1>My <span class="head">Collection ({{ count }})</span></h1>
      <h3 @click="goback" class="back">⇽ Back</h3>
    </div>
    <!-- <div class="gallery" > -->
    <transition-group name="picture-list" tag="div" class="gallery">
      <div class="photos" v-for="(picture, index) in allpicture" :key="picture.likes" >
        <img :src="picture.regular" :alt="picture.altdesc" @click="openmodal(index)">
        <h5 class="user">{{ picture.name }}</h5>
        <svg @click="addlike(picture)" :class="{ saved : issaved(picture.id) }" class="love" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50"><path class="lovefill" d="M24.85 10.126c2.018-4.783 6.628-8.125 11.99-8.125 7.223 0 12.425 6.179 13.079 13.543 0 0 .353 1.828-.424 5.119-1.058 4.482-3.545 8.464-6.898 11.503L24.85 48 7.402 32.165c-3.353-3.038-5.84-7.021-6.898-11.503-.777-3.291-.424-5.119-.424-5.119C.734 8.179 5.936 2 13.159 2c5.363 0 9.673 3.343 11.691 8.126z" fill="#c03a2b"/><path d="M6 18.078a1 1 0 01-1-1c0-5.514 4.486-10 10-10a1 1 0 110 2c-4.411 0-8 3.589-8 8a1 1 0 01-1 1z" fill="#ed7161"/></svg>
      </div>
    </transition-group>
    <!-- </div> -->
    <div class="modal" @click="closemodalwindow">
      <span class="close" @click="closemodal">&times;</span>
      <div class="modalcontent">
        <img class="modalimg" :src="modaldata.full" :alt="modaldata.altdesc">
        <div class="modaltext">
          <h5 class="modaluser">{{ modaldata.name }}</h5>
          <h1 class="modaldesc">{{ modaldata.desc }}</h1>
          <svg @click="addlike(modaldata)" :class="{ saved : issaved(modaldata.id) }" class="love modallove" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50"><path class="lovefill" d="M24.85 10.126c2.018-4.783 6.628-8.125 11.99-8.125 7.223 0 12.425 6.179 13.079 13.543 0 0 .353 1.828-.424 5.119-1.058 4.482-3.545 8.464-6.898 11.503L24.85 48 7.402 32.165c-3.353-3.038-5.84-7.021-6.898-11.503-.777-3.291-.424-5.119-.424-5.119C.734 8.179 5.936 2 13.159 2c5.363 0 9.673 3.343 11.691 8.126z" fill="#c03a2b"/><path d="M6 18.078a1 1 0 01-1-1c0-5.514 4.486-10 10-10a1 1 0 110 2c-4.411 0-8 3.589-8 8a1 1 0 01-1 1z" fill="#ed7161"/></svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
data(){
    return{
        allpicture : this.$store.state.saved.liked,
        modaldata: {},
    }
},
computed: {
    count(){
        return this.$store.state.saved.count
    }
},
methods:{
    goback(){
        this.$router.push({ path: `/`})
    },
    issaved(id){
      const temp = this.$store.state.saved.liked.filter(data => {if(data.id == id) return data.id})
      if (temp.length > 0)
        return true
    },
    openmodal(index){
      document.querySelector(".modal").style.display = "block"
      document.querySelector("body").style.overflow = "hidden"
      this.modaldata = this.allpicture[index]
    },
    closemodal(){
      this.modaldata = {}
  
      document.querySelector(".modal").style.display = "none"
      document.querySelector("body").style.overflow = "visible"
    },
    closemodalwindow(e){
      if(e.target === document.querySelector(".modal")){
        this.closemodal()
      }
    },
    addlike(picture){
      const temp = this.$store.state.saved.liked.filter(data => {if(data.id == picture.id) return data.id})
      if (temp.length == 0 ){
        this.$store.commit('saved/saved', picture)}
      else {this.$store.commit('saved/remove', picture)}
    },
    issaved(id){
      const temp = this.$store.state.saved.liked.filter(data => {if(data.id == id) return data.id})
      if (temp.length > 0)
        return true
    },
}
}
</script>

<style>
.back{
    cursor: pointer;
}
</style>