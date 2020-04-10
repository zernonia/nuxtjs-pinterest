export const state = () => ({
    liked : [],
    count : 0,
    recent: [],
})

export const mutations = {
    saved (state, data){
        state.liked.push(data)
        state.count++
    },
    remove (state, data){
        state.liked.splice(state.liked.indexOf(data),1)
        state.count--
    },
    recentsearch (state, data){
        state.recent.push(data)
    },
    removesearch (state, data){
        state.recent.splice(state.recent.indexOf(data),1)
    }
}

export const getters = {
    getsaved (state){
        return state.liked
    }
}