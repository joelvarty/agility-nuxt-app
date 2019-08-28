const middleware = {}

middleware['agility-middleware'] = require('../middleware/agility-middleware.js');
middleware['agility-middleware'] = middleware['agility-middleware'].default || middleware['agility-middleware']

export default middleware
