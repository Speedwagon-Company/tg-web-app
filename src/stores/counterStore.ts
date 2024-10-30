import { defineStore } from 'pinia'
import { User } from '../types/user'
import { ScheduleWeek } from '../assets/types/enums/ScheduleWeek'
// import { WeekDays } from '../assets/types/enums/WeekDays'
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
          "joinDate": `${day}-${month}-${year}`,
          "coins": 1,
          "health": 100,
          "exp": 1,
          "lvl": 1,
          "role": 1,
          "avatarUrl": "none"
        }
        await fetch(`${baseUrl}/users`,
          {
            method:"POST",
            mode:"cors",
            body: JSON.stringify(data),
            headers:{
              "content-type":"application/json"
            }
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

      },

      async getScheduleJSON(groupId: number, date: string, scheduleWeek: ScheduleWeek){
        console.log(`https://lms3.sseu.ru/api/v1/schedule-board/by-group?groupId=${groupId}&scheduleWeek=${scheduleWeek}&date=${date}`)
        const resp = await fetch(`https://lms3.sseu.ru/api/v1/schedule-board/by-group?groupId=${groupId}&scheduleWeek=${scheduleWeek}&date=${date}`,
          {
            headers:{
              "Authorization":`${localStorage.getItem("token")}`
            }
          }
        )
        const data = await resp.json()
        console.log("scheduled JSON",data)
        return data
      },

      async getNDaySchedule(schedule: any, day: string){
        console.log("n day sch",day, schedule)
        let res: any = {dayInfo:"",schedule:[]}
        if(day == "SUNDAY")
          return
        
        schedule.headers.forEach((item: any) => {
          if(item.value == day)
            res.dayInfo = item.text

        })
        // schedule.headers.shift()
        console.log(schedule.headers)
        schedule.body.forEach((item: any, i: number) => {
          
          if(item[day][0]["workPlan"]["discipline"] == null) return
          if(item[day][0]["subject"][0]["name"] == undefined) return
          // if(schedule.headers[i].value == "name")
            // i++
          console.log("DAAAYS", schedule.headers[i].value, day)
         
          
          const disciplineName = item[day][0]["workPlan"]["discipline"]["name"]
          let teacherName = item[day][0]["subject"][0]["name"] 
          const lessonType = item[day][0]["workPlan"]["lessonTypes"]["name"]
          let audience
          if(item[day][0]["subject"][0]["audiences"][0])
            audience = item[day][0]["subject"][0]["audiences"][0]["name"]
          else
            audience = "Аудитория не указана"

          if(teacherName == "")
            teacherName = item[day][0]["subject"][0]["replacementTeachers"][0]["fio"]
          res.schedule.push({ teacherName:teacherName,disciplineName:disciplineName, audience:audience,lessonType:lessonType, time:item["name"]  })
  
        })
        // console.log(res)
        return res
      },

      getNDay(dayIndex: number){
        const weekDaysArr = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
        const currDay = weekDaysArr[dayIndex].toUpperCase()
        return currDay
      },

      async getUserTasks(username: string | null){
        if(username == null) return
        let res
        await fetch(`${baseUrl}/tasks/all/${username}`)
        .then((resp) => resp.json())
        .then((data) => res = data)
        console.log(res)
        return res
      },

      addDaysToDate(dateString: Date, daysToAdd: number) {
        const date = new Date(dateString);
        date.setDate(date.getDate() + daysToAdd);
        return date.toISOString().split('T')[0];
       }

    },
  })