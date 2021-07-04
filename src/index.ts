import fs from 'fs';
import yaml from 'js-yaml';
import { VersionData, EditionTable, PhaseTable } from './types.js';

const Versions = {} as EditionTable;

const fileData: string = fs.readFileSync(__dirname + '/versions.yml', { encoding: 'utf8' });
const versionData = yaml.load(fileData) as VersionData[];
for (const data of versionData) {
    const [id, edition, phase, parent, vers] = data;
    for (const { name, type, date } of vers) {
        Versions[edition] ||= {} as PhaseTable;
        Versions[edition][phase] ||= {};
        Versions[edition][phase][id] ||= [];
        Versions[edition][phase][id].push({ name: name || id, parent: parent || null, type, date });
    }
}

export = Versions;
