const { faker } = window;

const repeat = (callback, number) => {
    const answer = [];
    for (let i = 0; i < number; i++) {
        answer.push(callback());
    }
    return answer;
};
const createState = () => {
    return {
        terms: repeat(() => faker.random.word(), faker.random.number(20)),
        results: repeat(
            () => ({
                title: faker.random.words(),
                price: faker.random.number(),
                lastPrice: faker.random.number(),
                imgUrl: 'https://dummyimage.com/600x600/000/fff',
                url: 'http://127.0.0.1:5502',
            }),
            40,
        ),
        darkMode: window.matchMedia('(prefers-color-scheme: dark)'),
    };
};

export default createState;
