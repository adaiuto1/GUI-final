//account type:
// 1 = tenant
// 2 = landlord
// 3 = admin
export const accounts = [
    {
        email: 'email@email',
        password: 'password123',
        accountType: 1,
        firstName: 'bob',
        lastName: 'jones',
        age: 35,
        bio: "Lorem Ipsum",
        tags: ['placeholder', 'enthusiast', 'legos']
    },
    {
        email: 'ownermail@ownermail',
        password: 'raisetherent123',
        accountType: 2,
        firstName: 'land',
        lastName: 'lord',
        age: 55,

    }
];
export const properties = [
    {
        address: '6120 Bishop',
        monthlyRent: 4800,
        capacity: 1,
        allowsPets: true,
        allowsSmoking: false,
        owner: {},
        headerImg: 'https://via.placeholder.com/140x100',
        tags: ['night life', 'college town', 'community']
    }
];