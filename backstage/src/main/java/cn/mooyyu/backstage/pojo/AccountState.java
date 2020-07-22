package cn.mooyyu.backstage.pojo;

import lombok.Data;

@Data
public class AccountState {
    boolean loginState;
    int level;
    String username;
    String password;
    String realname;
}
