import idb from '~/static/idb'

export const state = () => ({
    liked : [],
    count : 0,
    recent: [],
})

export const mutations = {
    saved (state, data){
        state.liked.push(data)
        state.count++
        idb.saveLiked(data);
    },
    remove (state, data){
        state.liked.splice(state.liked.indexOf(data),1)
        state.count--
        idb.deleteLiked(data);
    },
    getliked (state, data){
        state.liked = data     
        state.count = data.length
    },
    recentsearch (state, data){
        state.recent.push(data)
    },
    removesearch (state, data){
        state.recent.splice(state.recent.indexOf(data),1)
    },

}

export const actions = {
    async getdata({commit}){
        const somedata = await idb.getLiked()
        if(somedata){
            commit('getliked', somedata)
        }
    }
}