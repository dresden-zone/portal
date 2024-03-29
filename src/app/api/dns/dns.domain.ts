export interface Zone {
  id: string;
  created: string;
  updated: string;
  name: string;
  owner: string;
  verified: string;
  serial: number;
}

export enum RecordType {
  A = 'a',
  AAAA = 'aaaa',
  CNAME = 'cname',
  MX = 'mx',
  NS = 'ns',
  TXT = 'txt'
}

export type Record<T> = RecordBase & SpecificRecord<T>;

export type RecordInsert<T> = RecordInsertBase & SpecificRecord<T>;

type SpecificRecord<T> = (T extends RecordType.A
  ? RecordA : T extends RecordType.AAAA
    ? RecordAaaa : T extends RecordType.CNAME
      ? RecordCname : T extends RecordType.MX
        ? RecordMx : T extends RecordType.NS
          ? RecordNs : T extends RecordType.TXT
            ? RecordTxt : unknown);

interface RecordBase extends RecordInsertBase {
  id: string;
  created: string;
  updated: string;
  zone_id: string;
}

interface RecordInsertBase {
  name: string;
  ttl: number | null;
}

interface RecordA {
  addr: string;
}

interface RecordAaaa {
  addr: string;
}

interface RecordCname {
  target: string;
}

interface RecordMx {
  preference: number;
  exchange: string;
}

interface RecordNs {
  target: string;
}

interface RecordTxt {
  content: string;
}
