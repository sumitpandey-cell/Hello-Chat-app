import { BrowserRouter, Route, Routes } from "react-router-dom"
import React, { lazy, Suspense } from "react"
const Home = lazy(() => import("./pages/Home.js"))
const Login = lazy(() => import("./pages/Login.js"))
const Chat = lazy(() => import("./pages/Chat.js"))
const Group = lazy(() => import("./pages/Group.js"))
import ProtectedRoute from "./components/auth/ProtectedRoute.js"
import Loaders from "./components/Loaders.js"
import store from "./app/store.js"
import {Provider} from "react-redux"
function App() {
  let user = true
  return (
    <BrowserRouter>
      <Suspense fallback={<Loaders />}>
          <Provider store={store}>
          <Routes>
            <Route element={<ProtectedRoute user={user} />}>
              <Route path="/" element={<Home />} />
              <Route path="/chat/:id" element={<Home/>} />
              <Route path="/group" element={<Group />} />
            </Route>
            <Route path="/login" element={<Login />} />
          </Routes>
          </Provider>
      </Suspense>
    </BrowserRouter>
  )
}

export default App
