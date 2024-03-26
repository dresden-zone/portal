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

export interface RecordBase {
  id: string;
  created: string;
  updated: string;
  name: string;
  zone_id: string;
  ttl: number | null;
}

export interface RecordInsertBase {
  name: string;
  ttl: number | null;
}

export interface RecordA {
  addr: string;
}

export interface RecordAaaa {
  addr: string;
}

export interface RecordCname {
  target: string;
}

export interface RecordMx {
  preference: number;
  exchange: string;
}

export interface RecordNs {
  target: string;
}

export interface RecordTxt {
  content: string;
}
