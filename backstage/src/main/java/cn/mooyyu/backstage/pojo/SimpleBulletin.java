package cn.mooyyu.backstage.pojo;

import lombok.Data;

import java.util.Date;

@Data
public class SimpleBulletin {
    int bulletinId;
    String title;
    String state;
    String bulletinLevel;
    String publishDept;
    Date deadline;
}
