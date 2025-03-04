export type EventStage = 'Pending' | 'Investigation' | 'Completed';
export type EventStatus = 'Pending' | 'Processed';
export type EventResult = 'Real Alert' | 'False Positive' | 'Other';

export interface Event {
  id: number;
  start_time: string;
  end_time?: string;
  src_ip: string;
  dst_ip: string;
  protocol: string;
  rule_id: number;
  severity: number;
  current_stage: EventStage;
  handler?: string;
  last_update: string;
  
  // Confirmation stage
  confirm_status?: EventStatus;
  confirm_handler?: string;
  confirm_result?: EventResult;
  confirm_reason?: string;
  confirm_time?: string;
  
  // Investigation stage
  investigation_status?: EventStatus;
  investigation_handler?: string;
  investigation_result?: EventResult;
  investigation_reason?: string;
  investigation_time?: string;
  
  // Completion stage
  completion_result?: EventResult;
  completion_reason?: string;
  completion_time?: string;
}