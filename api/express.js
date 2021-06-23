import express from 'express'
import routs from "./config/Routs.mjs"
import {Error403, Error404, ServerError} from "./server/Errors.mjs";
import {Auth} from "./server/Auth.mjs";
import {maria} from "./server/MariaDb.mjs";
import DataBases from "./config/DataBases.mjs";
import User from "./config/User.mjs";

const app = express()
const port = 15012

maria.createPool(DataBases.mariaDb)

app.set('json spaces', 2)

/// CORS
/// to_do res.header('Access-Control-Allow-Headers', 'Authorization, Origin, X-Requested-With, Content-Type, Accept');
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Methods', 'OPTIONS, GET, POST')
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', '*')
  if (req.method === 'OPTIONS') {
    res.sendStatus(200)
  } else {
    console.log('Time:', Date.now(), req.path)
    next()
  }
})

/// JSON из POST запроса
app.use(express.json());
//app.use(express.urlencoded({ extended: true }));


app.use(async function (req, res, next) {

  try {

    let path = req.path.replace('/_api_/', '/')

    /// Проверка наличия ресурса
    if (routs[path]) {

      let token = null
      if (req.headers.authorization) {
        let tokenArr = req.headers.authorization.split(' ')
        if (tokenArr.length >= 1) token = tokenArr[1]
      }

      let params = (req.method === 'GET') ? req.query : req.body
      let task = routs[path][1]

      /// Авторизация
      let user = new User()
      await user.setIdentityByToken(token)

      /// Аутентификация
      if (Auth.can(user.role, task)) {

        /// Создание объекта контроллера
        let controllerClass = routs[path][0]
        let controller = new controllerClass(user)

        //let actionName = routs[path][1].signature[0]
        /// Имя экшена совпадает с последним словом в путь /path/to/actionName
        let actionName = path.split('/')[path.split('/').length - 1]

        /// Подготовка параметров todo
        let sendParams = Object.values(params)
        // let refParams = routs[path][1].signature.slice(1)
        // let convertParams = []
        // sendParams.forEach((val, index) => {
        //   let refType = refParams[index][0]
        //   if (refType === 'S') convertParams.push(String(val))
        //   if (refType === 'N') convertParams.push(Number(val))
        //   if (refType === 'B') convertParams.push(Boolean(val))
        // })

        /// Вызов экшена
        let actionResult = controller[actionName](...sendParams)

        /// Возврат ответа
        if (actionResult instanceof Promise) {
          // Если экшен асинхронный и вернул промис
          actionResult.then(result => res.json({status: 'success', data: result})).catch(next)
        } else {
          // Иначе экшен синхронный и вернул нечто через return
          res.json({status: 'success', data: actionResult})
        }

      } else {
        throw new Error403(`Запрещен доступ. Роль: "${user.role}", задача: "${task}", экшен: "${path}"`)
      }
    } else {
      throw new Error404('Не найден экшен для ' + path)
    }
  } catch (err) {
    next(err);
  }
})


app.use(function (err, req, res, next) {
  console.error(err.stack)
  if (err instanceof ServerError) {
    res.json({status: err.status, meta: {message: err.message}})
  } else {
    res.json({status: 'error500', meta: {message: err.stack}})
  }
});


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})