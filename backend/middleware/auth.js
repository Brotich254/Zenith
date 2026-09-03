import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ error: 'Invalid or expired token' });
  }
};

export const verifyOrgAccess = (req, res, next) => {
  verifyToken(req, res, () => {
    const { orgId } = req.params;
    if (!orgId) {
      return res.status(400).json({ error: 'Organization ID required' });
    }
    req.orgId = orgId;
    next();
  });
};

export const verifyRole = (roles) => {
  return (req, res, next) => {
    if (!req.user?.role || !roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Insufficient permissions' });
    }
    next();
  };
};
