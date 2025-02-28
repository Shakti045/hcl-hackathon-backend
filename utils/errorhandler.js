export const wrapAsyncRoutes = (router) => {
    const methods = ['get', 'post', 'put', 'delete', 'patch'];
  
    methods.forEach((method) => {
      const original = router[method];
      router[method] = function (path, ...handlers) {
        const wrappedHandlers = handlers.map((handler) => 
          (req, res, next) => Promise.resolve(handler(req, res, next)).catch(next)
        );
        return original.call(this, path, ...wrappedHandlers);
      };
    });
  
    return router;
  };

 export  const errorHandler = (err, req, res, next) => {
    console.error(`Error in ${req.method} ${req.originalUrl}`,'error:',err.message);
    res.status(err.status || 500).json({ message: err.message || 'Internal Server Error' });
}; 
  