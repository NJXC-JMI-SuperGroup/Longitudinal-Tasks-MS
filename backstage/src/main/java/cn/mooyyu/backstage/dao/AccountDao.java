package cn.mooyyu.backstage.dao;

import cn.mooyyu.backstage.pojo.AccountState;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;

@Mapper
@Repository
public interface AccountDao {
    @Select("select realname, level from tb_user where username=#{account.username} and password=#{account.password}")
    public AccountState login(@Param("account") AccountState loginInfo);
}
