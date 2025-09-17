import { defineStore } from 'pinia'
import { User } from '../types/user'
import { ScheduleWeek } from '../assets/types/enums/ScheduleWeek'
// import { WeekDays } from '../assets/types/enums/WeekDays'
const baseUrl = import.meta.env.VITE_BASE

export const useCounterStore = defineStore('counter', {
  state: () => ({ 
    count: 0, 
    name: 'Eduardo', 
    user: {} as User,
    reportModal: false

   }),
  getters: {
    doubleCount: (state) => state.count * 2,
  },
  actions: {
    increment() {
      this.count++
    },
    async postOrGetUser(username: string): Promise<User> {
      const date = new Date();
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      const data = {
        username: username,
        joinDate: `${day}-${month}-${year}`,
        coins: 1,
        health: 100,
        exp: 1,
        lvl: 1,
        role: 1,
        avatarUrl: "none",
      };

      try {
        const response = await fetch(`${baseUrl}/users`, {
          method: "POST",
          mode: "cors",
          body: JSON.stringify(data),
          headers: {
            "content-type": "application/json",
          },
        });

        if (!response.ok) {
        
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const user = await response.json();
        return user;
      } catch (error) {
        console.error("Error creating or getting user:", error);
       
        throw error; 
      }
    },



    async getUser(username: string): Promise<User | null> {
      let res: any = null

      await fetch(`${baseUrl}/users/${username}`,
        {
          mode: "cors"
        }
      ).then((resp) => resp.json())
        .then((data) => {
          console.log("user", res)
          res = data
        })

      return res
    },

    async checkIfUserExists(username: string): Promise<boolean> {
      let users;
      await fetch(baseUrl)
        .then((resp) => resp.json())
        .then((data) => users = data)


      console.log(users, username)

      return false

    },
// fetch("https://brso.sseu.ru/api/v1/schedule-board/by-group?groupId=527&scheduleWeek=NEXT&date=2025-09-03", {
//   "headers": {
//     "accept": "application/json, text/plain, */*",
//     "accept-language": "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7",
//     "authorization": "null",
//     "priority": "u=1, i",
//     "sec-ch-ua": "\"Not;A=Brand\";v=\"99\", \"Google Chrome\";v=\"139\", \"Chromium\";v=\"139\"",
//     "sec-ch-ua-mobile": "?1",
//     "sec-ch-ua-platform": "\"Android\"",
//     "sec-fetch-dest": "empty",
//     "sec-fetch-mode": "cors",
//     "sec-fetch-site": "same-origin"
//   },
//   "referrer": "https://brso.sseu.ru/schedule-board/schedule-all",
//   "body": null,
//   "method": "GET",
//   "mode": "cors",
//   "credentials": "include"
// });

// await fetch("https://brso.sseu.ru/api/v1/schedule-board/by-group?groupId=504&scheduleWeek=CURRENT&date=2025-09-03", {
//     "credentials": "omit",
//     "headers": {
//         "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:143.0) Gecko/20100101 Firefox/143.0",
//         "Accept": "*/*",
//         "Accept-Language": "ru-RU,ru;q=0.8,en-US;q=0.5,en;q=0.3",
//         "Sec-Fetch-Dest": "empty",
//         "Sec-Fetch-Mode": "cors",
//         "Sec-Fetch-Site": "cross-site",
//         "Priority": "u=4"
//     },
//     "referrer": "http://localhost:5173/",
//     "method": "OPTIONS",
//     "mode": "cors"
// });
    async getScheduleJSON(groupId: number, date: string, scheduleWeek: ScheduleWeek) {
      console.log(`https://lms3.sseu.ru/api/v1/schedule-board/by-group?groupId=${groupId}&scheduleWeek=${scheduleWeek}&date=${date}`)
      const resp = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(`https://lms3.sseu.ru/api/v1/schedule-board/by-group?groupId=${groupId}&scheduleWeek=${scheduleWeek}&date=${date}`)}`,
        {
          // "headers": {
          //   "accept": "application/json, text/plain, */*",
          //   "accept-language": "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7",
          //   "priority": "u=1, i",
          //   "sec-ch-ua": "\"Not;A=Brand\";v=\"99\", \"Google Chrome\";v=\"139\", \"Chromium\";v=\"139\"",
          //   "sec-ch-ua-mobile": "?1",
          //   "sec-ch-ua-platform": "\"Android\"",
          //   "sec-fetch-dest": "empty",
          //   "sec-fetch-mode": "cors",
          //   "sec-fetch-site": "same-origin",
          //   "Access-Control-Allow-Origin": "*",
          //   "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
          // },
          // "referrer": "https://brso.sseu.ru/schedule-board/schedule-all",
          // "body": null,
          "method": "GET",
          // "mode": "cors",
          // "credentials": "include"
        }
        /*

        */
      )
      const data = await resp.json()
      console.log("scheduled JSON", data)
      return JSON.parse(data.contents)
    },

    async getNDaySchedule(schedule: any, day: string) {
      console.log("n day sch", day, schedule)
      let res: any = { dayInfo: "", schedule: [] }
      if (day == "SUNDAY")
        return

      schedule.headers.forEach((item: any) => {
        if (item.value == day)
          res.dayInfo = item.text

      })
      // schedule.headers.shift()
      console.log(schedule.headers)
      schedule.body.forEach((item: any, i: number) => {

        if (item[day][0]["workPlan"]["discipline"] == null) return
        if (item[day][0]["subject"][0]["name"] == undefined) return
        // if(schedule.headers[i].value == "name")
        // i++
        console.log("DAAAYS", schedule.headers[i].value, day)


        const disciplineName = item[day][0]["workPlan"]["discipline"]["name"]
        let teacherName = item[day][0]["subject"][0]["name"]
        const lessonType = item[day][0]["workPlan"]["lessonTypes"]["name"]
        let audience
        if (item[day][0]["subject"][0]["audiences"][0])
          audience = item[day][0]["subject"][0]["audiences"][0]["name"]
        else
          audience = "Аудитория не указана"

        if (teacherName == "")
          teacherName = item[day][0]["subject"][0]["replacementTeachers"][0]["fio"]
        res.schedule.push({ teacherName: teacherName, disciplineName: disciplineName, audience: audience, lessonType: lessonType, time: item["name"] })

      })
      // console.log(res)
      return res
    },

    getNDay(dayIndex: number) {
      const weekDaysArr = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
      const currDay = weekDaysArr[dayIndex].toUpperCase()
      return currDay
    },

    async getUserTasks(username: string | null) {
      if (username == null) return
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