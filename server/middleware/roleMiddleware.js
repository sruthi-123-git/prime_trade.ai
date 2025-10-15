console.log('roleMiddleware loaded');
function permit(...allowedRoles) {
  return (req, res, next) => {
    const { user } = req;
    if (user && allowedRoles.includes(user.role)) {
      next();
    } else {
      res.status(403).json({ message: 'Forbidden: insufficient rights' });
    }
  };
}

module.exports = { permit };
