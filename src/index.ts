import initializeMongo from './mongo/initializeMongo';
import initializeExpress from './express/app';

/**
 * The main function.
 * Calls all the initialization functions.
 */
const main = async () => {
    await initializeMongo();

    initializeExpress();
};

main().catch((err) => {
    console.log(err.message);
    process.exit();
});
