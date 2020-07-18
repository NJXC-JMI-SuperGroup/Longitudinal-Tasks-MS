package cn.mooyyu.backstage.pojo;

import lombok.Data;

import java.sql.Date;

@Data
public class AuditDeclare {
    String projectName;
    String leader;
    String leaderJobTitle;
    String index;
    String title;
    String depName;
    Date expectDeadline;
    String expectAchievement;

}
