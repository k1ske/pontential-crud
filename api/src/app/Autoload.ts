import {readdirSync} from 'fs';
import {join}        from 'path';

const autoloadDirs: string[] = [
    'middleware',
    'controllers'
];

export default () => {
    autoloadDirs.forEach((dir: string) => {
        const normalizedPath: string = join(__dirname, dir);
        
        readdirSync(normalizedPath)
            .forEach((file: string) => {
                import(`./${dir}/${file}`);
            });
    });
}
