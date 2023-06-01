import initializeMongo from './mongo/initializeMongo';
import config from './config/config';
import initializeApp from './express/initializeApp';

const { mongo } = config;

/**
 * The main function.
 * Calls all the initialization functions.
 */
const main = async () => {
    await initializeMongo(mongo.uri);
    const app = await initializeApp(config.server.port || 2770);

    app.start();
};

main().catch((err) => {
    console.log(err);
    process.exit();
});
