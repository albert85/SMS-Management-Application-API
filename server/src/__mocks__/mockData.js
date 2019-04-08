import faker from 'faker';

export const contactDetail = {
    name: faker.name.firstName(),
    phoneNumber: faker.phone.phoneNumber()
}

export const contactDetails = [
    {
        name: faker.name.firstName(),
        phoneNumber: faker.phone.phoneNumber()
    },
    {
        name: faker.name.firstName(),
        phoneNumber: faker.phone.phoneNumber()
    }
];

export const smsDetails = {
    message: faker.lorem.sentence(),
    senderId: 1,
    receiverId: 3,
    status: "sent",
}