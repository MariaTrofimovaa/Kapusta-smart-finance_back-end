# Kapusta-smart-finanse_back-end

### Команды:

- `npm start` старт сервера в режиме production
- `npm run start:dev` старт сервера в режиме разработки (development)

### Файлы и папки

- В файле `routes/server_req` лежат все наши запросы на сервер (потом будет удален)

### Роуты

 1. Запрос на регистрацию пользователя _Паша
router.post("/signup", validation(joiSchema), ctrl.signup);

 2. Запрос на верификацию email зарегистрированного пользователя _Паша
router.get("/verify/:verifyToken", ctrl.verifyEmail); //запрос на считывание токена, при переходе юзера по ссылке в письме

 3. Запрос на логинизацию _Паша
router.post("/signin", validation(joiSchema), ctrl.signin);

 4. Запрос на получение данных о пользователе _Паша
router.get("/current", authentificate, ctrl.getCurrentUser);

 5. Запрос на разлогинивание пользователя _Паша
router.get("/logout", authentificate, ctrl.logout);

 6. Отправка данных о транзакциях (доходы/расходы) _Алена
 ** ДА, ПОКА ЭТО 2 ОТДЕЛЬНЫХ РОУТА **
router.post("/expense", authentificate,  validation(joiSchema), ctrl.addExpense);
router.post("/income", authentificate,  validation(joiSchema), ctrl.addIncome);

 !!! ***** нужно объединить в один: 
router.post("/:type", authentificate,  validation(joiSchema), ctrl.add);

 7. Получить список транзакций за указанный месяц _Максим
router.get("/:type/:month", authentificate, ctrl.getByMonth); 

 можно сократить до: (добавить еще один роут)
router.get("/:month",authentificate, ctrl.getForMonth);

 8. Удалить транзакцию из таблицы _Руслан
router.delete("/:id", authentificate, ctrl.removeById);

 9. Получение даных за конкретный день
router.get("/:type/:date", authentificate, ctrl.getByDate);

 10. Получить текущий баланс пользователя _Света ---- не надо
router.get("/", authentificate, ctrl.getBalance);
// не нужно, баланс есть в информации о пользователя, которую мы получаем при логине либо при запросе на /auth/current

 11. Изменить баланс _Света
router.patch("/", authentificate, ctrl.setBalance);

 12. Получение данных в сводку по пользователю за год _Таня
router.get("/:type/currentYear", authentificate, ctrl.getByYear)

 13. Запрос на получение данных о доходах и расходах за месяц _Миша
router.get("/count/:month", authentificate, ctrl.getCount);
