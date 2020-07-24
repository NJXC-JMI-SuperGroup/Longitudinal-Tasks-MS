package cn.mooyyu.backstage.dao;

import cn.mooyyu.backstage.pojo.AccountState;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;

@Mapper
@Repository
public interface AccountDao {
    @Select("select userid, realname, level\n" +
            "from tb_user\n" +
            "where username=#{account.username} and\n" +
            "      password=#{account.password}")
    AccountState login(@Param("account") AccountState loginInfo);
}
