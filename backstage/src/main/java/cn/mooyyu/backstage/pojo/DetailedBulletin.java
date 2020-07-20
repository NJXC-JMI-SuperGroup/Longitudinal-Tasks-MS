package cn.mooyyu.backstage.pojo;
import lombok.Data;
import java.sql.Date;
@Data
public class DetailedBulletin {
        String title;
        String index;
        String depname;
        String type;
        boolean isLimit;
        int limitNumber;
        boolean expertAudit;
        String level;
        Date deadline;
        String content;
        String Link;
}
