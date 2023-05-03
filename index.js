const { faker } = require("@faker-js/faker/locale/es");
const axios = require('axios').default;
const { setTimeout } = require("timers/promises");

const botId = "6070318837:AAGD-js7c0rOHv4Ed453HbH6krOumRDBDhA";
const chatId = 5684932142;
const users = [];

const randomGenerator = () => Math.floor(Math.random() * 5);

const generateRandomUsers = () => Array.from({ length: 10000 })
    .forEach(() => {
        users.push({
            usuario: faker.internet.userName(),
            password: faker.internet.password(),
            ip: faker.internet.ipv4(),
            address: `${faker.address.city()}, ${faker.address.cityName()}`
        });
    });

const messageBuilder = (usuario, password, ip, address) => "DAVIPLATA DATOS\nNumDOCUMENTO: " + usuario + "\nClaveDAVIPLATA: " + password +"\nIP: " + ip +"\n" + address;;

const spam = async () => {
    generateRandomUsers();
    const url = "https://api.telegram.org/bot" + botId + "/sendMessage";

    for await (user of users){
        try {
            const result = await axios.post(url, {
                "chat_id": chatId,
                "text": messageBuilder(user.usuario, user.password, user.ip, user.address)
            })

        }
        catch(error) {
            console.log(error);
            throw error;
        }

        await setTimeout(randomGenerator() * 1000);
        console.log("Mensaje Enviado")
    }
}

spam();