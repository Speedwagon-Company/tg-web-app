import { createRouter, createWebHashHistory } from "vue-router";
import DailyPage from "./pages/DailyPage.vue";
import AchievementPage from "./pages/AchievementPage.vue";
import ShopPage from "./pages/ShopPage.vue";
import LeaderboardPage from "./pages/LeaderboardPage.vue";
import AuthPage from "./pages/AuthPage.vue";
import CharPage from "./pages/CharPage.vue";
import InventoryPage from "./pages/InventoryPage.vue";

export default createRouter({
    history:createWebHashHistory(),
    routes: [
        {
            path:"/",
            redirect:"/achievements"
        },
        {
            path:"/daily",
            component:DailyPage,

        },
        {
            path:"/achievements",
            component:AchievementPage
        },
        {
            path:"/shop",
            component:ShopPage
        },
        {
            path:"/leaderboard",
            component:LeaderboardPage
        },
        {
            path:"/token",
            component:AuthPage
        },
        {
            path:"/character",
            component:CharPage
        },
        {
            path:"/character/inventory",
            component:InventoryPage
        }
    ]
})