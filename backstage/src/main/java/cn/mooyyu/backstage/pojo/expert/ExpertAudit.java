package cn.mooyyu.backstage.pojo.expert;

import lombok.Data;

@Data
public class ExpertAudit {
    int expertAuditId;
    int expertId;
    int declareId;
    int score;
    String suggestion;
}
