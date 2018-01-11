import { SnmpConfigGroup } from "./snmp-config-group";
import { HostGroup } from "./host-group";
import { ObjectPollType } from "./object-poll-type";
import { TablePollType } from './table-poll-type';

export class PollGroup {
    id: string;
    name: string;
    type: string;
    objectType: ObjectPollType = new ObjectPollType();
    tableType: TablePollType = new TablePollType();
    mibs: string[] = [];
    interval: number
    config: SnmpConfigGroup = new SnmpConfigGroup();
    host: string;
    hosts: HostGroup = new HostGroup();
}
