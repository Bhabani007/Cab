module.exports = {
  verifyUser: (req, res, next) => {
    if (req.cookies.jwt) {
        console.log(req.cookies.jwt, 'verifyUser')
        res.redirect('/home');
    } else {
      next();
    }
  },
};
