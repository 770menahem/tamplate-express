import menash from 'menashmq';
import * as mongoose from 'mongoose';

export default () => {
    return menash.isReady && mongoose.connection.readyState === 1;
};
