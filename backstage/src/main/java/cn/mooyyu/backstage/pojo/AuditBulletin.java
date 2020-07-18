package cn.mooyyu.backstage.pojo;

import lombok.Data;

import java.sql.Date;

@Data
public class AuditBulletin {
    String title;
    int index;
    String depName;
    String type;
    int isLimit;
    int limitNumber;
    int expertAudit;
    String level;
    Date deadline;
    String context;
    String link;
}
