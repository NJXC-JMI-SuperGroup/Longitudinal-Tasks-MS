package cn.mooyyu.backstage.pojo;

import lombok.Data;

import java.util.List;

@Data
public class SelectionList {
    @Data
    static class dept {
        int depid;
        String depname;
    }
    @Data
    static class bulletinType {
        int typeId;
        String type;
    }
    @Data
    static class bulletinLevel {
        int levelId;
        String level;
    }
    @Data
    static class declareState {
        int stateId;
        String State;
    }

    List<dept> deptSelection;
    List<bulletinType> bulletinTypeSelection;
    List<bulletinLevel> bulletinLevelSelection;
    List<declareState> declareStateSelection;
}
