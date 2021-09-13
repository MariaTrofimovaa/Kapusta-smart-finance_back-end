const { users: service } = require("../../services");
const fs = require("fs/promises"); // для перемещения файлов
const path = require("path"); // чтобы прописать пути к папкам
const Jimp = require("jimp"); // для работы с изображениями
const { v4: uuidv4 } = require("uuid");

const usersDir = path.join(process.cwd(), "/public/avatars"); //путь к постоянной папке для сохранения аватара

const uploadAvatar = async (req, res, next) => {
  const { path: tempName, originalname } = req.file; // получаем временный путь к файлу и оригинальное имя файла
  const [extension] = originalname.split(".").reverse(); // забираем разширение
  const uniqueName = uuidv4() + "." + extension;
  const fileName = path.join(usersDir, uniqueName); // создаем новое имя (полный путь к файлу) при помощи оригинального имени и пути к папке, в которой надо файл сохранить
  const { _id } = req.user; // забираем id пользователя
  // console.log(_id);
  try {
    await Jimp.read(tempName)
      .then((originalname) => {
        return originalname
          .resize(250, 250) // меняем размер
          .quality(60) //  JPEG - качество
          .write(fileName); // сохраняем (записываем)
      })
      .catch((error) => {
        next(error);
      });

    await service.update(_id, { avatarURL: "/avatars/" + uniqueName }); //обновляем avatarURL

    await fs.rename(tempName, fileName); //переименовываем файл,куда сохраняется аватар (т.е. перезаписываем его в постоянную папку)
    res.json({
      status: "success",
      code: 200,
      data: {},
    });

    // const user = await service.getOne({ email });
    // if (!user) {
    //   return res.status(401).json({
    //     status: "error",
    //     code: 401,
    //     message: "Not authorized",
    //   });
    // }
  } catch (error) {
    await fs.unlink(tempName); // удаляем файл из временной папки, если не удалось переместить его в постоянную
  }
};

module.exports = uploadAvatar;
