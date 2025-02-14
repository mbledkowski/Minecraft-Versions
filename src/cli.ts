import yargs from 'yargs-parser';

import versions from './index.js';
import { EditionTable, PhaseTable, VersionTable, Edition, Phase, Version } from './types.js';
const VERSION = require('../package.json').version;

const caps = <T extends string>(text: T): T => text[0].toUpperCase() + text.substr(1).toLowerCase() as T;

function getData(edition: Edition, phase: Phase, version: string, index: number, param: keyof Version) {
    let editionTable: EditionTable = versions, phaseTable: PhaseTable, versionTable: VersionTable, versionList: Version[];
    if (!edition) return console.log(editionTable);
    phaseTable = editionTable[caps(edition)];
    if (!phase) return console.log(phaseTable);
    versionTable = phaseTable[caps(phase)];
    if (!version) return console.log(versionTable);
    versionList = versionTable[version];
    if (isNaN(index)) return console.log(versionList);
    let versionData = versionList[index];
    if (!param) return console.log(versionData);
    return console.log(versionData[param]);
}

const valid: Record<string, any> = {
    editions: ['Java', 'Bedrock'],
    phases: {
        java: ['Release', 'Beta', 'Alpha', 'Infdev', 'Indev', 'Classic'],
        bedrock: ['Release', 'Alpha'],
    },
};

const argOpts = {
    alias: {
        full: ['f'],
        help: ['h'],
        version: ['v'],
    },
    boolean: ['full', 'help', 'version'],
};
const args = yargs(process.argv.slice(2), argOpts);
const [edition, phase, version, index, param]: string[] = args._;

if (args.help) {
    console.log(`Usage: mcdata [--full] <edition> <phase> [<version>] [<index>] [<param>]`);
    console.log(`Example: mcdata java release 1.17 0 date // 2021-06-08T00:00:00.000Z`);
}
else if (args.version) console.log(VERSION);
else if (args.full || version) getData(edition as Edition, phase as Phase, version, +index, param as keyof Version);
else if (!edition) console.log(`[Minecraft-Versions] Valid editions: ${valid.editions.join(', ')}`);
else if (!phase) console.log(`[Minecraft-Versions] Valid phases: ${valid.phases[edition.toLowerCase()].join(', ')}`);
else if (!version) console.log(`[Minecraft-Versions] Please specify a version or use '--full' to list all versions.`);

