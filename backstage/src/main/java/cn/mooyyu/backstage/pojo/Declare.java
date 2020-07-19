package cn.mooyyu.backstage.pojo;

import lombok.Data;

import java.sql.Date;
@Data
public class Declare {
    int declareId;
    String projectName;
    String leaderId;
    String leaderJobTitle;
    String expectAchievement;
    String index;
    int BulletinID;
    int declareDeptId;
    Date deadline;

}
