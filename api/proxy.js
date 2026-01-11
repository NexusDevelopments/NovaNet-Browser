// Ultraviolet proxy serverless function for Vercel
const { createBareServer } = require('@tomphttp/bare-server-node');
const { uvRequestHandler } = require('ultraviolet');

const bare = createBareServer('/bare/');

module.exports = async (req, res) => {
  if (req.url.startsWith('/bare/')) {
    return bare.handleRequest(req, res);
  }
  return uvRequestHandler(req, res);
};
