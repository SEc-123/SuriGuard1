-- 事件管理表
CREATE TABLE IF NOT EXISTS events (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  alert_id BIGINT NOT NULL,
  rule_id INT NOT NULL,
  src_ip VARCHAR(45) NOT NULL,
  dest_ip VARCHAR(45) NOT NULL,
  severity INT NOT NULL,
  current_phase ENUM('未处理', '事件调查', '完结') DEFAULT '未处理',
  current_status ENUM('待处理', '处理中', '已处理', '已完结') DEFAULT '待处理',
  
  -- 确认阶段
  confirm_status ENUM('待确认', '已确认') DEFAULT '待确认',
  confirm_result ENUM('真实告警', '误报', '其他'),
  confirm_reason TEXT,
  confirm_time DATETIME,
  confirm_user VARCHAR(255),
  
  -- 调查阶段
  investigation_status ENUM('未开始', '调查中', '已完成') DEFAULT '未开始',
  investigation_result ENUM('真实告警', '误报', '其他'),
  investigation_reason TEXT,
  investigation_time DATETIME,
  investigation_user VARCHAR(255),
  
  -- 完结阶段
  completion_result ENUM('真实告警', '误报', '其他'),
  completion_reason TEXT,
  completion_time DATETIME,
  completion_user VARCHAR(255),
  
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  FOREIGN KEY (alert_id) REFERENCES alert_logs(id)
);

-- 事件历史记录表
CREATE TABLE IF NOT EXISTS event_history (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  event_id BIGINT NOT NULL,
  phase ENUM('未处理', '事件调查', '完结') NOT NULL,
  status VARCHAR(50) NOT NULL,
  action VARCHAR(255) NOT NULL,
  result ENUM('真实告警', '误报', '其他'),
  reason TEXT,
  user VARCHAR(255) NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (event_id) REFERENCES events(id)
);

-- 创建索引
CREATE INDEX idx_events_alert_id ON events(alert_id);
CREATE INDEX idx_events_current_phase ON events(current_phase);
CREATE INDEX idx_events_current_status ON events(current_status);
CREATE INDEX idx_event_history_event_id ON event_history(event_id);