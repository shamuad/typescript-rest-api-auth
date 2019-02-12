// src/index.ts - Old one we replace with the below code
// import 'reflect-metadata'
// import {createKoaServer} from "routing-controllers"
// import Controller from "./controller"

// const port = process.env.PORT || 4000

// const app = createKoaServer({
//    controllers: [Controller]
// })

// app.listen(port, () => console.log(`Listening on port ${port}`))
import 'reflect-metadata'
import {createKoaServer} from 'routing-controllers'
import PageController from './pages/controller'

const app = createKoaServer({
  controllers: [
    PageController
  ]
})

app.listen(4000, () => console.log('Listening on port 4000'))