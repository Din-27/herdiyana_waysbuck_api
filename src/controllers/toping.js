const { toping, user, product } = require('../../models')

exports.getTopings = async (req, res) => {
  try {
    let data = await toping.findAll({
      include: {
        model: user,
        as: "user",
        attributes: {
          exclude: ["createdAt", "updatedAt", "password", "user"],
        },
        model: product,
          as: "product",
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          }
      },
    attributes: {
      exclude: ["createdAt", "updatedAt"]
    }
    });
    data = JSON.parse(JSON.stringify(data))

    data = data.map((item) => {
      return {
        ...item,
        image: process.env.FILE_PATH + item.image,
      }
    })

    res.send({
      status: "success...",
      data,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.getToping = async (req, res) => {
  try {   const {id} = req.params;
          const data = await toping.findOne({
          where: {
              id
          },
          include: {
            model: user,
            as: "user",
            attributes: {
              exclude: ["createdAt", "updatedAt", "password", "user"],
            },
          },
        attributes: {
          exclude: ["createdAt", "updatedAt"]
        }
      })
      res.send({
          status: 'success',
          data: {
              data
          }
      })
  } catch (error) {
      console.log(error)
      res.send({
          status: 'failed',
          message: 'Server Error'
      })
  }
}

exports.addToping = async (req, res) => {
  try {
    let data = req.body
    let addToping = await toping.create({
      ...data,
      image: req.file.filename,
      userOrder: `${req.user.id}`,
      include: {
        model: user,
        as: "user",
        attributes: {
          exclude: ["createdAt", "updatedAt", "password", "user"],
        }
      },
    attributes: {
      exclude: ["createdAt", "updatedAt"]
    }
    })
    addToping = JSON.parse(JSON.stringify(addToping))
    addToping = {
        ...addToping,
        image: process.env.FILE_PATH + addToping.image,
    }
    res.send({
      status: "Success",
      data : {
        toping:{
          name: req.body.name,
          price: req.body.price,
          image: req.file.filename,
          image: process.env.FILE_PATH + addToping.image,
          idUser: `${req.user.id}`
        }
      }
    })
  } catch (e) {
    console.log(e);
    res.status(500).send({
      status: "failed",
      message: "thats wrong",
    });
  }
};

exports.updateToping = async (req, res) => {
  try {
      let {id} = req.params
      await toping.update(req.body,{
      where: {id},
      userOrder:`${req.user.id}`})
      let topings = await toping.findAll({
      where:{
        id    
      },
        include: {
          datas,
          model: user,
          as: "user",
          attributes: {
            exclude: ["createdAt", "updatedAt", "password", "user"],
          }
        },
      attributes: {
        exclude: ["createdAt", "updatedAt"]
      }
    })
    res.send({
      status: "success",
      topings
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.deleteToping = async (req, res) => {
  try{

      const {id} = req.params
      await toping.destroy({
          where:{
              id
          },include: {
            model: user,
            as: "user",
            attributes: {
              exclude: ["createdAt", "updatedAt", "password", "user"],
            }
          },
        attributes: {
          exclude: ["createdAt", "updatedAt"]
        }
      })
      res.send({
          status: 'success',
          data: {
            id:id
          }
      })
  }catch (error) {
          console.log(error)
          res.send({
              status: 'failed',
              message: 'Server Error'
          })
  }
}