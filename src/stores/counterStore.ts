import { defineStore } from 'pinia'

const baseUrl = import.meta.env.VITE_BASE

export const useCounterStore = defineStore('counter', {
    state: () => ({ count: 0, name: 'Eduardo' }),
    getters: {
      doubleCount: (state) => state.count * 2,
    },
    actions: {
      increment() {
        this.count++
      },
      async saveUsername(username: string){
        await fetch(`${baseUrl}`,
          {
            method:"POST",
            body: JSON.stringify({name:username})
          }
        )
        localStorage.setItem("username", username)

      },

      async checkIfUserExists(username: string): Promise<boolean>{
        let users;
        await fetch(baseUrl)
        .then((resp) => resp.json())
        .then((data) => users = data)

        
        console.log(users, username)

        return false

      }

    },
  })