package cn.mooyyu.backstage.pojo;
import lombok.Data;
import java.sql.Date;
@Data
public class DetailedBulletin {
        int bulletinId;
        String title;
        int index;
        String publishDeptId;
        int typeId;
        boolean isLimit;
        int limitNumber;
        boolean expertAudit;
        int levelId;
        Date deadline;
        String context;
        String link;

}
