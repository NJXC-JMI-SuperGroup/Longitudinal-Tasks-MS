package cn.mooyyu.backstage.pojo.bulletin;

import lombok.Data;

import java.util.Date;

@Data
public class FullBulletin {
     int bulletinId;
     String title;
     String publishDept;
     int typeId;
     String bulletinType;
     int levelId;
     String bulletinLevel;
     boolean limit;
     int limitNumber;
     boolean expertAudit;
     Date deadline;
     String content;
     String link;
     boolean addition;
     String additionUrl;
}
