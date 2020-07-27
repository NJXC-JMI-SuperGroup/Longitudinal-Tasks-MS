package cn.mooyyu.backstage.pojo;

import lombok.Data;

import java.util.List;

@Data
public class SelectionList {
    @Data
    public static class dept {
        int depid;
        String depname;
    }
    @Data
    public static class bulletinType {
        int typeId;
        String type;
    }
    @Data
    public static class bulletinLevel {
        int levelId;
        String level;
    }
    @Data
    public static class validBulletin {
        int bulletinId;
        String bulletin;
    }

    List<dept> deptSelection;
    List<bulletinType> bulletinTypeSelection;
    List<bulletinLevel> bulletinLevelSelection;
    List<validBulletin> validBulletinSelection;
}
