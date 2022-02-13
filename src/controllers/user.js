const { user } = require("../../models");


exports.getUsers = async (req, res) => {
  try {
    let users = await user.findAll({
      attributes: {
        exclude:['status', 'password', 'createdAt', 'updatedAt']
      }
    })
    res.send({
      status: "Success",
      data : {
        users
      }
    })
  } catch (e) {
    console.log(e);
    res.send({
      status: "failed",
      message: "thats wrong",
    });
  }
}

exports.deleteUser = async (req, res) => {
  try{

      const {id} = req.params
      await user.destroy({
          where:{
              id
          }
      })
      res.send({
          status: 'success',
          message: `Delete user id: ${id} finished`,
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


