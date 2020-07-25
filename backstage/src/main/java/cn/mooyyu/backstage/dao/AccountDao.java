package cn.mooyyu.backstage.dao;

import cn.mooyyu.backstage.pojo.AccountState;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;

@Mapper
@Repository
public interface AccountDao {
    @Select("select userid, realname, level, 1 as loginState\n" +
            "from tb_user\n" +
            "where username=#{account.username} and\n" +
            "      password=#{account.password}")
    AccountState login(@Param("account") AccountState loginInfo);

    @Select("select 13 as level, bulletinId, 1 as loginState, expertId as userid\n" +
            "from tb_expert\n" +
            "where username=#{account.username} and\n" +
            "      password=#{account.password}")
    AccountState expertLogin(@Param("account") AccountState loginInfo);
}
