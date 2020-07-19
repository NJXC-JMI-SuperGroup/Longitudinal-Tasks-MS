package cn.mooyyu.backstage.pojo;

import lombok.Data;

import java.sql.Date;

@Data
public class Bulletin {
    String title;
    String type;
    String level;
    String depname;
    Date deadline;
}
