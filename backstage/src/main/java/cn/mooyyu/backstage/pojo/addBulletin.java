package cn.mooyyu.backstage.pojo;

import lombok.Data;

import java.util.Date;

@Data
public class addBulletin {
     String title;
     String index;
     int publishDeptId;
     int typeId;
     boolean isLimit;
     int limitNumber;
     boolean expertAudit;
     int levelId;
     Date deadline;
     String content;
}
