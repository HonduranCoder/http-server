const VALID = ['POST', 'PUT', 'PATCH'];

const parseBody = async (req) => {
  if (!VALID.includes(req.method)) return null;

  return new Promise((resolve, reject) => {
    if (req.headers['content-type'] !== 'application/json') {
      reject('content-type must be application/json');
      return;
    }
    //create a variable to store our request body in.
    let data = '';
    //assemble each chunk of the request body as it's received
    req.on('data', (chunk) => {
      data += chunk;
    });
    // end is called and out 'data' variable holds the entirety of the request body.
    req.on('end', async () => {
      try {
        resolve(JSON.parse(data));
      } catch (err) {
        reject('Bad JSON');
      }
    });
  });
};

module.exports = parseBody;
