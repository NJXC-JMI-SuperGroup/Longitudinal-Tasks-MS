package cn.mooyyu.backstage.pojo.declare;

import lombok.Data;

import java.sql.Date;
@Data
public class FullDeclare {
    int declareId;
    String ProjectName;
    String index;
    int leaderId;
    String leader;
    String leaderJobTitle;
    int bulletinId;
    String bulletin;
    int declareDeptId;
    String declareDept;
    String expectDeadline;
    String expectAchievement;
    int stateId;
    String state;
    String rejectionReason;
    int expertScore;
    String expertSuggestion;
    boolean addition;
    String additionUrl;
}
