const User = require('../models/userModel');

exports.getUsers = async (query = {}) => {
  try {
    const users = await User.find({ ...query });
    return {
      status: 'success',
      data: {
        users,
      },
    };
  } catch (e) {
    return {
      status: 'error',
      message: e,
    };
  }
};

exports.updateOrCreateUserWithUid = async (uid, data) => {
  try {
    const user = await User.updateOne({ uid }, data, { upsert: true });
    return {
      status: 'success',
      data: user,
    };
  } catch (e) {
    return {
      status: 'error',
      message: e,
    };
  }
};

exports.findUserByUid = async (uid) => {
  try {
    const user = await User.findOne({ uid });
    return {
      status: 'success',
      data: user,
    };
  } catch (e) {
    return {
      status: 'error',
      message: e,
    };
  }
};

// exports.createUser = async (req, res) => {
//   const { body } = req;
//   try {
//     let newTour = await User.create(body);
//     res.status(201).json({
//       status: 'success',
//       data: {
//         tour: newTour,
//       },
//     });
//   } catch (e) {
//     res.status(400).json({
//       status: 'error',
//       message: 'wrong submitation!',
//     });
//   }
// };

// exports.getUser = async (req, res) => {
//   const {
//     params: { id },
//   } = req;
//   try {
//     let user = await User.findById(id);
//     res.status(200).json({
//       status: 'success',
//       data: {
//         user,
//       },
//     });
//   } catch (e) {
//     res.status(404).json({
//       status: 'error',
//       message: 'not found!',
//     });
//   }
// };

// exports.updateUser = async (req, res) => {
//   const {
//     params: { id },
//     body,
//   } = req;
//   try {
//     let user = await User.findByIdAndUpdate(id, body, {
//       new: true,
//       runValidators: true,
//     });
//     res.status(200).json({
//       status: 'success',
//       data: {
//         user,
//       },
//     });
//   } catch (e) {
//     res.status(404).json({
//       status: 'error',
//       message: 'not found!',
//     });
//   }
// };

// exports.deleteUser = async (req, res) => {
//   const {
//     params: { id },
//   } = req;
//   try {
//     let user = await User.findByIdAndRemove(id);
//     res.status(200).json({
//       status: 'success',
//       data: 'removed !',
//     });
//   } catch (e) {
//     res.status(404).json({
//       status: 'error',
//       message: 'not found!',
//     });
//   }
// };
