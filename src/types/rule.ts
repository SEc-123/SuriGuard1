export interface Rule {
  action: string;
  protocol: string;
  sourceIP: string;
  sourcePort: string;
  direction: string;
  destIP: string;
  destPort: string;
  options: {
    msg?: string;
    flow?: string;
    classtype?: string;
    sid?: string;
    rev?: string;
    priority?: string;
    [key: string]: any;
  };
  enabled: boolean;
}