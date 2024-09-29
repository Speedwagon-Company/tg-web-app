import { defineStore } from 'pinia'
import { User } from '../types/user'
const baseUrl = import.meta.env.VITE_BASE

export const useCounterStore = defineStore('counter', {
    state: () => ({ count: 0, name: 'Eduardo', user: {} as User }),
    getters: {
      doubleCount: (state) => state.count * 2,
    },
    actions: {
      increment() {
        this.count++
      },
      async postOrGetUser(username: string){
        const date = new Date();

        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        let res
        const data = {
          "username": username,
          "join_date": `${day}-${month}-${year}`,
          "coins": 0,
          "health": 100,
          "exp": 0,
          "lvl": 1,
          "role_id": 1,
          "avatar_url": "none"
        }
        await fetch(`${baseUrl}/user`,
          {
            method:"POST",
            body: JSON.stringify(data)
          }
        ).then((resp) => resp.json())
        .then((data) => res = data)
        localStorage.setItem("username", username)
        return res
      },

      async getUser(username: string): Promise<User | null>{
        let res = null

        await fetch(`${baseUrl}/user/${username}`,
          {
            mode:"cors"
          }
        ).then((resp) => resp.json())
        .then((data) => {
          if(data.user == "nil")
            return
          res = data.user
        })

        return res
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