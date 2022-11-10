// import { writeFileSync } from 'fs';
import initializeApp from './express/initializeApp';

(async () => {
    const routers: string[] = [];
    function print(path: string[], layer) {
        if (layer.route) {
            layer.route.stack.forEach((layer) => print(path.concat(split(layer.route.path)), layer));
        } else if (layer.name === 'router' && layer.handle.stack) {
            layer.handle.stack.forEach((layer) => print(path.concat(split(layer.regexp)), layer));
        } else if (layer.method) {
            routers.push(layer.method.toUpperCase() + ' ' + path.concat(split(layer.regexp)).filter(Boolean).join('/'));
        }
    }

    function split(thing) {
        if (typeof thing === 'string') {
            return thing.split('/');
        } else if (thing.fast_slash) {
            return '';
        } else {
            var match = thing
                .toString()
                .replace('\\/?', '')
                .replace('(?=\\/|$)', '$')
                .match(/^\/\^((?:\\[.*+?^${}()|[\]\\\/]|[^.*+?^${}()|[\]\\\/])*)\$\//);
            return match ? match[1].replace(/\\(.)/g, '$1').split('/') : '<complex:' + thing.toString() + '>';
        }
    }

    const app = (await initializeApp(123)).getApp();

    app['_router'].stack.forEach((layer) => print([], layer));

    console.log(new Set(routers));

    // writeFileSync('./routers.json', JSON.stringify([...new Set(routers)]));
})();
