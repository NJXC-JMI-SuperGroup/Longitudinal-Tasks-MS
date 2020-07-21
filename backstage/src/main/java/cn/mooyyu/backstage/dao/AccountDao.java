package cn.mooyyu.backstage.dao;

import cn.mooyyu.backstage.pojo.AccountState;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;

@Mapper
@Repository
public interface AccountDao {
    @Select("select realname, level from tb_user where username=#{accountState.username} and password=#{accountState.password}")
    public AccountState login(AccountState accountState);
}
