const generateRandomId = () => {
    return Math.random().toString(36).substring(2);
};

const sleep = (ms: number) => {
    return new Promise(resolve => setTimeout(resolve, ms));
};

export {generateRandomId, sleep}