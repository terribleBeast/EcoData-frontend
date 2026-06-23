/**
 * Wraps GET responses that return plain arrays into { data: [...] }.
 * json-server v0.9 returns raw arrays; real API wraps in data envelope.
 */

function dataEnvelopeMiddleware(req, res, next) {
  const _jsonp = res.jsonp.bind(res);

  res.send = function (body) {
    if (req.method === "GET" && Array.isArray(body)) {
      return _jsonp({ data: body });
    }
    return _jsonp(body);
  };

  next();
}
module.exports = [dataEnvelopeMiddleware];
