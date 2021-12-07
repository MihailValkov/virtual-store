const orders_dummy = [
  {
    _id: '123ff234sdf2342asd11',
    date: '06 May 2021, 16:52',
    address: 'Bulgaria, Sofia',
    status: 'Pending',
    amount: 5,
    price: 1029.99,
  },
  {
    _id: '123ff234sdf2342asd12',
    date: '03 June 2021, 11:00',
    address: 'Bulgaria, Burgas',
    status: 'Pending',
    amount: 1,
    price: 159.99,
  },
  {
    _id: '123ff234sdf2342asd13',
    date: '01 Jan 2021, 10:55',
    address: 'Bulgaria, Burgas',
    status: 'Pending',
    amount: 3,
    price: 655.99,
  },
];

module.exports = {
  get: {
    async orders(req, res) {
      try {
        return res.status(200).json(orders_dummy);
      } catch (error) {
        return res.status(404).json({ message: 'Not Found 404' });
      }
    },
    async order(req, res) {
      const { id } = req.params;
      try {
        return res.status(200).json(orders_dummy.find((o) => o._id === id));
      } catch (error) {
        return res.status(404).json({ message: 'Not Found 404' });
      }
    },
  },
  post: {},
};
