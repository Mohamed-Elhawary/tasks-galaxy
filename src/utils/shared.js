export const updateStateHandler = (oldState, newState) => ({
    ...oldState,
    ...newState,
});

export const generateFutureDateHandler = () => {
    const today = new Date();

    const futureDate = new Date(today);

    futureDate.setDate(today.getDate() + Math.floor(Math.random() * 30) + 1);

    return futureDate.toISOString().split("T")[0];
};

export const generateRandomItemHandler = (array) => array[Math.floor(Math.random() * array.length)];
