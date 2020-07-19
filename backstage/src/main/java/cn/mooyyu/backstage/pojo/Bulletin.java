package cn.mooyyu.backstage.pojo;

import lombok.Data;

import java.util.Date;

@Data
public class Bulletin {
    String title;
    int typeId;
    int levelId;
    String publishDeptId;
    String deadline;
}
