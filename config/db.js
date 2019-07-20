module.exports = {
  db: {
    uri:
      'mongodb://localhost:27017/kpf',
      // 'mongodb://admin:qwe123@ds127736.mlab.com:27736/karpachoff',
    connect: {
      config: {
        // autoIndex: false,
      },
      useNewUrlParser: true,
    },
  },
};
