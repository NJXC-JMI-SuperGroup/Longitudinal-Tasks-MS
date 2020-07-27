package cn.mooyyu.backstage.pojo.declare;

import lombok.Data;

@Data
public class SimpleDeclare {
    int declareId;
    String projectName;
    String state;
    int stateId;
    String leader;
    boolean expertAudit;
    int bulletinId;
    String bulletin;
}
