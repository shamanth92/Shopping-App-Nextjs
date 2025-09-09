import { rest } from 'msw';

let savedAddresses = [
  {
      "_id": "673504cdce021028ac874cb7",
      "email": "rainyweather@abc.com",
      "fullName": "Rainy Weather",
      "addressLineOne": "345 N Town Street",
      "city": "NYC",
      "state": "NY",
      "zipCode": "33333",
      "phoneNumber": "3333333333",
      "setAsDefault": false
  },
  {
      "_id": "673531a0a414aad3ff1f6b2c",
      "email": "rainyweather@abc.com",
      "fullName": "Rainy Weather Two",
      "addressLineOne": "APT 300, Szobo street",
      "city": "Chicago",
      "state": "IL",
      "zipCode": "55385",
      "phoneNumber": "4534536546",
      "setAsDefault": false
  },
  {
      "_id": "674769bd68527b5f66a1d619",
      "email": "rainyweather@abc.com",
      "fullName": "Rainy Weather",
      "addressLineOne": "148 N Disney Street",
      "city": "Orlando",
      "state": "FL",
      "zipCode": "58963",
      "phoneNumber": "4132708059",
      "setAsDefault": true
  },
];

beforeEach(() => {
  savedAddresses = [
    {
        "_id": "673504cdce021028ac874cb7",
        "email": "rainyweather@abc.com",
        "fullName": "Rainy Weather",
        "addressLineOne": "345 N Town Street",
        "city": "NYC",
        "state": "NY",
        "zipCode": "33333",
        "phoneNumber": "3333333333",
        "setAsDefault": false
    },
    {
        "_id": "673531a0a414aad3ff1f6b2c",
        "email": "rainyweather@abc.com",
        "fullName": "Rainy Weather Two",
        "addressLineOne": "APT 300, Szobo street",
        "city": "Chicago",
        "state": "IL",
        "zipCode": "55385",
        "phoneNumber": "4534536546",
        "setAsDefault": false
    },
    {
        "_id": "674769bd68527b5f66a1d619",
        "email": "rainyweather@abc.com",
        "fullName": "Rainy Weather",
        "addressLineOne": "148 N Disney Street",
        "city": "Orlando",
        "state": "FL",
        "zipCode": "58963",
        "phoneNumber": "4132708059",
        "setAsDefault": true
    },
  ];
})


export const handlers = [
  rest.post('http://localhost:3000/ecommerce/account/saveAddress', (req, res, ctx) => {

    return res(
      ctx.status(200),
      ctx.json({
        username: 'admin',
      }),
    )
  }),
  rest.get('http://localhost:3000/ecommerce/account/saveAddress', (req, res, ctx) => {
    const email = req.url.searchParams.get('email');

    return res(
      ctx.status(200),
      ctx.json(savedAddresses),
    )
  }),
  rest.delete('http://localhost:3000/ecommerce/account/saveAddress', (req, res, ctx) => {
    const id = req.url.searchParams.get('id');
    savedAddresses = savedAddresses.filter(item => item._id !== id);

    return res(
      ctx.status(200),
      ctx.json({
        username: 'admin',
      }),
    )
  }),
]